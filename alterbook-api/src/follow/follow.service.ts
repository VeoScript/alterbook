import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { FollowDto } from './dto/follow.dto';
import { UnfollowDto } from './dto/unfollow.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FollowService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  
  async follow(followDto: FollowDto, request: Request) {
    try {

      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      return await this.prismaService.follow.create({
        data: followDto,
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async unfollow(unfollowDto: UnfollowDto, request: Request) {
    try {

      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      return await this.prismaService.follow.deleteMany({
        where: unfollowDto,
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
