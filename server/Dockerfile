FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
ARG CACHEBUST=$(date +%s)
COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "run", "start:with-migrate" ]