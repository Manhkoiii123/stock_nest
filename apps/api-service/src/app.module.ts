import { Module } from '@nestjs/common';
import { DatabaseModule } from 'apps/api-service/src/database/database.module';
import { IntegrationVndirectModule } from 'apps/api-service/src/domain/integration-vndirect/intergration-vndirect.module';
import { PostModule } from 'apps/api-service/src/domain/post/post.module';

@Module({
  imports: [PostModule, DatabaseModule, IntegrationVndirectModule],
})
export class AppModule {}
