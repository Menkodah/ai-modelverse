# Contributing to ModelVerse 🚀

Thank you for your interest in contributing to ModelVerse! This document provides guidelines and information for contributors.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Code Review Guidelines](#code-review-guidelines)
- [Issue Reporting](#issue-reporting)
- [Community Guidelines](#community-guidelines)

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm 9+
- **Python** 3.9+
- **Docker** and Docker Compose
- **Git** 2.30+
- **PostgreSQL** 15+ (for local development)
- **Redis** 7+ (for local development)

### Quick Start

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/modelverse.git
   cd modelverse
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

## Development Setup

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Development

```bash
cd backend
npm install
npm run dev
```

The backend API will be available at `http://localhost:8000`

### ML Engine Development

```bash
cd ml-engine
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8001
```

The ML engine will be available at `http://localhost:8001`

### Database Setup

```bash
cd backend
npm run migrate
npm run db:seed
```

## Project Structure

```
modelverse/
├── frontend/                 # Next.js React application
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   ├── components/      # Reusable React components
│   │   ├── lib/            # Utility functions and libraries
│   │   ├── types/          # TypeScript type definitions
│   │   └── styles/         # Global styles and CSS modules
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── config/         # Configuration files
│   └── package.json
├── ml-engine/              # Python FastAPI ML engine
│   ├── ml_modules/         # ML training and inference modules
│   ├── utils/              # Utility functions
│   ├── tests/              # Test files
│   └── requirements.txt
├── database/               # Database schemas and migrations
├── docs/                   # Documentation
├── deployment/             # Docker and deployment configs
└── package.json           # Root package.json for scripts
```

## Coding Standards

### TypeScript/JavaScript

- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Use **functional components** with hooks
- Implement proper **error handling**
- Add **JSDoc** comments for complex functions

```typescript
/**
 * Calculates the accuracy of a model prediction
 * @param predictions - Array of predicted values
 * @param actual - Array of actual values
 * @returns Accuracy percentage
 */
export function calculateAccuracy(predictions: number[], actual: number[]): number {
  if (predictions.length !== actual.length) {
    throw new Error('Predictions and actual values must have the same length');
  }
  
  const correct = predictions.filter((pred, index) => pred === actual[index]).length;
  return (correct / predictions.length) * 100;
}
```

### Python

- Follow **PEP 8** style guidelines
- Use **type hints** for all functions
- Implement proper **error handling**
- Add **docstrings** for all functions and classes

```python
from typing import List, Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)

def train_model(
    model_type: str,
    dataset_path: str,
    hyperparameters: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Train a machine learning model.
    
    Args:
        model_type: Type of model to train
        dataset_path: Path to the training dataset
        hyperparameters: Optional hyperparameters for the model
        
    Returns:
        Dictionary containing training results
        
    Raises:
        ValueError: If model_type is not supported
        FileNotFoundError: If dataset_path doesn't exist
    """
    try:
        # Implementation here
        pass
    except Exception as e:
        logger.error(f"Training failed: {str(e)}")
        raise
```

### CSS/Styling

- Use **Tailwind CSS** for styling
- Follow **BEM** methodology for custom CSS
- Use **CSS custom properties** for theming
- Ensure **responsive design**

```css
/* Custom component styles */
.model-card {
  @apply bg-dark-800 border border-dark-700 rounded-xl p-6;
  @apply hover:shadow-lg transition-all duration-200;
}

.model-card--featured {
  @apply border-primary-500;
  @apply hover:border-primary-400;
}
```

## Testing

### Frontend Testing

```bash
cd frontend
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage
```

### Backend Testing

```bash
cd backend
npm test                   # Run all tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage
```

### ML Engine Testing

```bash
cd ml-engine
pytest                    # Run all tests
pytest -v                 # Verbose output
pytest --cov=.           # With coverage
```

### Testing Guidelines

- Write **unit tests** for all new functions
- Aim for **80%+ code coverage**
- Test **edge cases** and error conditions
- Use **mocking** for external dependencies
- Write **integration tests** for critical paths

## Pull Request Process

### Before Submitting

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow coding standards
   - Add tests for new functionality
   - Update documentation if needed

3. **Run tests locally**
   ```bash
   npm test
   npm run lint
   npm run type-check
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new model training feature"
   ```

### Commit Message Format

Use **Conventional Commits** format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes

Examples:
```
feat(frontend): add model creation wizard
fix(backend): resolve authentication token issue
docs: update API documentation
```

### Submitting a PR

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request**
   - Use the PR template
   - Provide clear description
   - Link related issues
   - Add screenshots for UI changes

3. **Wait for review**
   - Address review comments
   - Make requested changes
   - Re-request review when ready

## Code Review Guidelines

### For Reviewers

- **Be constructive** and respectful
- **Focus on code quality** and functionality
- **Check for security issues**
- **Verify test coverage**
- **Ensure documentation is updated**

### For Authors

- **Respond to all comments**
- **Make requested changes**
- **Ask questions if unclear**
- **Keep commits clean and focused**

## Issue Reporting

### Bug Reports

When reporting bugs, include:

1. **Clear description** of the issue
2. **Steps to reproduce**
3. **Expected vs actual behavior**
4. **Environment details** (OS, browser, versions)
5. **Screenshots or logs** if applicable

### Feature Requests

When requesting features, include:

1. **Clear description** of the feature
2. **Use case** and benefits
3. **Proposed implementation** (if you have ideas)
4. **Priority level**

## Community Guidelines

### Code of Conduct

- **Be respectful** and inclusive
- **Help others** learn and grow
- **Provide constructive feedback**
- **Follow project guidelines**

### Communication

- Use **GitHub Issues** for discussions
- Join our **Discord community**
- Follow our **blog** for updates
- Attend **community events**

### Recognition

Contributors will be recognized through:

- **GitHub contributors** list
- **Release notes** mentions
- **Community spotlight** features
- **Contributor badges**

## Getting Help

- **Documentation**: [docs.modelverse.ai](https://docs.modelverse.ai)
- **Discord**: [Join our community](https://discord.gg/modelverse)
- **Issues**: [GitHub Issues](https://github.com/yourusername/modelverse/issues)
- **Email**: contributors@modelverse.ai

## License

By contributing to ModelVerse, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to ModelVerse! 🎉
