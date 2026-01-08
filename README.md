## Running the App

This project is split into two services:

* **Frontend** → React (Vite + React Router)
* **Backend** → Python (FastAPI)

Docker is used for both **development** and **production**.

### Development Mode (Hot Reload)

### Requirements

* Docker
* Docker Compose (v2+)

### Start the app (dev)

From the project root:

```bash
docker compose -f docker-compose.dev.yml up --build
```

### Access services

| Service  | URL                                            |
| -------- | ---------------------------------------------- |
| Frontend | [http://localhost:5173](http://localhost:5173) |
| Backend  | [http://localhost:8000](http://localhost:8000) |

### Notes

* Frontend uses the React Router dev server (`react-router dev --host`)
* Backend runs with `uvicorn --reload`
* The frontend talks to the backend via `http://localhost:8000`
* `node_modules` is isolated inside Docker to avoid host/OS issues

### Stop the app

```bash
Ctrl + C
```

To fully clean containers and volumes:

```bash
docker compose -f docker-compose.dev.yml down -v
```

### Production Mode

Production mode builds **optimized, immutable images**:

* No hot reload
* No volume mounts
* Smaller, production-ready images

### Start the app (prod)

From the project root:

```bash
docker compose up --build
```

### Access services

| Service  | URL                                            |
| -------- | ---------------------------------------------- |
| Frontend | [http://localhost:3000](http://localhost:3000) |
| Backend  | [http://localhost:8000](http://localhost:8000) |

### Notes

* Frontend is built using a multi-stage Docker build
* Backend runs FastAPI with Uvicorn (no reload)
* Containers are suitable for deployment to ECS / Kubernetes / etc.

### Stop the app

```bash
docker compose down
```
