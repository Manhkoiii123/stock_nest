import { Command, CommandRunner } from 'nest-commander';
import { PostProcessorService } from './post-processor.service';

@Command({ name: 'process-posts', description: 'Process posts' })
export class PostProcessorCommand extends CommandRunner {
  constructor(private readonly postProcessorService: PostProcessorService) {
    super();
  }

  async run(): Promise<void> {
    await this.postProcessorService.processPosts();
  }
}
