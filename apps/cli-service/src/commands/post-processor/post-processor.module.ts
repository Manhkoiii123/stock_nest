import { Module } from '@nestjs/common';
import { VndirectClientModule } from '../../../../../libs/dstock/src';
import { PostProcessorService } from './post-processor.service';
import { PostProcessorCommand } from './post-processor.command';
import { PostModule } from '../../models/post/post.module';

@Module({
  imports: [PostModule, VndirectClientModule],
  providers: [PostProcessorService, PostProcessorCommand],
})
export class PostProcessorModule {}
