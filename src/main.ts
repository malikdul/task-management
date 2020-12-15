import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('main.bootstrap')
  const app = await NestFactory.create(AppModule);
  /** Swagger Integration */
  const options = new DocumentBuilder()
    .setTitle('Task API')
    .setDescription('The Task API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(serverConfig.port);
  logger.log(`Application listening on port ${serverConfig.port}`)
}
bootstrap();
