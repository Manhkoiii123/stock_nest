import { Injectable, Logger } from '@nestjs/common';
import { PostService } from '../../models/post/post.service';
import { VndirectClientService } from '../../../../../libs/vndirect-client/src';

@Injectable()
export class NewProcessorService {
  private logger = new Logger(NewProcessorService.name);
  constructor(
    private readonly vndirectClientService: VndirectClientService,
    private readonly postService: PostService,
  ) {}

  async processNews() {
    const news = await this.vndirectClientService.getNews();
    this.logger.log(`Fetched ${news.length} news from DStockClientService.`);

    const processedPosts = news.map((n) => ({
      title: n.newsTitle ?? 'No Title',
      content: n.newsContent,
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
