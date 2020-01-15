FROM node
WORKDIR /src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Copy app contents
COPY . .

# Start the app
CMD [ "npm", "start"]