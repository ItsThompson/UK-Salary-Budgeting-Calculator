# UK Salary Budgeting Calculator

A comprehensive web application for calculating post-tax income from UK salary, bonuses, and stock grants, with integrated budget planning functionality. Originally built as a Python CLI tool, now evolved into a full-stack web application with React frontend and FastAPI backend.

## Project Overview

This application helps UK-based professionals understand their true take-home pay by:
- Calculating accurate UK Income Tax and National Insurance deductions
- Processing equity compensation (bonuses, stock grants) with custom vesting schedules
- Providing monthly budget breakdowns with expense categorization
- Offering a modern web interface for easy interaction

## Features

### Backend (Python + FastAPI)
- **Accurate UK Tax Calculations**: 2024/25 tax rates for Income Tax and National Insurance
- **Equity Compensation Support**: Bonuses and stock grants with flexible vesting schedules
- **Budget Planning**: Monthly budget breakdown with customizable expense categories
- **JSON Configuration**: Easy-to-use configuration system
- **Comprehensive Testing**: Full test coverage with pytest
- **RESTful API**: FastAPI endpoints for frontend integration

### Frontend (React + TypeScript)
- **Modern React Architecture**: Built with React Router and TypeScript
- **Responsive Design**: TailwindCSS for clean, mobile-friendly UI
- **Real-time Data Fetching**: SWR for efficient API communication
- **Hot Module Replacement**: Fast development experience with Vite

### DevOps & Deployment
- **Dockerized Architecture**: Containerized services for consistent deployment
- **Development & Production Modes**: Optimized configurations for different environments
- **Multi-stage Builds**: Efficient, production-ready Docker images
- **Cloud-Ready**: Suitable for deployment on AWS ECS, Kubernetes, or other container platforms

## Quick Start

### Prerequisites
- Docker
- Docker Compose (v2+)

### Development Mode (Hot Reload)

Start both frontend and backend services:

```bash
docker compose -f docker-compose.dev.yml up --build
```

### Access Services

| Service  | URL                                            | Description                    |
| -------- | ---------------------------------------------- | ------------------------------ |
| Frontend | [http://localhost:5173](http://localhost:5173) | React development server       |
| Backend  | [http://localhost:8000](http://localhost:8000) | FastAPI with auto-reload       |

### Development Notes
- Frontend uses React Router dev server with hot reload
- Backend runs with `uvicorn --reload` for automatic code reloading
- Frontend communicates with backend via `http://localhost:8000`
- `node_modules` is isolated inside Docker containers

### Stop Development Environment

```bash
Ctrl + C
```

Clean up containers and volumes:
```bash
docker compose -f docker-compose.dev.yml down -v
```

### Production Mode

Build and run optimized production images:

```bash
docker compose up --build
```

### Production Access

| Service  | URL                                            | Description                    |
| -------- | ---------------------------------------------- | ------------------------------ |
| Frontend | [http://localhost:3000](http://localhost:3000) | Optimized React build          |
| Backend  | [http://localhost:8000](http://localhost:8000) | Production FastAPI server      |

### Production Notes
- Multi-stage Docker builds for smaller, optimized images
- No hot reload or development dependencies
- Ready for deployment to cloud platforms (ECS, Kubernetes, etc.)

### Stop Production Environment

```bash
docker compose down
```

## Project Structure

```
UK-Salary-Budgeting-Calculator/
├── backend/                    # Python FastAPI backend
│   ├── api.py                 # FastAPI application and routes
│   ├── main.py                # CLI application entry point
│   ├── tax_calculator.py      # UK tax calculation engine
│   ├── equity_calculator.py   # Bonus and stock grant processing
│   ├── budget_calculator.py   # Budget calculation and formatting
│   ├── test_*.py             # Comprehensive test suite
│   └── *.json               # Configuration examples
├── frontend/                  # React TypeScript frontend
│   ├── app/                  # React Router application
│   │   ├── routes/          # Page components and routing
│   │   └── common/          # Shared utilities and components
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
├── docker-compose.yml         # Production Docker configuration
├── docker-compose.dev.yml     # Development Docker configuration
└── README.md                 # This file
```

## Backend Usage (CLI Mode)

The backend can also be used as a standalone CLI application:

### Generate Example Configuration
```bash
cd backend
python3 main.py --generate-example
```

### Run Budget Calculation
```bash
python3 main.py --config example_config.json
```

For detailed backend documentation, see [backend/README.md](backend/README.md).

## API Integration

The FastAPI backend provides RESTful endpoints that the React frontend consumes:
- CORS middleware for cross-origin requests
- JSON-based request/response handling
- Seamless integration for tax and budget calculations
- Real-time data synchronization between frontend and backend

## Testing

Run backend tests:
```bash
cd backend
python3 -m pytest -v
```

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Router Documentation](https://reactrouter.com/)
- [UK Tax Rates 2024/25](https://www.gov.uk/income-tax-rates)
- [Docker Documentation](https://docs.docker.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
