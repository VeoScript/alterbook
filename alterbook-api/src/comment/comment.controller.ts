import { Controller, Get, Post, Delete, Body, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() request: Request) {
    return this.commentService.create(createCommentDto, request);
  }

  @Get(':id')
  findAll(@Param('id') id: string, @Req() request: Request) {
    return this.commentService.findAll(id, request);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.commentService.remove(id, request);
  }
}
