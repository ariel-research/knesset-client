# Use a Node.js base image
FROM node:14-alpine

# Set the working directory
WORKDIR /client

# Copy package.json and package-lock.json to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React app
RUN npm run build

# Use a smaller base image suitable for serving static files
FROM nginx:alpine

# Copy the built app files to the nginx web root directory
COPY --from=0 /client/build/ /usr/share/nginx/html

# Expose the port that Nginx will listen on (default is 80)
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
