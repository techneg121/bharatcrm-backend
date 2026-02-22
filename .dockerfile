# ---------- Builder ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy everything first
COPY . .

# Install deps
RUN npm install

# ⭐ Explicit schema path
RUN npx prisma generate --schema=./prisma/schema.prisma

# Build nest
RUN npm run build