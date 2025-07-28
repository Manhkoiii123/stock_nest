import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JobProcessor } from './job.processor';

// event bridge
// cron
// standlone application

// News everyday 7AM
// Stocks everyweek Saturday 7AM

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const jobProcessor = app.get(JobProcessor);
  jobProcessor.process();
}
bootstrap();
