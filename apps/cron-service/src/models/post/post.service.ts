import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreatePostDto } from '../../context/news-processor/dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findPostsByVnDirectId(vnDirectId: string[]) {
    return this.databaseService.post.findMany({
      where: {
        vndirectId: {
          in: vnDirectId,
        },
      },
    });
  }
  async createPost(createPostDto: CreatePostDto) {
    return this.databaseService.post.create({
      data: createPostDto,
    });
  }
}
