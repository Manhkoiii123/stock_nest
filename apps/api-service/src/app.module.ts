import { Module } from '@nestjs/common';
import { DatabaseModule } from 'apps/api-service/src/database/database.module';
import { PostModule } from 'apps/api-service/src/domain/post/post.module';

@Module({
  imports: [PostModule, DatabaseModule],
})
export class AppModule {}
