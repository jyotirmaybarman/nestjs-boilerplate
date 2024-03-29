FROM node:20-alpine AS base

# Define stage for development
FROM base AS development

WORKDIR /app
ENV NODE_ENV=development

COPY package*.json ./
RUN npm i

COPY . .

# Define stage for production
FROM base AS production

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=development /app/dist ./dist

CMD ["npm", "run", "start:prod"]