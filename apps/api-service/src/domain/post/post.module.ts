import { Module } from '@nestjs/common';
import { PostController } from 'apps/api-service/src/domain/post/post.controller';
import { PostService } from 'apps/api-service/src/domain/post/post.service';
import { DatabaseModule } from '../../../../../libs/database/src';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [DatabaseModule],
})
export class PostModule {}
