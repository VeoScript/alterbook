export interface NewPostInterface {
  isVisible: boolean;
  image: string;
  story: string;
  setIsVisible: (value: boolean) => void;
  setImage: (value: string) => void;
  setStory: (value: string) => void;
  setDefault: () => void;
}
