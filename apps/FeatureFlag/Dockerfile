# apps/FeatureFlag/Dockerfile

# Development stage
FROM node:20-alpine AS development
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 4200

# Development command (overridden by docker-compose)
CMD ["npx", "nx", "serve", "FeatureFlag", "--host", "0.0.0.0"]