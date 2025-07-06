import { Module } from '@nestjs/common';
import { PostModule } from 'apps/api-service/src/domain/post/post.module';

@Module({
  imports: [PostModule, AppModule],
})
export class AppModule {}
