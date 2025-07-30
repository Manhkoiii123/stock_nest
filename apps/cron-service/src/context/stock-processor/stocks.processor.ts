import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { VndirectClientService } from '../../../../../libs/vndirect-client/src';
import { StockService } from '../../models/stock/stock.service';
import { CreateStockDto } from './dto/create-stock.dto';

@Injectable()
export class StocksProcessor {
  private readonly logger = new Logger(StocksProcessor.name);
  constructor(
    private readonly vndirectClientService: VndirectClientService,
    private readonly stockService: StockService,
  ) {}
  async process() {
    const stocks = await this.vndirectClientService.getStocks();
    const stockWithPriceHistory = [] as CreateStockDto[];
    for (let index = 0; index < stocks.length; index++) {
      const stock = stocks[index];
      if (stock.code) {
        const { currentPrice, changePrice } =
          await this.vndirectClientService.getPriceHistory('1D', stock.code);
        stockWithPriceHistory.push({
          symbol: stock?.code ?? '',
          companyName: stock.companyName ?? '',
          currentPrice: currentPrice ?? 0,
          percentChange: changePrice ?? 0,
        });
      }
    }
    console.log(
      '🚀 ~ StocksProcessor ~ process ~ stockWithPriceHistory:',
      stockWithPriceHistory,
    );

    // const processedStocks = stocks
    //   .filter((s) => s.code)
    //   .map((stock) => {
    //     const { currentPrice, changePrice } =
    //       this.vndirectClientService.getPriceHistory('1D', stock.code || '');
    //     return {
    //       symbol: stock?.code ?? '',
    //       companyName: stock.companyName ?? '',
    //       currentPrice,
    //       changePrice,
    //     };
    //   });

    try {
      this.logger.log(`Processing ${stockWithPriceHistory.length} stocks...`);
      await this.stockService.createMany(stockWithPriceHistory);
      this.logger.log('Stocks processed and saved to database successfully.');
    } catch (error) {
      this.logger.error('Error processing stocks:', error);
      throw new InternalServerErrorException('Failed to process stocks');
    }
  }
}
