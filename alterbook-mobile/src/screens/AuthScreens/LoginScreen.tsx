import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import tw from '../../styles/tailwind';
import { View, Text, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigate } from '../../config/RootNavigation';
import { useBackHandler } from '../../helpers/hooks/useBackHandler';

import { loginStore } from '../../helpers/zustand/store';
import { useLoginMutation } from '../../helpers/tanstack/mutations/auth';

const LoginScreen = () => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const {
    username,
    password,
    setUsername,
    setPassword,
    setDefault,
  } = loginStore();

  const loginMutation = useLoginMutation();

  const handleRegister = async () => {
    await loginMutation.mutateAsync({
      username,
      password,
    },
    {
      onError: (e) => {
        setIsLoading(false);
        setError(e.response.data?.message);
      },
      onSuccess: () => {
        setIsLoading(false);
        setDefault();
      },
    });

    setDefault();
  };

  useBackHandler(() => {
    setDefault();
    BackHandler.exitApp();
  });

  return (
    <AuthLayout>
      {error && (
        <View style={tw`flex-col items-center w-full`}>
          <Text style={tw`text-regular text-red-500 lowercase`}>{error}</Text>
        </View>
      )}
      <View style={tw`flex-col items-center w-full my-10`}>
        <View style={tw`flex-col items-start w-full my-2`}>
          <Text style={tw`text-light text-sm`}>$ username</Text>
          <TextInput
            style={tw`w-full p-1 border-line-bottom text-regular text-accent-4`}
            value={username}
            onChangeText={(value: string) => setUsername(value)}
          />
        </View>
        <View style={tw`flex-col items-start w-full my-2`}>
          <Text style={tw`text-light text-sm`}>$ password</Text>
          <TextInput
            style={tw`w-full p-1 border-line-bottom text-regular text-accent-4`}
            secureTextEntry={true}
            value={password}
            onChangeText={(value: string) => setPassword(value)}
          />
        </View>
        <View style={tw`flex-col items-end w-full my-2`}>
          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.5}
            style={tw`flex-row items-center justify-end w-full max-w-[10rem] my-1 px-3 py-1 rounded-md bg-accent-2 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            onPress={handleRegister}>
            <Text style={tw`text-regular text-sm`}>{isLoading ? '_loading...' : '_login'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`flex-row items-center justify-end w-full max-w-[10rem] my-1 px-3 py-1 rounded-md bg-accent-2`}
            onPress={() => useNavigate('RegisterScreen')}>
            <Text style={tw`text-regular text-sm text-accent-4`}>_register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`flex-row items-center justify-end w-full max-w-[10rem] my-1 px-3 py-1 rounded-md bg-accent-2`}
            onPress={() => console.log()}>
            <Text style={tw`text-regular text-sm text-blue-300`}>_forgot_password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

export default LoginScreen;
