import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { DatabaseService } from '../../../../../libs/database/src';

@Module({
  providers: [PostService],
  exports: [PostService],
  imports: [DatabaseService],
})
export class PostModule {}
