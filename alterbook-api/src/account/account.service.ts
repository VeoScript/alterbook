import {
  Injectable,
  UnauthorizedException,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { Request } from 'express';
import { UpdateAccountDto } from './dto/update-account';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class AccountService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async updateProfileImage(request: Request, updateAccountDto: UpdateAccountDto) {
    try {
      const { image } = updateAccountDto;

      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      return await this.prismaService.user.update({
        where: {
          id: cookieData.id,
        },
        data: {
          image
        },
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async updateAccount(request: Request, updateAccountDto: UpdateAccountDto) {
    try {
      const { username, shortbio } = updateAccountDto;

      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      return await this.prismaService.user.update({
        where: {
          id: cookieData.id,
        },
        data: {
          username,
          shortbio,
        },
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async changePassword(request: Request, changePasswordDto: ChangePasswordDto) {
    try {
      const { old_password, new_password } = changePasswordDto;

      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      const user = await this.prismaService.user.findUnique({
        where: {
          id: cookieData.id
        },
        select: {
          password: true
        }
      })

      const matchedPassword = await bcrypt.compare(old_password, user.password);

      if (!matchedPassword) {
        throw new HttpException('Old password did not match', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await bcrypt.hash(new_password, roundsOfHashing);

      return await this.prismaService.user.update({
        where: {
          id: cookieData.id,
        },
        data: {
          password: hashedPassword,
        },
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
