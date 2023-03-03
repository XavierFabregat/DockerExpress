FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install


# Bundle app source
COPY . .

RUN npm run build

RUN ls -la

EXPOSE 8080


CMD [ "node","./dist/index.js" ]