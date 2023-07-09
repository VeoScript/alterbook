import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '../../../config/RootNavigation';
import { Toast } from '../../../utils/Toast';
import api from '../../../config/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useRegisterMutation = () => {
  return useMutation((_args: { username: string, email: string, password: string }) =>
    api.post('/api/auth/register', {
      username: _args.username,
      email: _args.email,
      password: _args.password,
    }),
    {
      onError: (error: any) => {
        console.error('ERROR REGISTER', error.response.data);
      },
      onSuccess: async () => {
        Toast('Registered successfully');
        useNavigate('LoginScreen');
      },
    },
  );
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((_args: { username: string, password: string }) =>
    api.post('/api/auth/login', {
      username: _args.username,
      password: _args.password,
    }),
    {
      onError: (error: any) => {
        console.error('ERROR LOGIN', error.response.data);
      },
      onSuccess: async (data) => {
        const cookies: any = data.headers['set-cookie'];
        await AsyncStorage.setItem('COOKIES', cookies[0]);

        queryClient.resetQueries();
        useNavigate('HomeScreen');
      },
    },
  );
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(() =>
    api.post('/api/auth/logout'),
    {
      onError: (error: any) => {
        console.error('ERROR LOGOUT', error.response.data);
      },
      onSuccess: async () => {
        await AsyncStorage.setItem('COOKIES', '');
        queryClient.invalidateQueries(['user']);
        useNavigate('LoginScreen');
      },
    },
  );
};
