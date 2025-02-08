import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './common/configs/swaggerConfig';
import { ValidationPipe } from '@nestjs/common';
import { static as express_static} from 'express'
import { join } from 'path';
import { config } from 'dotenv';
config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  // app.use('/uploads', express_static(join(process.cwd(), 'uploads')))
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/api-doc', app, document)

  await app.listen(process.env.APP_PORT ?? 3000)
}
bootstrap();
