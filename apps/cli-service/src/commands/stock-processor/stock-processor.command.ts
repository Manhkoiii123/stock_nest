import { Command, CommandRunner } from 'nest-commander';
import { StockProcessorService } from './stock-processor.service';

@Command({ name: 'process-stocks', description: 'Process stocks' })
export class StockProcessorCommand extends CommandRunner {
  constructor(private readonly stockProcessorService: StockProcessorService) {
    super();
  }

  async run(): Promise<void> {
    await this.stockProcessorService.processStocks();
  }
}
