import { PartialType } from '@nestjs/mapped-types';
import { FollowDto } from './follow.dto';

export class UnfollowDto extends PartialType(FollowDto) {}
