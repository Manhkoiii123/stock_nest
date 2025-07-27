import { Module } from '@nestjs/common';
import { BasicCommand } from './basic.command';
import { StockProcessorModule } from './commands/stock-processor/stock-processor.module';
import { DatabaseModule } from './database/database.module';
import { PostProcessorModule } from './commands/post-processor/post-processor.module';

@Module({
  imports: [DatabaseModule, StockProcessorModule, PostProcessorModule],
  providers: [BasicCommand],
})
export class AppModule {}
