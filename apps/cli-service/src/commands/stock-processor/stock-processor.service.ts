import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { StockService } from '../../models/stock/stock.service';
import { VndirectClientService } from '../../../../../libs/vndirect-client/src';

@Injectable()
export class StockProcessorService {
  private logger = new Logger(StockProcessorService.name);
  constructor(
    private readonly vndirectClientService: VndirectClientService,
    private readonly stockService: StockService,
  ) {}

  async processStocks() {
    const stocks = await this.vndirectClientService.getStocks();

    const processedStocks = stocks.map((stock) => {
      return {
        symbol: stock?.code ?? '',
        companyName: stock.companyName ?? '',
      };
    });

    try {
      this.logger.log(`Processing ${processedStocks.length} stocks...`);
      await this.stockService.createMany(processedStocks);
      this.logger.log('Stocks processed and saved to database successfully.');
    } catch (error) {
      this.logger.error('Error processing stocks:', error);
      throw new InternalServerErrorException('Failed to process stocks');
    }
  }
}
