import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import databaseConfig from './config/database.config';
import { environmentValidationSchema } from './config/env.validation';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, databaseConfig],
      validationSchema: environmentValidationSchema,
      validationOptions: {
        abortEarly: false,
      },
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
