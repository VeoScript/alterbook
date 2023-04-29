import { OmitType } from '@nestjs/mapped-types';
import { PostEntity } from '../entities/post.entity';

export class CreatePostDto extends OmitType(PostEntity, ['id', 'userId']) {}
