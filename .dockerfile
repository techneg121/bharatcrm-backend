# ---------- Builder ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install deps
RUN npm install

# Copy full source FIRST
COPY . .

# Generate Prisma AFTER full copy
RUN npx prisma generate

# Build Nest
RUN npm run build


# ---------- Runtime ----------
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install prod deps
RUN npm install --omit=dev

# Copy prisma
COPY prisma ./prisma

# Copy built output + node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Run migrations + start
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]