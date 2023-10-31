# Base image for node 18 LTS
FROM node:lts-alpine as BUILD_IMAGE

WORKDIR /app

# Install python and build-base for node-gyp
RUN apk add --no-cache python3 make g++ && ln -sf python3 /usr/bin/python

# Copy package.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build


FROM node:lts-alpine as PRODUCTION_IMAGE

WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist ./dist
COPY package*.json .
COPY vite.config.ts .

# Install python and build-base for node-gyp
# RUN apk add --no-cache python3 make g++ && ln -sf python3 /usr/bin/python

# RUN  npm install typescript

# Install serve
RUN npm install -g serve

EXPOSE 8080

# CMD ["npm", "run", "preview"]
CMD ["serve", "-s", "dist", "-p", "8080"]