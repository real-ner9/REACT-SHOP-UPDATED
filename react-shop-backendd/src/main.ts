import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { AppConfiguration } from './config/configuration';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfiguration>('app');

  if (!appConfig) {
    throw new Error('Application configuration is not available');
  }

  await app.listen(appConfig.port);
}

void bootstrap();
