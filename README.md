# Nuxt 3

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

# Description

SSR application, order and product manager. Functions for user registration, order creation, and products associated with orders. Localization: English, Ukrainian

The project uses both composition api and options api for example usage

## command for start project in docker: docker-compose up -d --build

docker: docker-compose up -d --build

for dev: 

1. npm i 

2. set .env

NITRO_PORT= 3000
NITRO_HOST= localhost
VITE_API_ENDPOINT=http://localhost:3001/

3. npm run dev

unit test:

1. npm i 

2. npm run test
