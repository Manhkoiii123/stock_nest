/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

export interface VndirectStock {
  code: string;
  type: string;
  floor: string;
  isin: string;
  status: string;
  companyName: string;
  companyNameEng: string;
  shortName: string;
  shortNameEng: string;
  listedDate: string;
  taxCode: string;
}

// No business
@Injectable()
export class VndirectClientService {
  private logger = new Logger(VndirectClientService.name);

  constructor(private readonly httpService: HttpService) {}

  async getStocks(): Promise<VndirectStock[]> {
    try {
      this.logger.log('Fetching stocks from Vndirect API...');
      const res = await this.httpService
        .request({
          method: 'GET',
          url: 'https://api-finfo.vndirect.com.vn/v4/stocks',
          params: {
            q: 'type:STOCK~status:LISTED',
            size: 3000,
          },
        })
        .toPromise();

      if (!res?.data?.data) {
        return [];
      }

      return res.data?.data as VndirectStock[];
    } catch (error) {
      this.logger.error('Failed to fetch stocks', error);
      throw error;
    }
  }
}
