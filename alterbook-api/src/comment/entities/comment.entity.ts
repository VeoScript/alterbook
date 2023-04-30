import { Comment as CommentModel } from '@prisma/client';

export class CommentEntity implements CommentModel {
  id: string;
  message: string;
  created_at: Date;
  updated_at: Date;
  postId: string;
  userId: string;
}
