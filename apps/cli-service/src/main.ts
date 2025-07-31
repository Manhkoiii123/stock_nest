import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap() {
  await CommandFactory.run(AppModule, {
    logger: ['debug', 'verbose', 'log', 'warn', 'error'],
  });
}

bootstrap();
