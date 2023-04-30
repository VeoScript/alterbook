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

export const useGetUserById = (id: string) => {
  return useQuery<UserInterface, any>(['userById', id],
    async () => {
      const userById = await api.get(`/api/auth/user/${id}`);
      return userById.data;
    },
    {
      onError: (error: any) => {
        console.error('ERROR USER BY ID', error.response.data);
      },
    },
  );
};
