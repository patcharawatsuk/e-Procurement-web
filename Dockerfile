# Base image
FROM node:18.15.0 as build

# Set environment variable for the build context
ARG ENVIRONMENT=dev

WORKDIR /app

COPY package*.json ./

COPY check-node-version.js ./

# RUN npm install

RUN npm install

COPY . .

# Copy the appropriate .env file based on the build argument
COPY ./env/.env.${ENVIRONMENT} ./.env.local

RUN npm run build

# Nginx image
FROM nginx:1.21.1-alpine

# Copy the built application from the previous stage
COPY --from=build /app/out /usr/share/nginx/html

# Copy the Nginx configuration file
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]