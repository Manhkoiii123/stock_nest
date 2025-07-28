import { GetNews200ResponseDataInner } from '../../../../../../libs/vndirect-client/src/client/generated';

export class CreatePostDto {
  vndirectId: string;
  title: string;
  content: string;
  isPublished: boolean;
  publishedAt: Date;
  stockId: string;
  constructor(news: GetNews200ResponseDataInner, stockId: string) {
    if (!news.newsId) {
      throw new Error('newsId is required to create a post');
    }
    this.vndirectId = news.newsId;
    this.title = news.newsTitle ?? '';
    this.content = news.newsContent ?? '';
    this.isPublished = true;
    this.publishedAt = new Date(`${news.newsDate} ${news.newsTime}`);
    this.stockId = stockId;
  }
}
