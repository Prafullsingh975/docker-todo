
# Use the official Node.js image as the base image
FROM node:20-alpine  

# Install pnpm
RUN npm install -g pnpm

# Set the working directory in the container to /app
WORKDIR /app

 # Copy package.json, package-lock.json and prisma file to the working directory for caching purposes (Layer Caching)
COPY package*.json .

# Running the following commands to install dependencies and build the project
RUN pnpm install 

COPY prisma ./prisma

# RUN npx prisma generate

# Copy all the files from the src directory to /app in the container used dockerignore to ignore node_modules and dist for now
COPY . .

RUN npx prisma generate
RUN pnpm run build
# Expose port 2000 to the outside world
EXPOSE 2000

# Start the application using the built JavaScript files in the dist directory
CMD ["node","dist/index.js"]
