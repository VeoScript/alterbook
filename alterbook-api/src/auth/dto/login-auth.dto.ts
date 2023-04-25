import { PartialType } from '@nestjs/mapped-types';
import { RegisterAuthDto } from './register-auth.dto';

export class LoginAuthDto extends PartialType(RegisterAuthDto) {}
