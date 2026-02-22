# ---------- Builder ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# ⭐ Install ALL deps (including dev)
RUN npm install

# Copy prisma schema
COPY prisma ./prisma

# ⭐ Generate prisma client
RUN npx prisma generate

# Copy rest of source
COPY . .

# Build Nest
RUN npm run build


# ---------- Runtime ----------
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# ⭐ Only production deps here
RUN npm install --omit=dev

# Copy prisma (needed for migrate)
COPY prisma ./prisma

# Copy built files + node_modules from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# ⭐ Run migrations then start
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]