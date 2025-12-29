# apps/FeatureFlagAPI/Dockerfile

# Development stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS development
WORKDIR /app

# Install AWS CLI for local development (optional)
RUN apt-get update && apt-get install -y curl unzip && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf awscliv2.zip aws && \
    apt-get clean

# Copy csproj and restore dependencies
COPY apps/FeatureFlagAPI/*.csproj ./
RUN dotnet restore
RUN dotnet dev-certs https --trust 

# Copy source code
COPY apps/FeatureFlagAPI/ ./

# Expose ports
EXPOSE 5000
EXPOSE 5001

# Development command with hot reload
CMD ["dotnet", "watch", "run", "--urls", "http://127.0.0.1:5000;https://127.0.0.1:5001", "--no-launch-profile"]