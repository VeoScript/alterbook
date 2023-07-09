import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../config/Axios';

export const useLikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((_args: { postId: string }) =>
    api.post(`/api/reaction/like/${_args.postId}`),
    {
      onError: (error: any) => {
        console.error('ERROR LIKE', error.response.data);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['userPosts']);
      },
    },
  );
};

export const useUnlikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((_args: { postId: string }) =>
    api.delete(`/api/reaction/unlike/${_args.postId}`),
    {
      onError: (error: any) => {
        console.error('ERROR UNLIKE', error.response.data);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['userPosts']);
      },
    },
  );
};
