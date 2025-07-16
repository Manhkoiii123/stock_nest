import { Module } from '@nestjs/common';
import { IntegrationVndirectController } from './integration-vndirect.controller';
import { IntegrationVndirectService } from './intergration-vndirect.service';
import { VndirectClientModule } from '@manh/vndirect-client';

@Module({
  imports: [VndirectClientModule],
  controllers: [IntegrationVndirectController],
  providers: [IntegrationVndirectService],
})
export class IntegrationVndirectModule {}
