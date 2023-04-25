import { OmitType } from '@nestjs/mapped-types';
import { AuthEntity } from '../entities/auth.entity';

export class RegisterAuthDto extends OmitType(AuthEntity, ['id']) {}
