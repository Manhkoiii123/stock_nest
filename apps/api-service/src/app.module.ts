import { Module } from '@nestjs/common';
import { PostModule } from 'apps/api-service/src/domain/post/post.module';
import { DatabaseModule } from '../../../libs/database/src';
import { StockModule } from './domain/stock/stock.module';

@Module({
  imports: [DatabaseModule, PostModule, StockModule],
})
export class AppModule {}
