import { Command, CommandRunner } from 'nest-commander';
import { NewProcessorService } from './new-processor.service';

@Command({ name: 'process-news', description: 'Process news' })
export class NewProcessorCommand extends CommandRunner {
  constructor(private readonly newProcessorService: NewProcessorService) {
    super();
  }

  async run(): Promise<void> {
    await this.newProcessorService.processNews();
  }
}
