import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appPort } from "config.json";
import { ValidationPipe } from '@nestjs/common';
import * as cors from "cors";
import { urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cors());
  app.use(urlencoded({ extended: true }));

  await app.listen(appPort, () => {
    console.log(`Server start in port: ${appPort}`);
  });
}
bootstrap();
