import { Module } from '@nestjs/common';
import { StocksProcessor } from './stocks.processor';

@Module({
  providers: [StocksProcessor],
  exports: [StocksProcessor],
})
export class StocksModule {}
