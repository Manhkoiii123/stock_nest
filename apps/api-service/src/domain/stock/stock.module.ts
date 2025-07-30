import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../../../libs/database/src';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';

@Module({
  controllers: [StockController],
  providers: [StockService],
  imports: [DatabaseModule],
})
export class StockModule {}
