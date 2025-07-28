import { Module } from '@nestjs/common';
import { NewsProcessor } from './news.processor';
import { VndirectClientModule } from '../../../../../libs/vndirect-client/src';
import { PostModule } from '../../models/post/post.module';
import { StockModule } from '../../models/stock/stock.module';

@Module({
  imports: [VndirectClientModule, PostModule, StockModule],
  providers: [NewsProcessor],
  exports: [NewsProcessor],
})
export class NewsModule {}
