import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './infra/env/env'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  })

  // Activate Cookies middleware
  app.use(cookieParser())

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Order Logistics API')
    .setDescription('API Description for managing an order logistics company')
    .setVersion('1.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory, {
    customSiteTitle: 'Order Logistics API',
  })

  const configService: ConfigService<Env, true> = app.get(ConfigService)
  const port = configService.get('PORT', { infer: true })

  await app.listen(port)
}

bootstrap()
