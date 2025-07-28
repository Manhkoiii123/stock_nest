import { Module } from '@nestjs/common';
import { NewsProcessor } from './news.processor';

@Module({
  providers: [NewsProcessor],
  exports: [NewsProcessor],
})
export class NewsModule {}
