import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('DAEMA_Auction')
    .setDescription('DAEMA_Auction 경매 목록 페이지')
    .setVersion('0.0.1')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
