import { Injectable, Logger } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class StockService {
  private readonly logger = new Logger(StockService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async createMany(data: CreateStockDto[]) {
    try {
      this.logger.log(`Creating ${data.length} stocks...`);
      return await this.databaseService.stock.createMany({
        data,
        skipDuplicates: true,
      });
    } catch (error) {
      this.logger.error('Failed to create stocks:', error);
      throw new Error(`Failed to create stocks: ${error.message}`);
    }
  }
}
