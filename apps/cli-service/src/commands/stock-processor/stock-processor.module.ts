import { Module } from '@nestjs/common';
import { StockModule } from '../../models/stock/stock.module';
import { StockProcessorService } from './stock-processor.service';
import { StockProcessorCommand } from './stock-processor.command';
import { VndirectClientModule } from '@manh/vndirect-client';

@Module({
  imports: [StockModule, VndirectClientModule],
  providers: [StockProcessorService, StockProcessorCommand],
})
export class StockProcessorModule {}
