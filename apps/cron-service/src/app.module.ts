import { Module } from '@nestjs/common';
import { JobProcessor } from './job.processor';
import { NewsModule } from './context/news-processor/news.module';
import { StocksModule } from './context/stock-processor/stocks.module';

@Module({
  imports: [NewsModule, StocksModule],
  providers: [JobProcessor],
})
export class AppModule {}
