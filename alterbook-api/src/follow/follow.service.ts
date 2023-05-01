import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
  
  async followers(request: Request) {
    try {

      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      const limit = 10
      const cursor = request.query.cursor ?? ''
      const cursorObj = cursor === '' ? undefined : { id: String(cursor) }

      const followers = await this.prismaService.user.findFirst({
        where: {
          id: cookieData.id,
        },
        select: {
          id: true,
          created_at: true,
          followers: {
            select: {
              id: true,
              following: {
                select: {
                  id: true,
                  image: true,
                  username: true,
                  _count: {
                    select: {
                      followers: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          created_at: 'desc'
        },
        take: limit,
        cursor: cursorObj,
        skip: cursor === '' ? 0 : 1
      });

      return {
        followers,
        nextId:  followers?.followers.length === limit ? followers.followers[limit - 1].id : undefined,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  
  async following(request: Request) {
    try {

      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      const limit = 10
      const cursor = request.query.cursor ?? ''
      const cursorObj = cursor === '' ? undefined : { id: String(cursor) }

      const following = await this.prismaService.user.findFirst({
        where: {
          id: cookieData.id,
        },
        select: {
          id: true,
          created_at: true,
          following: {
            select: {
              id: true,
              follower: {
                select: {
                  id: true,
                  image: true,
                  username: true,
                  _count: {
                    select: {
                      followers: true,
                    },
                  },
                }
              },
            },
          },
        },
        orderBy: {
          created_at: 'desc'
        },
        take: limit,
        cursor: cursorObj,
        skip: cursor === '' ? 0 : 1
      });

      return {
        following,
        nextId:  following?.following.length === limit ? following.following[limit - 1].id : undefined,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  
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
      throw new UnauthorizedException();
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
      throw new UnauthorizedException();
    }
  }
}
