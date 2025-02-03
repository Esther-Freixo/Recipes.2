# Use Node.js base image
FROM node:16.14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3001 for the backend API
EXPOSE 3001

# Start the backend server
CMD ["npm", "start"]
