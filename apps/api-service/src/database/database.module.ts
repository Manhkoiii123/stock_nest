import { Global, Module } from '@nestjs/common';
import { DatabaseService } from 'apps/api-service/src/database/database.service';

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
