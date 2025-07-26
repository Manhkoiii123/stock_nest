import { Module } from '@nestjs/common';
import { BasicCommand } from './basic.command';
import { StockProcessorModule } from './commands/stock-processor/stock-processor.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, StockProcessorModule],
  providers: [BasicCommand],
})
export class AppModule {}
