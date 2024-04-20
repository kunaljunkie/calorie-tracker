# Use official Node.js image as the base image
FROM node:16 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the remaining application code to the working directory
COPY . .

# Build the Angular project
RUN ng build --prod

# Use a lightweight image to deploy the built application
FROM nginx:alpine

# Copy the built Angular app from the previous stage to the NGINX web server directory
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Expose port 80 to the outside world
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
