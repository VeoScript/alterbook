import { Follow as FollowModel } from '@prisma/client';

export class FollowEntity implements FollowModel {
  id: string;
  created_at: Date;
  updated_at: Date;
  followerId: string;
  followingId: string;
}
