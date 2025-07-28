import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NewsProcessor {
  private readonly logger = new Logger(NewsProcessor.name);

  process() {
    this.logger.log('Processing news...');
    // vndirect
    // query db
    // vndirect vs db
    // persist to db
  }
}
