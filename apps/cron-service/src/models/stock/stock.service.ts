import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class StockService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findStockBySymbol(symbol: string) {
    return this.databaseService.stock.findUnique({
      where: { symbol },
    });
  }
}
