import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../../../libs/database/src';
import { CreateStockDto } from '../../context/stock-processor/dto/create-stock.dto';

@Injectable()
export class StockService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findStockBySymbol(symbol: string) {
    return this.databaseService.stock.findUnique({
      where: { symbol },
    });
  }
  async createMany(data: CreateStockDto[]) {
    try {
      return await this.databaseService.stock.createMany({
        data,
        skipDuplicates: true,
      });
    } catch (error) {
      throw new Error(`Failed to create stocks: ${error.message}`);
    }
  }
  async create(data: CreateStockDto) {
    try {
      return await this.databaseService.stock.create({
        data,
      });
    } catch (error) {
      throw new Error(`Failed to create stock: ${error.message}`);
    }
  }
}
