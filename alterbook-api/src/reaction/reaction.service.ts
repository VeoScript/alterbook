import {
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { LikeDto } from './dto/like.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ReactionService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async like(id: string, likeDto: LikeDto, request: Request) {
    try {

      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      return await this.prismaService.like.create({
        data: {
          userId: cookieData.id,
          postId: id
        },
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async unlike(id: string, likeDto: LikeDto, request: Request) {
    try {

      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      return await this.prismaService.like.deleteMany({
        where: {
          userId: cookieData.id,
          postId: id
        },
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
