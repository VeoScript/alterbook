import {
  Injectable,
  UnauthorizedException,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { Request } from 'express';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(createPostDto: CreatePostDto, request: Request) {
    try {
      const { image, story } = createPostDto;

      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      if (story === '') {
        throw new HttpException('Story is required', HttpStatus.BAD_REQUEST);
      }

      return await this.prismaService.post.create({
        data: {
          image,
          story,
          userId: cookieData.id,
        },
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(request: Request) {
    try {
      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      const limit = 10
      const cursor = request.query.cursor ?? ''
      const cursorObj = cursor === '' ? undefined : { id: String(cursor) }

      const posts = await this.prismaService.post.findMany({
        select: {
          id: true,
          image: true,
          story: true,
          created_at: true,
          user: {
            select: {
              id: true,
              image: true,
              username: true,
            },
          },
          likes: {
            select: {
              id: true,
              postId: true,
              userId: true,
            }
          },
          _count: {
            select: {
              likes: true,
              comments: true,
            }
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
        posts,
        nextId:  posts.length === limit ? posts[limit - 1].id : undefined,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async findAllByUser(id: string, request: Request) {
    try {
      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      const limit = 10
      const cursor = request.query.cursor ?? ''
      const cursorObj = cursor === '' ? undefined : { id: String(cursor) }

      const posts = await this.prismaService.post.findMany({
        where: {
          userId: id
        },
        select: {
          id: true,
          image: true,
          story: true,
          created_at: true,
          user: {
            select: {
              id: true,
              image: true,
              username: true,
            },
          },
          likes: {
            select: {
              id: true,
              postId: true,
              userId: true,
            }
          },
          _count: {
            select: {
              likes: true,
              comments: true,
            }
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
        posts,
        nextId:  posts.length === limit ? posts[limit - 1].id : undefined,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async findOne(id: string, request: Request) {
    try {
      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      const post = await this.prismaService.post.findFirst({
        where: {
          id: id,
        },
        select: {
          id: true,
          image: true,
          story: true,
          user: {
            select: {
              id: true,
              image: true,
              username: true,
            },
          },
          likes: {
            select: {
              id: true,
              postId: true,
              userId: true,
            }
          },
          _count: {
            select: {
              likes: true,
              comments: true,
            }
          },
        },
      });

      return post;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto, request: Request) {
    try {
      const { image, story } = updatePostDto;

      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      return await this.prismaService.post.update({
        where: {
          id: id,
        },
        data: {
          image,
          story,
        },
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string, request: Request) {
    try {
      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      return await this.prismaService.post.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
