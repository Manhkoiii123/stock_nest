import { Controller, Post } from '@nestjs/common';
import { IntegrationVndirectService } from './intergration-vndirect.service';

@Controller('integration-vndirect')
export class IntegrationVndirectController {
  constructor(
    private readonly integrationVndirectService: IntegrationVndirectService,
  ) {}

  // Cron job 8 AM weekdays
  @Post('process-stocks')
  async processStocks() {
    await this.integrationVndirectService.processStocks();
  }
}
