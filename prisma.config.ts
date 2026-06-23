import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    // 💡 Prisma 7 looks here to execute seeds via CLI commands
    seed: 'ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
  },
});
