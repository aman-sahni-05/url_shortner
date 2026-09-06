FROM node:18-alpine
WORKDIR /url-shortner
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
CMD ["node","index.js"]
