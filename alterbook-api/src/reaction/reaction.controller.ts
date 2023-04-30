import { Controller, Post, Body, Delete, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { ReactionService } from './reaction.service';
import { LikeDto } from './dto/like.dto';

@Controller('api/reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @Post('like/:id')
  like(
    @Param('id') id: string,
    @Body() likeDto: LikeDto,
    @Req() request: Request,
  ) {
    return this.reactionService.like(id, likeDto, request);
  }

  @Delete('unlike/:id')
  unlike(
    @Param('id') id: string,
    @Body() likeDto: LikeDto,
    @Req() request: Request,
  ) {
    return this.reactionService.unlike(id, likeDto, request);
  }
}
