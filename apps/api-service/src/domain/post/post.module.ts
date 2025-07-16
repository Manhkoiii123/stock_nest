import { Module } from '@nestjs/common';
import { PostController } from 'apps/api-service/src/domain/post/post.controller';
import { PostService } from 'apps/api-service/src/domain/post/post.service';

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
