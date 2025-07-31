import { Command, CommandRunner } from 'nest-commander';
import { StockProcessorService } from './stock-processor.service';

@Command({ name: 'process-stocks', description: 'Process stocks' })
export class StockProcessorCommand extends CommandRunner {
  constructor(private readonly stockProcessorService: StockProcessorService) {
    super();
  }

  async run(): Promise<void> {
    console.log('Starting stock processing...');
    await this.stockProcessorService.processStocks();
  }
}
