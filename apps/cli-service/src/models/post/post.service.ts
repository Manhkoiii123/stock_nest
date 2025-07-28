/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async createMany(data: CreatePostDto[]) {
    try {
      this.logger.log(`Creating ${data.length} posts...`);
      const result = await this.databaseService.post.createMany({
        data,
        skipDuplicates: true,
      });
      return result;
    } catch (error) {
      this.logger.error('Failed to create posts:', error);
      throw new Error(`Failed to create posts: ${error.message}`);
    }
  }
}
