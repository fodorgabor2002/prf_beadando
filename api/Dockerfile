FROM node:20

WORKDIR /api
ENV PORT=3080

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3080
CMD ["npm", "run", "start"]
