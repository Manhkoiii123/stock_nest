import { Injectable, Logger } from '@nestjs/common';
import { NewsProcessor } from './context/news-processor/news.processor';
import { StocksProcessor } from './context/stock-processor/stocks.processor';

// idempotent => làm sao biết được là bài cũ bài mới

@Injectable()
export class JobProcessor {
  private readonly logger = new Logger(JobProcessor.name);

  constructor(
    private readonly newsProcessor: NewsProcessor,
    private readonly stocksProcessor: StocksProcessor,
  ) {}

  process() {
    this.logger.log('Processing jobs...');

    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // News everyday 7AM (Monday to Sunday)
    if ([7, 9].includes(currentHour)) {
      this.logger.log(`Processing news at ${currentHour}:00...`);
      this.newsProcessor.process();
    }

    // Stocks every Saturday 10AM
    if (currentDay === 6 && currentHour === 10) {
      // Saturday = 6
      this.logger.log('Processing stocks at 10AM Saturday...');
      this.stocksProcessor.process();
    }
  }
}
