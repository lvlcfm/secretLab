FROM node:alpine as builder
# Setting the working directory to /app
WORKDIR '/app'
# Copy the current package.json contents into the container at  /app
COPY ./package.json ./
# Copy the rest of the conntents
COPY . .
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the start script when the container launches
CMD ["npm", "run", "start"]