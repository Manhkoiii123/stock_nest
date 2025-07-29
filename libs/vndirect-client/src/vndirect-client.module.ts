import { Module } from '@nestjs/common';
import { VndirectClientService } from './vndirect-client.service';
import { HttpModule } from '@nestjs/axios';
import { injectApiProvider } from './utils/providers';
import { NewsApi, StockApi } from './client/generated';

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
  // stockapi là 1 tag ở cái file oas.yml
  providers: [
    VndirectClientService,
    injectApiProvider(StockApi),
    injectApiProvider(NewsApi, {
      baseUrl: 'https://finfo-api.ipas.com.vn',
    }),
  ],
  exports: [VndirectClientService],
})
export class VndirectClientModule {}
