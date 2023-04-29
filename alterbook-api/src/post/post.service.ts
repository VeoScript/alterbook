import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
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

      return await this.prismaService.post.create({
        data: {
          image,
          story,
          userId: cookieData.id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findAll(request: Request) {
    try {
      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      const posts = await this.prismaService.post.findMany();

      return posts;
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
      throw new BadRequestException(e);
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