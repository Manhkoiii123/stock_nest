import { VndirectClientService } from '@manh/vndirect-client';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DatabaseService } from 'apps/api-service/src/database/database.service';

@Injectable()
export class IntegrationVndirectService {
  private logger = new Logger(IntegrationVndirectService.name);
  constructor(
    private readonly vndirectClientService: VndirectClientService,
    private readonly databaseService: DatabaseService,
  ) {}

  async processStocks() {
    const stocks = await this.vndirectClientService.getStocks();

    const processedStocks = stocks.map((stock) => {
      return {
        symbol: stock?.code,
        companyName: stock.companyName,
      };
    });

    try {
      this.logger.log(`Processing ${processedStocks.length} stocks...`);
      // persist database;
      await this.databaseService.stock.createMany({
        data: processedStocks,
        skipDuplicates: true,
      });

      this.logger.log('Stocks processed and saved to database successfully.');
    } catch (error) {
      this.logger.error('Error processing stocks:', error);
      throw new InternalServerErrorException('Failed to process stocks');
    }
  }
}
