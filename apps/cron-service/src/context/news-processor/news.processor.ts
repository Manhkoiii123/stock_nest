import { Injectable, Logger } from '@nestjs/common';
import { VndirectClientService } from '../../../../../libs/vndirect-client/src';
import { PostService } from '../../models/post/post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { StockService } from '../../models/stock/stock.service';

@Injectable()
export class NewsProcessor {
  private readonly logger = new Logger(NewsProcessor.name);
  constructor(
    private readonly vndirectClientService: VndirectClientService,
    private readonly postService: PostService,
    private readonly stockService: StockService,
  ) {}
  async process() {
    this.logger.log('Processing news...');

    // vndirect
    const vnDirectNews = await this.vndirectClientService.getNews();
    this.logger.log(`Fetched ${vnDirectNews.length} news items from VNDIRECT`);
    // query db
    const vndirectNewsIds = vnDirectNews
      .map((news) => news.newsId)
      .filter(Boolean) as string[];
    const dbPosts =
      await this.postService.findPostsByVnDirectId(vndirectNewsIds);

    const vndirectNewsNotInDb = vnDirectNews.filter(
      (news) => !dbPosts.some((post) => post.vndirectId === news.newsId),
    );

    this.logger.log(
      `Found ${vndirectNewsNotInDb.length} news items not in the database
      `,
    );

    // query stocks
    for (const news of vndirectNewsNotInDb) {
      // find stock
      // tagCodes = "HSG,HRC,HSG, HRC"=> lấy pt đầu  = symbol
      const symbol = news.tagCodes?.split(',')[0]?.trim();
      if (!symbol) {
        this.logger.warn(
          `No symbol found for news ID ${news.newsId}, skipping...`,
        );
        continue;
      }
      const stock = await this.stockService.findStockBySymbol(symbol);
      if (!stock) {
        this.logger.warn(
          `No stock found for symbol ${symbol} in news ID ${news.newsId}, skipping...`,
        );
        continue;
      }
      // tạo postDto
      const createPostDto = new CreatePostDto(news, stock.id);
      // create post
      const newPost = await this.postService.createPost(createPostDto);
      this.logger.log(
        `Created post with ID ${newPost.id} for news ID ${news.newsId}`,
      );
    }

    // vndirect vs db
    // persist to db
  }
}
