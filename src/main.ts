import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './common/configs/swaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/api-doc', app, document)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap();
