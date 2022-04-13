#!/bin/sh

echo "NODE_ENV=production" > .env
echo "API_LISTEN_PORT="${API_LISTEN_PORT} >> .env
echo "DIALECT="${DIALECT} >> .env
echo "HOST="${HOST} >> .env
echo "PORT="${PORT} >> .env
echo "DB="${DB} >> .env
echo "USERNAME="${USERNAME} >> .env
echo "PASSWORD="${PASSWORD} >> .env

pm2-runtime start ecosystem.config.cjs