import { OmitType } from '@nestjs/mapped-types';
import { AccountEntity } from '../entities/account.entity';

export class UpdateAccountDto extends OmitType(AccountEntity, ['id']) {}
