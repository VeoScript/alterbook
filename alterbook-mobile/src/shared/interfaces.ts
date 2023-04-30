export interface UserInterface {
  id: string;
  image: string;
  username: string;
  email: string;
  shortbio: string;
  followers: any;
  following: any;
  _count: {
    followers: true;
    following: true;
  };
}

export interface UserPropsInterface {
  user: UserInterface;
}

export interface PostPropsInterface {
  id: string;
  image: string;
  story: string;
  created_at: string;
  user: Omit<UserInterface, 'email' | 'shortbio'>;
  likes: any;
  _count: {
    likes: number;
    comments: number;
  };
}

export interface CommentPropsInterface {
  id: string;
  message: string;
  created_at: string;
  user: Omit<UserInterface, 'email' | 'shortbio'>;
}
