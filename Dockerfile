FROM node:20-alpine AS dependencies

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS runtime

WORKDIR /app
RUN apk upgrade --no-cache
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src

USER node
EXPOSE 3000
CMD ["node", "src/app.js"]
