import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../config/Axios';

export const useFollowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((_args: { followerId: string, followingId: string }) =>
    api.post('/api/follow', _args),
    {
      onError: (error: any) => {
        console.error('ERROR FOLLOW', error.response.data);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['user']);
        queryClient.invalidateQueries(['userById']);
      },
    },
  );
};

export const useUnfollowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((_args: { followerId: string, followingId: string }) =>
    api.patch('/api/follow', _args),
    {
      onError: (error: any) => {
        console.error('ERROR UNFOLLOW', error.response.data);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['user']);
        queryClient.invalidateQueries(['userById']);
      },
    },
  );
};
