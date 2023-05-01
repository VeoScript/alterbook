import {
  Injectable,
  UnauthorizedException,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    try {
      const { username, email, password } = registerAuthDto;

      if (username === '' || email === '' || password === '') {
        throw new HttpException('All fields are required', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await bcrypt.hash(password, roundsOfHashing);

      registerAuthDto.password = hashedPassword;

      return await this.prismaService.user.create({
        data: registerAuthDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002 - is prisma error code for unique constraint violation...
        if (e.code === 'P2002') {
          throw new HttpException('This account is not available.', HttpStatus.BAD_REQUEST);
        }
      }
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginAuthDto: LoginAuthDto, response: Response) {
    try {
      const { username, password } = loginAuthDto;

      if (username === '' || password === '') {
        throw new HttpException('Username and password is required', HttpStatus.BAD_REQUEST);
      }

      const user = await this.prismaService.user.findUnique({
        where: {
          username: username,
        },
        select: {
          id: true,
          username: true,
          email: true,
          password: true,
        },
      });

      if (!user) {
        throw new HttpException('Account not found', HttpStatus.BAD_REQUEST);
      }

      const isPasswordValue = await bcrypt.compare(password, user.password);

      if (!isPasswordValue) {
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
      }

      const jwt = await this.jwtService.signAsync({ id: user.id });

      response.cookie(process.env.JWT_NAME, jwt, { httpOnly: true });

      return {
        message: 'Success',
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async logout(response: Response) {
    try {
      response.clearCookie(process.env.JWT_NAME);

      return {
        message: 'Log out successfully',
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async user(request: Request) {
    try {
      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      const userData = await this.prismaService.user.findFirst({
        where: {
          id: cookieData.id,
        },
        select: {
          id: true,
          image: true,
          username: true,
          email: true,
          shortbio: true,
          followers: true,
          following: true,
          _count: {
            select: {
              followers: true,
              following: true,
            }
          }
        },
      });

      return userData;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async userById(id: string, request: Request) {
    try {
      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      const userByIdData = await this.prismaService.user.findFirst({
        where: {
          id
        },
        select: {
          id: true,
          image: true,
          username: true,
          email: true,
          shortbio: true,
          followers: true,
          following: true,
          _count: {
            select: {
              followers: true,
              following: true,
            }
          }
        },
      });

      return userByIdData;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
