FROM node:12-alpine
RUN apk add --no-cache python g++ make
WORKDIR /docker-getting-started-app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
CMD ["node", "src/index.js"]