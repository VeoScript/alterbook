export interface LoginInterface extends Omit<RegisterInterface, 'email' | 'repassword' | 'setEmail' | 'setRepassword'> {}

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

export interface SettingsInterface {
  image: any;
  shortbio: string;
  username: string;
  email: string;
  old_password: string;
  new_password: string;
  re_password: string;
  setImage: (value: any) => void;
  setShortBio: (value: string) => void;
  setUsername: (value: string) => void;
  setEmail: (value: string) => void;
  setOldPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  setRePassword: (value: string) => void;
  setDefault: () => void;
}

export interface NewPostInterface {
  isVisible: boolean;
  image: any;
  story: string;
  setIsVisible: (value: boolean) => void;
  setImage: (value: any) => void;
  setStory: (value: string) => void;
  setDefault: () => void;
}
