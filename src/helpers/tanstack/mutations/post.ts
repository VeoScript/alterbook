import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Toast } from '../../../utils/Toast';
import api from '../../../config/Axios';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((_args: { image: string | null, story: string }) =>
    api.post('/api/post', {
      image: _args.image,
      story: _args.story,
    }),
    {
      onError: (error: any) => {
        console.error('ERROR CREATE POST', error.response.data);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['userPosts']);
        Toast('Created successfully');
      },
    },
  );
};

export const useDeletePostMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(() =>
    api.delete(`/api/post/${id}`),
    {
      onError: (error: any) => {
        console.error('ERROR DELETE POST', error.response.data);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['userPosts']);
        Toast('Deleted successfully');
      },
    },
  );
};
