import { useQuery } from '@tanstack/react-query';
import api from '../../../config/Axios';

import { UserInterface } from '../../../shared/interfaces';

export const useGetUser = () => {
  return useQuery<UserInterface, any>(['user'],
    async () => {
      const user = await api.get('/api/auth/user');
      return user.data;
    },
    {
      onError: (error: any) => {
        console.error('ERROR USER', error.response.data);
      },
    },
  );
};
