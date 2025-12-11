import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const nodeEnv = configService.get<string>('nodeEnv');

  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(port!);
  Logger.log(`Application is running in ${nodeEnv} mode on: ${await app.getUrl()}`);
}
void bootstrap();
