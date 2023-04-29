import { create } from 'zustand';
import * as type from './interface';

export const loginStore = create<type.LoginInterface>(set => ({
  username: '',
  password: '',
  setUsername: (value: string) => set(() => ({ username: value })),
  setPassword: (value: string) => set(() => ({ password: value })),
  setDefault: () => set(() => ({
    username: '',
    password: '',
  })),
}));

export const registerStore = create<type.RegisterInterface>(set => ({
  username: '',
  email: '',
  password: '',
  repassword: '',
  setUsername: (value: string) => set(() => ({ username: value })),
  setEmail: (value: string) => set(() => ({ email: value })),
  setPassword: (value: string) => set(() => ({ password: value })),
  setRepassword: (value: string) => set(() => ({ repassword: value })),
  setDefault: () => set(() => ({
    username: '',
    email: '',
    password: '',
    repassword: '',
  })),
}));

export const newPostStore = create<type.NewPostInterface>(set => ({
  isVisible: false,
  image: null,
  story: '',
  setIsVisible: (value: boolean) => set(() => ({ isVisible: value })),
  setImage: (value: any) => set(() => ({ image: value })),
  setStory: (value: string) => set(() => ({ story: value })),
  setDefault: () => set(() => ({
    isVisible: false,
    image: null,
    story: '',
  })),
}));
