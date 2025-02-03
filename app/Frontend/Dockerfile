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

# Expose port 3000 for the development server
EXPOSE 3000

# Start the Vite dev server
CMD ["npm", "run", "dev"]
