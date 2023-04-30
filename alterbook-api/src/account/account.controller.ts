import { Controller, Body, Req, Patch } from '@nestjs/common';
import { Request } from 'express';
import { AccountService } from './account.service';
import { UpdateAccountDto } from './dto/update-account';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('api/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Patch('update-profile-image')
  updateProfileImage(@Req() request: Request, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.updateProfileImage(request, updateAccountDto);
  }

  @Patch('update-account')
  updateAccount(@Req() request: Request, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.updateAccount(request, updateAccountDto);
  }

  @Patch('change-password')
  changePassword(@Req() request: Request, @Body() changePasswordDto: ChangePasswordDto) {
    return this.accountService.changePassword(request, changePasswordDto);
  }
}
