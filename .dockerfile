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


# ---------- Runtime ----------
FROM node:18-alpine

WORKDIR /app

# Copy only needed files
COPY package*.json ./
RUN npm install --omit=dev

# Copy prisma + generated client + dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/dist ./dist

# Run migrations then start
CMD ["sh", "-c", "npx prisma migrate deploy --schema=./prisma/schema.prisma && node dist/main"]