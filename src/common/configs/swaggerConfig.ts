import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle('api-documents')
  .setDescription('nest js swagger document')
  .setVersion('1.0')
  .addTag('docx')
  .build()