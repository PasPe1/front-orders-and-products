FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV VITE_API_ENDPOINT=http://localhost:3001/

COPY . .

RUN npm run build

ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0

EXPOSE 3000

# CMD ["sh", "-c", "npm run build"]
