import { PartialType } from '@nestjs/mapped-types';
import { UpdateAccountDto } from './update-account';

export class ChangePasswordDto extends PartialType(UpdateAccountDto) {}
