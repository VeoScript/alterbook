import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../../../config/Axios';

export const useGetPosts = () => {
  return useInfiniteQuery(['posts'],
    async ({ pageParam = ''}) => {
      const posts = await api.get(`/api/post?cursor=${pageParam}`);
      return posts.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      onError: (error: any) => {
        console.error('ERROR POSTS', error.response.data);
      },
    },
  );
};

export const useGetPostsByUser = (id: string) => {
  return useInfiniteQuery(['userPosts', id],
    async ({ pageParam = ''}) => {
      const userPosts = await api.get(`/api/post/user/${id}?cursor=${pageParam}`);
      return userPosts.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      onError: (error: any) => {
        console.error('ERROR USER POSTS', error.response.data);
      },
    },
  );
};
