import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options = configService.get<TypeOrmModuleOptions>('database');

        if (!options) {
          throw new Error('Database configuration is not available');
        }

        return {
          ...options,
          autoLoadEntities: true,
        } satisfies TypeOrmModuleOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
