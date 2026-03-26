import { PrismaClient } from "@prisma/client";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

// Required for Neon
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Missing DATABASE_URL environment variable");
}

// 👇 create function first (important for typing)
function createPrismaClient() {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);

  return new PrismaClient({ adapter }).$extends({
    result: {
      product: {
        price: {
          compute(p) {
            return p.price.toString();
          },
        },
        rating: {
          compute(p) {
            return p.rating.toString();
          },
        },
      },
    },
  });
}

// 👇 infer correct type
type PrismaClientType = ReturnType<typeof createPrismaClient>;

// 👇 global typing using inferred type
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}