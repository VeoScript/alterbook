import {
  Injectable,
  UnauthorizedException,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CommentService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(createCommentDto: CreateCommentDto, request: Request) {
    try {
      const { message, postId } = createCommentDto;

      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      if (message === '') {
        throw new HttpException('Comment is required', HttpStatus.BAD_REQUEST);
      }

      return await this.prismaService.comment.create({
        data: {
          message,
          postId,
          userId: cookieData.id,
        },
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(id: string, request: Request) {
    try {
      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      const limit = 10
      const cursor = request.query.cursor ?? ''
      const cursorObj = cursor === '' ? undefined : { id: String(cursor) }

      const comments = await this.prismaService.comment.findMany({
        where: {
          postId: id,
        },
        select: {
          id: true,
          message: true,
          created_at: true,
          user: {
            select: {
              id: true,
              image: true,
              username: true,
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
        comments,
        nextId:  comments.length === limit ? comments[limit - 1].id : undefined,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async remove(id: string, request: Request) {
    try {
      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      return await this.prismaService.comment.delete({
        where: {
          id
        }
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
