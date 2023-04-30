import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '../../../config/RootNavigation';
import { Toast } from '../../../utils/Toast';
import api from '../../../config/Axios';

export const useUpdateProfileImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((_args: { image: string }) =>
    api.patch('/api/account/update-profile-image', {
      image: _args.image,
    }),
    {
      onError: (error: any) => {
        console.error('ERROR UPDATE PROFILE IMAGE', error.response.data);
      },
      onSuccess: async () => {
        Toast('Updated successfully');
        queryClient.invalidateQueries(['user']);
        useNavigate('ProfileScreen');
      },
    },
  );
};

export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((_args: { shortbio: string, username: string }) =>
    api.patch('/api/account/update-account', {
      username: _args.username,
      shortbio: _args.shortbio,
    }),
    {
      onError: (error: any) => {
        console.error('ERROR UPDATE ACCOUNT', error.response.data);
      },
      onSuccess: async () => {
        Toast('Updated successfully');
        queryClient.invalidateQueries(['user']);
      },
    },
  );
};

export const useChangePasswordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((_args: { old_password: string, new_password: string }) =>
    api.patch('/api/account/change-password', {
      old_password: _args.old_password,
      new_password: _args.new_password,
    }),
    {
      onError: (error: any) => {
        console.error('ERROR CHANGE PASSWORD', error.response.data);
      },
      onSuccess: async () => {
        Toast('Updated successfully');
        queryClient.invalidateQueries(['user']);
      },
    },
  );
};
