import { create } from 'zustand';
import * as type from './interface';

export const newPostStore = create<type.NewPostInterface>(set => ({
  isVisible: false,
  image: '',
  story: '',
  setIsVisible: (value: boolean) => set(() => ({ isVisible: value })),
  setImage: (value: string) => set(() => ({ image: value })),
  setStory: (value: string) => set(() => ({ story: value })),
  setDefault: () => set(() => ({
    isVisible: false,
    image: '',
    story: '',
  })),
}));
