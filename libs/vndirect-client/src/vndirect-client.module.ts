import { Module } from '@nestjs/common';
import { VndirectClientService } from './vndirect-client.service';
import { HttpModule } from '@nestjs/axios';

// singleton desgin pattern
// for root => là sing
// register thì ko, mỗi lần tọa ra cấu hình khác
@Module({
  imports: [
    HttpModule.register({
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ],
  providers: [VndirectClientService],
  exports: [VndirectClientService],
})
export class VndirectClientModule {}
