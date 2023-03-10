import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MonetaryAidModule } from './monetary_aid/monetary_aid.module';

async function bootstrap() {
  const app = await NestFactory.create(MonetaryAidModule);
  const config = new DocumentBuilder()
    .setTitle('Humanitarian Aid Pulpo')
    .setDescription('API for Test Interview Pulpo')
    .setVersion('1.0')
    .addTag('Humanitarinan Aid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
