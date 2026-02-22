# ---------- Builder ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# ⭐ copy prisma FIRST
COPY prisma ./prisma

# ⭐ generate prisma BEFORE build
RUN npx prisma generate

# ⭐ copy rest of source
COPY . .

# ⭐ now build nest
RUN npm run build


# ---------- Runtime ----------
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY prisma ./prisma

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]