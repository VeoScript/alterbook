import { Controller, Get, Post, Body, Param, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() request: Request) {
    return this.commentService.create(createCommentDto, request);
  }

  @Get()
  findAll(@Param('id') id: string, @Req() request: Request) {
    return this.commentService.findAll(id, request);
  }

  @Get(':id')
  countComments(@Param('id') id: string, @Req() request: Request) {
    return this.commentService.countComments(id, request);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.commentService.remove(id, request);
  }
}
