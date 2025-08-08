import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

// Import routes
import authRoutes from './routes/auth'
import modelRoutes from './routes/models'
import userRoutes from './routes/users'
import marketplaceRoutes from './routes/marketplace'
import trainingRoutes from './routes/training'
import deploymentRoutes from './routes/deployment'
import analyticsRoutes from './routes/analytics'

// Import middleware
import { errorHandler } from './middleware/errorHandler'
import { authMiddleware } from './middleware/auth'
import { validateRequest } from './middleware/validation'

// Import database connection
import { connectDatabase } from './config/database'
import { connectRedis } from './config/redis'

// Import socket handlers
import { setupSocketHandlers } from './socket/handlers'

// Load environment variables
dotenv.config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ModelVerse API',
      version: '1.0.0',
      description: 'API documentation for ModelVerse - AI Model Maker PRO',
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:8000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
}

const specs = swaggerJsdoc(swaggerOptions)

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(compression())
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(limiter)

// API Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs))

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/models', authMiddleware, modelRoutes)
app.use('/api/users', authMiddleware, userRoutes)
app.use('/api/marketplace', marketplaceRoutes)
app.use('/api/training', authMiddleware, trainingRoutes)
app.use('/api/deployment', authMiddleware, deploymentRoutes)
app.use('/api/analytics', authMiddleware, analyticsRoutes)

// Socket.io setup
setupSocketHandlers(io)

// Error handling middleware
app.use(errorHandler)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  })
})

const PORT = process.env.PORT || 8000

async function startServer() {
  try {
    // Connect to database
    await connectDatabase()
    console.log('✅ Database connected successfully')

    // Connect to Redis
    await connectRedis()
    console.log('✅ Redis connected successfully')

    // Start server
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`)
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
  })
})

startServer()
