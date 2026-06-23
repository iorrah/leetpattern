import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const prismaClientSingleton = () => {
  const databaseUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db';

  console.log('[PRISMA SYSTEM] Initializing LibSql Adapter with URL:', databaseUrl);

  // 💡 MODERN PRISMA 7 PATTERN: Pass the config object directly to the adapter.
  // Do not instantiate createClient() manually.
  const adapter = new PrismaLibSql({
    url: databaseUrl,
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
