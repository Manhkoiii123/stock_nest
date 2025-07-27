// import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { StockApi } from './client/generated';

// export interface VndirectStock {
//   code: string;
//   type: string;
//   floor: string;
//   isin: string;
//   status: string;
//   companyName: string;
//   companyNameEng: string;
//   shortName: string;
//   shortNameEng: string;
//   listedDate: string;
//   taxCode: string;
// }

// No business
@Injectable()
export class VndirectClientService {
  private logger = new Logger(VndirectClientService.name);

  // constructor(private readonly httpService: HttpService) {}
  constructor(private readonly stockApi: StockApi) {}

  // async getStocks(): Promise<VndirectStock[]> {
  //   try {
  //     this.logger.log('Fetching stocks from Vndirect API...');
  //     const res = await this.httpService
  //       .request({
  //         method: 'GET',
  //         url: 'https://api-finfo.vndirect.com.vn/v4/stocks',
  //         params: {
  //           q: 'type:STOCK~status:LISTED',
  //           size: 3000,
  //         },
  //       })
  //       .toPromise();

  //     if (!res?.data?.data) {
  //       return [];
  //     }

  //     return res.data?.data as VndirectStock[];
  //   } catch (error) {
  //     this.logger.error('Failed to fetch stocks', error);
  //     throw error;
  //   }
  // }
  async getStocks() {
    try {
      this.logger.log('Fetching stocks from Vndirect API...');
      const response = await this.stockApi.getStocks();

      const data = response?.data?.data;
      if (!data) {
        this.logger.warn('No stock data found');
        return [];
      }

      return data;
    } catch (error) {
      this.logger.error('Failed to fetch stocks', error);
      throw error;
    }
  }
}
