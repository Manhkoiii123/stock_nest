import { Module } from '@nestjs/common';
import { StockModule } from '../../models/stock/stock.module';
import { StockProcessorService } from './stock-processor.service';
import { VndirectClientModule } from '../../../../../libs/vndirect-client/src';
import { StockProcessorCommand } from './stock-processor.command';

@Module({
  imports: [StockModule, VndirectClientModule],
  providers: [StockProcessorService, StockProcessorCommand],
})
export class StockProcessorModule {}
