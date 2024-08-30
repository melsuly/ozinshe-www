FROM node:20-alpine

WORKDIR /app

RUN npm i -g pnpm@latest

COPY . .

RUN pnpm i

EXPOSE 3000

CMD ["pnpm", "dev"]
