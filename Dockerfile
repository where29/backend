# ---- build ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev=false
COPY . .
RUN npm run build || echo "skip if not using tsc"

# ---- run ----
FROM node:20-alpine
USER node
WORKDIR /app
COPY --from=build /app ./
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node","dist/index.js"]
