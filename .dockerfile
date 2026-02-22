# ---------- Builder ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy everything first
COPY . .

# Install ALL deps (dev needed for prisma + nest build)
RUN npm install

# Generate prisma client AFTER install
RUN npx prisma generate

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
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]