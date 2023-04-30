import { OmitType } from '@nestjs/mapped-types';
import { CommentEntity } from '../entities/comment.entity';

export class CreateCommentDto extends OmitType(CommentEntity, ['id', 'created_at', 'updated_at', 'userId']) {}
