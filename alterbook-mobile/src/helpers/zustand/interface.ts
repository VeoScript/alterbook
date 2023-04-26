export interface NewPostInterface {
  isVisible: boolean;
  image: string;
  story: string;
  setIsVisible: (value: boolean) => void;
  setImage: (value: string) => void;
  setStory: (value: string) => void;
  setDefault: () => void;
}

export interface RegisterInterface {
  username: string;
  email: string;
  password: string;
  repassword: string;
  setUsername: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRepassword: (value: string) => void;
  setDefault: () => void;
}

export interface LoginInterface extends Omit<RegisterInterface, 'email' | 'repassword' | 'setEmail' | 'setRepassword'> {}
