import { User as UserModel } from '@prisma/client';

export class AuthEntity implements UserModel {
  id: string;
  image: string;
  username: string;
  email: string;
  password: string;
  shortbio: string;
  created_at: Date;
  updated_at: Date;
}
