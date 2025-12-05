FROM node:20-alpine

WORKDIR /ui
ENV PORT=4200

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .

ENV NODE_ENV=production

RUN npm run build -- --configuration production

RUN npm install -g serve

EXPOSE 4200
CMD ["serve", "-s", "dist", "-l", "4200"]
