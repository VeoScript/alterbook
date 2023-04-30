import { Controller, Post, Get, Body, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(loginAuthDto, response);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  @Get('user')
  user(@Req() request: Request) {
    return this.authService.user(request);
  }

  @Get('user/:id')
  userById(@Param('id') id: string, @Req() request: Request) {
    return this.authService.userById(id, request);
  }
}
