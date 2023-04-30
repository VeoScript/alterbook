import { OmitType } from '@nestjs/mapped-types';
import { ReactionEntity } from '../entities/reaction.entity';

export class LikeDto extends OmitType(ReactionEntity, ['id', 'userId', 'postId', 'created_at', 'updated_at']) {}
