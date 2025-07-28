import { Module } from '@nestjs/common';
import { VndirectClientModule } from '@manh/vndirect-client';
import { NewProcessorService } from './new-processor.service';
import { NewProcessorCommand } from './new-processor.command';
import { PostModule } from '../../models/post/post.module';

@Module({
  imports: [PostModule, VndirectClientModule],
  providers: [NewProcessorService, NewProcessorCommand],
})
export class NewProcessorModule {}
