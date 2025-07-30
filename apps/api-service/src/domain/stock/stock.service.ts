import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../../../libs/database/src';

@Injectable()
export class StockService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findStocks() {
    return this.databaseService.stock.findMany();
  }
  async findStockBySymbol(symbol: string) {
    return this.databaseService.stock.findUnique({
      where: { symbol },
    });
  }
}
