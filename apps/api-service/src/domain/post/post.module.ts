import { Module } from '@nestjs/common';
import { PostController } from 'apps/api-service/src/domain/post/post.controller';

@Module({
  controllers: [PostController],
})
export class PostModule {}
