import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { DatabaseModule } from '../../../../../libs/database/src';

@Module({
  providers: [PostService],
  exports: [PostService],
  imports: [DatabaseModule],
})
export class PostModule {}
