#!/bin/bash

# Exit on any error
set -e

# Make sure Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Error: Docker is not running. Please start Docker desktop first."
  exit 1
fi

# Generate timestamp-based tag
TAG=$(date +%Y%m%d%H%M%S)
echo "Building with tag: $TAG"

# Build the Docker image
echo "Building Docker image..."
docker build -t gcr.io/parkday-project/github.com:$TAG .

# Push to Google Container Registry
echo "Pushing to Container Registry..."
docker push gcr.io/parkday-project/github.com:$TAG

# Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy parkday-project \
  --image gcr.io/parkday-project/github.com:$TAG \
  --add-cloudsql-instances=parkday-project:us-east4:prod-postgres

echo "Deployment completed successfully!"
echo "Deployed image: gcr.io/parkday-project/github.com:$TAG"