import { Module } from '@nestjs/common';
import { BasicCommand } from './basic.command';
import { StockProcessorModule } from './commands/stock-processor/stock-processor.module';
import { NewProcessorModule } from './commands/new-processor/new-processor.module';
import { DatabaseModule } from '../../../libs/database/src';

@Module({
  imports: [DatabaseModule, StockProcessorModule, NewProcessorModule],
  providers: [BasicCommand],
})
export class AppModule {}
