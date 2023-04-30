import { OmitType } from '@nestjs/mapped-types';
import { FollowEntity } from '../entities/follow.entity';

export class FollowDto extends OmitType(FollowEntity, ['id', 'created_at', 'updated_at']) {}
