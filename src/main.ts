import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';
import { Env } from './env';

async function bootstrap() {
  console.log('Envoriment: ', Env);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '50mb' }));

  await app.listen(3000);
}
bootstrap();
