export interface UserInterface {
  id: string;
  image: string;
  username: string;
  email: string;
  shortbio: string;
}

export interface UserPropsInterface {
  user: UserInterface;
}

export interface PostPropsInterface {
  id: string;
  image: string;
  story: string;
  user: Omit<UserInterface, 'email' | 'shortbio'>;
  userId: string;
}
