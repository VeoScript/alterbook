import { Post as PostModel } from '@prisma/client';

export class PostEntity implements PostModel {
  id: string;
  image: string;
  story: string;
  userId: string;
  created_at: Date;
  updated_at: Date;
}
