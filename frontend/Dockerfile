FROM node:16 AS Production

WORKDIR /src/client

ENV NODE_ENV=production

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm run start"]