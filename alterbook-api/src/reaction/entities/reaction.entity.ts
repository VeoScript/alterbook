import { Like as LikeModel } from '@prisma/client';

export class ReactionEntity implements LikeModel {
  id: string;
  created_at: Date;
  updated_at: Date;
  postId: string;
  userId: string;
}
