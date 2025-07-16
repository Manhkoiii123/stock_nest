import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/api-service/src/database/database.service';
import { CreatePostDto } from 'apps/api-service/src/domain/post/dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findPosts() {
    return this.databaseService.post.findMany({
      include: {
        stock: true,
      },
    });
  }
  async createPost(data: CreatePostDto) {
    return this.databaseService.post.create({
      data,
    });
  }

  async findPostById(id: string) {
    const post = await this.databaseService.post.findUnique({
      where: { id },
      include: {
        stock: true,
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  async publishPost(postId: string) {
    await this.findPostById(postId);

    const updatedPost = await this.databaseService.post.update({
      where: { id: postId },
      data: {
        isPublished: true,
        publishedAt: new Date(),
      },
    });

    return updatedPost;
  }
}
