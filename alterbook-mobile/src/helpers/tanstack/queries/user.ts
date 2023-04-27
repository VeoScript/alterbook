import { useQuery } from '@tanstack/react-query';
import api from '../../../config/Axios';

export const useGetUser = () => {
  return useQuery(['user'],
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
