import { OmitType } from '@nestjs/mapped-types';
import { AuthEntity } from '../entities/auth.entity';

export class RegisterAuthDto extends OmitType(AuthEntity, ['id', 'created_at', 'updated_at']) {}
