import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from "@nestjs/common"

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
     origin: process.env.FRONTEND_URL,   
   });
   /**
    * handle all user input validation globally 
    * Commented for future use
    */
   app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 4001);
}
bootstrap();
