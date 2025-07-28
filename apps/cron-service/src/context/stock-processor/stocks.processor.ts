import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class StocksProcessor {
  private readonly logger = new Logger(StocksProcessor.name);

  process() {
    this.logger.log('Processing stocks...');
  }
}
