import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePostDto } from 'apps/api-service/src/domain/post/dto/create-post.dto';
import { PostService } from 'apps/api-service/src/domain/post/post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  findAll() {
    return this.postService.findPosts();
  }

  @Post()
  createPost(@Body() data: CreatePostDto) {
    return this.postService.createPost(data);
  }

  @Patch(':postId/publish')
  publishPost(@Param('postId') postId: string) {
    return this.postService.publishPost(postId);
  }
}
