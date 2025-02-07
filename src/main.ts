import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './common/configs/swaggerConfig';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/api-doc', app, document)

  await app.listen(process.env.APP_PORT ?? 3000)
}
bootstrap();
