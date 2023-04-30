import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../../../config/Axios';

export const useGetComments = (postId: string) => {
  return useInfiniteQuery(['comments', postId],
    async ({ pageParam = ''}) => {
      const comments = await api.get(`/api/comment/${postId}?cursor=${pageParam}`);
      return comments.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      onError: (error: any) => {
        console.error('ERROR COMMENTS', error.response.data);
      },
    },
  );
};
