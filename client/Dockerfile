FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Install serve to run the production build
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "build", "-l", "3000"]