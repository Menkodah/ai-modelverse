from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
import os
import asyncio
import logging
from datetime import datetime
import json

# Import ML modules
from ml_modules.model_trainer import ModelTrainer
from ml_modules.model_inference import ModelInference
from ml_modules.data_processor import DataProcessor
from ml_modules.optimizer import AutoMLOptimizer
from ml_modules.model_registry import ModelRegistry

# Import utilities
from utils.auth import verify_token
from utils.storage import MinIOClient
from utils.monitoring import MetricsCollector
from utils.queue import TaskQueue

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="ModelVerse ML Engine",
    description="AI Model Maker PRO - Machine Learning Engine",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Initialize components
model_trainer = ModelTrainer()
model_inference = ModelInference()
data_processor = DataProcessor()
optimizer = AutoMLOptimizer()
model_registry = ModelRegistry()
storage_client = MinIOClient()
metrics_collector = MetricsCollector()
task_queue = TaskQueue()

# Pydantic models
class TrainingRequest(BaseModel):
    model_type: str
    dataset_path: str
    hyperparameters: Optional[Dict[str, Any]] = None
    training_config: Optional[Dict[str, Any]] = None

class InferenceRequest(BaseModel):
    model_id: str
    input_data: Any
    options: Optional[Dict[str, Any]] = None

class OptimizationRequest(BaseModel):
    model_type: str
    dataset_path: str
    optimization_target: str
    constraints: Optional[Dict[str, Any]] = None

class ModelMetadata(BaseModel):
    name: str
    description: str
    model_type: str
    version: str
    tags: Optional[List[str]] = None

# Dependency for authentication
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        user = verify_token(credentials.credentials)
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "ModelVerse ML Engine",
        "status": "running",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "services": {
            "model_trainer": "running",
            "model_inference": "running",
            "data_processor": "running",
            "optimizer": "running",
            "storage": "connected",
            "queue": "connected"
        }
    }

@app.post("/train")
async def train_model(
    request: TrainingRequest,
    background_tasks: BackgroundTasks,
    current_user: dict = Depends(get_current_user)
):
    """Start model training"""
    try:
        # Validate request
        if not request.model_type or not request.dataset_path:
            raise HTTPException(status_code=400, detail="Missing required fields")

        # Create training job
        job_id = await model_trainer.create_training_job(
            user_id=current_user["id"],
            model_type=request.model_type,
            dataset_path=request.dataset_path,
            hyperparameters=request.hyperparameters,
            training_config=request.training_config
        )

        # Start training in background
        background_tasks.add_task(
            model_trainer.start_training,
            job_id=job_id
        )

        return {
            "job_id": job_id,
            "status": "started",
            "message": "Training job created successfully"
        }

    except Exception as e:
        logger.error(f"Training error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/train/{job_id}")
async def get_training_status(
    job_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get training job status"""
    try:
        status = await model_trainer.get_job_status(job_id, current_user["id"])
        return status
    except Exception as e:
        raise HTTPException(status_code=404, detail="Job not found")

@app.post("/inference")
async def run_inference(
    request: InferenceRequest,
    current_user: dict = Depends(get_current_user)
):
    """Run model inference"""
    try:
        # Validate model access
        if not await model_registry.check_model_access(request.model_id, current_user["id"]):
            raise HTTPException(status_code=403, detail="Access denied")

        # Run inference
        result = await model_inference.predict(
            model_id=request.model_id,
            input_data=request.input_data,
            options=request.options
        )

        # Collect metrics
        await metrics_collector.record_inference(
            model_id=request.model_id,
            user_id=current_user["id"],
            latency=result.get("latency", 0)
        )

        return result

    except Exception as e:
        logger.error(f"Inference error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/optimize")
async def optimize_model(
    request: OptimizationRequest,
    background_tasks: BackgroundTasks,
    current_user: dict = Depends(get_current_user)
):
    """Start AutoML optimization"""
    try:
        job_id = await optimizer.create_optimization_job(
            user_id=current_user["id"],
            model_type=request.model_type,
            dataset_path=request.dataset_path,
            optimization_target=request.optimization_target,
            constraints=request.constraints
        )

        # Start optimization in background
        background_tasks.add_task(
            optimizer.start_optimization,
            job_id=job_id
        )

        return {
            "job_id": job_id,
            "status": "started",
            "message": "Optimization job created successfully"
        }

    except Exception as e:
        logger.error(f"Optimization error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/optimize/{job_id}")
async def get_optimization_status(
    job_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get optimization job status"""
    try:
        status = await optimizer.get_job_status(job_id, current_user["id"])
        return status
    except Exception as e:
        raise HTTPException(status_code=404, detail="Job not found")

@app.post("/upload")
async def upload_dataset(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """Upload dataset for training"""
    try:
        # Validate file
        if not file.filename:
            raise HTTPException(status_code=400, detail="No file provided")

        # Upload to storage
        file_path = await storage_client.upload_file(
            file=file,
            user_id=current_user["id"],
            file_type="dataset"
        )

        return {
            "file_path": file_path,
            "filename": file.filename,
            "size": file.size,
            "message": "Dataset uploaded successfully"
        }

    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/models")
async def list_models(current_user: dict = Depends(get_current_user)):
    """List user's models"""
    try:
        models = await model_registry.list_user_models(current_user["id"])
        return {"models": models}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/models/{model_id}")
async def get_model(
    model_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get model details"""
    try:
        model = await model_registry.get_model(model_id, current_user["id"])
        if not model:
            raise HTTPException(status_code=404, detail="Model not found")
        return model
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/models")
async def register_model(
    metadata: ModelMetadata,
    current_user: dict = Depends(get_current_user)
):
    """Register a new model"""
    try:
        model_id = await model_registry.register_model(
            user_id=current_user["id"],
            metadata=metadata.dict()
        )
        return {
            "model_id": model_id,
            "message": "Model registered successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/metrics/{model_id}")
async def get_model_metrics(
    model_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get model performance metrics"""
    try:
        metrics = await metrics_collector.get_model_metrics(
            model_id=model_id,
            user_id=current_user["id"]
        )
        return metrics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/queue/status")
async def get_queue_status(current_user: dict = Depends(get_current_user)):
    """Get task queue status"""
    try:
        status = await task_queue.get_status()
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# WebSocket endpoint for real-time updates
@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket, user_id: str):
    """WebSocket endpoint for real-time training updates"""
    try:
        await websocket.accept()
        
        # Subscribe to user's training updates
        await task_queue.subscribe_to_updates(user_id, websocket)
        
        try:
            while True:
                # Keep connection alive
                await websocket.receive_text()
        except:
            # Connection closed
            await task_queue.unsubscribe_from_updates(user_id, websocket)
            
    except Exception as e:
        logger.error(f"WebSocket error: {str(e)}")
        await websocket.close()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8001))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )
