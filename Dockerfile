FROM node:18-alpine
ENV NODE_ENV production

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./package-lock.json

RUN npm install --production=false

COPY . .

COPY ./config/production.example.json ./config/production.json

CMD ["npm", "run", "build"]


