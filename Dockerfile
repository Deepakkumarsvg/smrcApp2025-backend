# Use the official lightweight Node.js image.
# https://hub.docker.com/_/node
FROM node:18
# Create and change to the app directory.
WORKDIR /usr/src/app

# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# RUN npm install --dev
RUN npm install

# Copy local code to the container image.
COPY . ./

# EXPOSE PORT
EXPOSE 5000

# Run the web service on container startup.
CMD [ "node", "app.js" ]