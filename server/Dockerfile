# Use official Node.js LTS lightweight image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package manifests for efficient layer caching
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Expose backend port
EXPOSE 3000

# Start backend server
CMD ["node", "server.js"]
