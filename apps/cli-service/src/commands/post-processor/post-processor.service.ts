import { Injectable, Logger } from '@nestjs/common';
import { DStockClientService } from '../../../../../libs/dstock/src';
import { PostService } from '../../models/post/post.service';

@Injectable()
export class PostProcessorService {
  private logger = new Logger(PostProcessorService.name);
  constructor(
    private readonly DStockClientService: DStockClientService,
    private readonly postService: PostService,
  ) {}

  async processPosts() {
    const stocks = await this.DStockClientService.getStocks();
    this.logger.log(
      `Fetched ${stocks.length} stocks from DStockClientService.`,
    );

    const processedPosts = stocks.map((stock) => ({
      title: stock.newsTitle ?? 'No Title',
      content: stock.newsContent,
    }));

    try {
      this.logger.log(`Creating ${processedPosts.length} posts...`);
      await this.postService.createMany(processedPosts);
      this.logger.log('All posts created successfully.');
    } catch (error) {
      this.logger.error('Error while creating posts:', error);
      throw error;
    }
  }
}
