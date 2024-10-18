# Use the official Node.js image as the base image
FROM node:20.16.0

# Set the working directory
WORKDIR /news-website/

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React application
RUN npm run build

# Use an official Nginx image for serving the application
FROM nginx:latest
COPY --from=0 /news-website/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
