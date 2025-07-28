import { Module } from '@nestjs/common';
import { JobProcessor } from './job.processor';
import { NewsModule } from './context/news-processor/news.module';
import { StocksModule } from './context/stock-processor/stocks.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, NewsModule, StocksModule],
  providers: [JobProcessor],
})
export class AppModule {}
