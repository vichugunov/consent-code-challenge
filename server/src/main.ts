require('dotenv-safe').config()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
const port = process.env.port || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const options = new DocumentBuilder()
  .setTitle('Didomi code challenge')
  .setDescription('The didomi code challenge API description')
  .setVersion('1.0')
  .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(port)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();