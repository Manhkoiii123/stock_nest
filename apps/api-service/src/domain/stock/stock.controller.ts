import { Controller, Get, Param } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}
  @Get()
  findAll() {
    return this.stockService.findStocks();
  }

  @Get(':symbol')
  findStockBySymbol(@Param('symbol') symbol: string) {
    return this.stockService.findStockBySymbol(symbol);
  }
}
