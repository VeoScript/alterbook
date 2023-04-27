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
