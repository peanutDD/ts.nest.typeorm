import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { graphqlUploadExpress } from 'graphql-upload';
// import helmet from 'helmet';
// import csurf from 'csurf';
import { AppModule } from './app.module';
import config from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.use(helmet());
  // app.use(csurf());
  // app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.port);
}
bootstrap();
