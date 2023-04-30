import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Toast } from '../../../utils/Toast';
import api from '../../../config/Axios';

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((_args: { message: string, postId: string }) =>
    api.post('/api/comment', {
      message: _args.message,
      postId: _args.postId,
    }),
    {
      onError: (error: any) => {
        console.error('ERROR CREATE COMMENT', error.response.data);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['comments']);
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['userPosts']);
        Toast('Commented successfully');
      },
    },
  );
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((_args: { commentId: string }) =>
    api.delete(`/api/comment/${_args.commentId}`),
    {
      onError: (error: any) => {
        console.error('ERROR DELETE COMMENT', error.response.data);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['comments']);
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(['userPosts']);
        Toast('Deleted successfully');
      },
    },
  );
};
