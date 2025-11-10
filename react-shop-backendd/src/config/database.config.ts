import { registerAs } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type DatabaseConfiguration = TypeOrmModuleOptions;

export default registerAs('database', (): DatabaseConfiguration => {
  const synchronize = process.env.TYPEORM_SYNCHRONIZE === 'true';
  const ssl = process.env.DATABASE_SSL === 'true';
  const logging = process.env.TYPEORM_LOGGING === 'true';

  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number.parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    schema: process.env.DATABASE_SCHEMA ?? 'public',
    synchronize,
    logging,
    ssl: ssl
      ? {
          rejectUnauthorized:
            process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false',
        }
      : undefined,
    autoLoadEntities: true,
    entities: ['dist/**/*.entity.js'],
  } satisfies TypeOrmModuleOptions;
});
