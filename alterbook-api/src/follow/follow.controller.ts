import { Controller, Get, Post, Patch, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { FollowService } from './follow.service';
import { FollowDto } from './dto/follow.dto';
import { UnfollowDto } from './dto/unfollow.dto';

@Controller('api/follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get('followers')
  followers(@Req() request: Request) {
    return this.followService.followers(request);
  }

  @Get('following')
  following(@Req() request: Request) {
    return this.followService.following(request);
  }

  @Post()
  follow(@Body() followDto: FollowDto, @Req() request: Request) {
    return this.followService.follow(followDto, request);
  }

  @Patch()
  unfollow(@Body() unfollowDto: UnfollowDto, @Req() request: Request) {
    return this.followService.unfollow(unfollowDto, request);
  }
}
