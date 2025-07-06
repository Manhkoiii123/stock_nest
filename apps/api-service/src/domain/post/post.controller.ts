import { Controller, Get } from '@nestjs/common';

@Controller('post')
export class PostController {
  @Get()
  findAll() {
    return 'This action returns all posts';
  }
}
