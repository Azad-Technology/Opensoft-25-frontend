FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the app
RUN npm run build

# Install serve
RUN npm install -g serve

ENV PORT=8565
ENV HOST=0.0.0.0

EXPOSE $PORT

# Verify the dist directory exists and show contents (for debugging)
RUN ls -la dist/

# Serve from dist directory
CMD ["serve", "-s", "dist", "-l", "8565"]