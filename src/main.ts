import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { env } from './lib/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT);
}
bootstrap();
