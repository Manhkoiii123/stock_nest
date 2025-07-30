import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { DatabaseModule } from '../../../../../libs/database/src';

@Module({
  providers: [StockService],
  exports: [StockService],
  imports: [DatabaseModule],
})
export class StockModule {}
