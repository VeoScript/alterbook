import { useQuery } from '@tanstack/react-query';
import api from '../../../config/Axios';

export const userGetPosts = () => {
  return useQuery(['posts'],
    async () => {
      const posts = await api.get('/api/post');
      return posts.data;
    },
    {
      onError: (error: any) => {
        console.error('ERROR POSTS', error.response.data);
      },
    },
  );
};
