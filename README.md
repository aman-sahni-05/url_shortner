
**URL Shortener**
A lightweight Node.js URL shortener application backed by a PostgreSQL database, configured for both local Docker Compose workflows and Kubernetes (kind) orchestration.

Prerequisites
  >Git
  >Docker & Docker Compose
  >Kubernetes CLI (kubectl)
  >kind (Kubernetes in Docker)

Method #1: Running with Docker Compose (Fastest)
Clone the repository:

1. git clone https://github.com/amansahni05/url-shortner.git
2. cd url-shortner
3. Configure environment variables:
4. Create a .env file in the root directory:
    PORT=3000
    DB_HOST=postgres
    DB_USER=postgres
    DB_PASSWORD=mypassword
    DB_NAME=urlshortner

Spin up the stack:
docker compose up --build



Method #2: Running on Kubernetes (kind)
Clone the repository:

1. git clone https://github.com/amansahni05/url-shortner.git
2. cd url-shortner
3. Create a local cluster:
    kind create cluster --name kind-cluster2
    Build and load the Docker image:

docker build -t amansahni05/url-shortner:latest .
kind load docker-image amansahni05/url-shortner:latest --name kind-cluster2
Apply Kubernetes manifests:
  kubectl apply -f k8s/
  Access the application:

kubectl port-forward svc/url-app-service 8080:80
API Endpoints
Shorten URL (POST /shorten):

Bash
curl -X POST http://localhost:8080/shorten \
  -H "Content-type: application/json" \
  -d '{"original_url": "https://google.com"}'
Redirect (GET /:code):
Open http://localhost:8080/<short_code> in your browser or via curl to be redirected to the original destination URL.
