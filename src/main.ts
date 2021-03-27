import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const { NODE_ENV } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  const port = NODE_ENV === 'development' ? 3006 : 3006;
  app.enableCors();
  app.setGlobalPrefix('/api');

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API endpoints')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}
bootstrap();
