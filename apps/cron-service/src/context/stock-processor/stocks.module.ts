import { Module } from '@nestjs/common';
import { StocksProcessor } from './stocks.processor';
import { VndirectClientModule } from '../../../../../libs/vndirect-client/src';
import { PostModule } from '../../models/post/post.module';
import { StockModule } from '../../models/stock/stock.module';

@Module({
  imports: [VndirectClientModule, PostModule, StockModule],
  providers: [StocksProcessor],
  exports: [StocksProcessor],
})
export class StocksModule {}
