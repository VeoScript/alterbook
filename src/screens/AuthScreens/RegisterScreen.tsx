import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import tw from '../../styles/tailwind';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useGoBack, useNavigate } from '../../config/RootNavigation';
import { useBackHandler } from '../../helpers/hooks/useBackHandler';

import { registerStore } from '../../helpers/zustand/store';
import { useRegisterMutation } from '../../helpers/tanstack/mutations/auth';

const RegisterScreen = () => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const {
    username,
    email,
    password,
    repassword,
    setUsername,
    setEmail,
    setPassword,
    setRepassword,
    setDefault,
  } = registerStore();

  const registerMutation = useRegisterMutation();

  const handleLogin = async () => {
    setIsLoading(true);

    if (repassword !== password) {
      setIsLoading(false);
      setError('Password not matched');
      return;
    }

    await registerMutation.mutateAsync({
      username,
      email,
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
    useGoBack();
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
            onChangeText={(value: string) => {
              setError('');
              setUsername(value);
            }}
          />
        </View>
        <View style={tw`flex-col items-start w-full my-2`}>
          <Text style={tw`text-light text-sm`}>$ email</Text>
          <TextInput
            style={tw`w-full p-1 border-line-bottom text-regular text-accent-4`}
            keyboardType="email-address"
            value={email}
            onChangeText={(value: string) => {
              setError('');
              setEmail(value);
            }}
          />
        </View>
        <View style={tw`flex-col items-start w-full my-2`}>
          <Text style={tw`text-light text-sm`}>$ password</Text>
          <TextInput
            style={tw`w-full p-1 border-line-bottom text-regular text-accent-4`}
            secureTextEntry={true}
            value={password}
            onChangeText={(value: string) => {
              setError('');
              setPassword(value);
            }}
          />
        </View>
        <View style={tw`flex-col items-start w-full my-2`}>
          <Text style={tw`text-light text-sm`}>$ re_enter_password</Text>
          <TextInput
            style={tw`w-full p-1 border-line-bottom text-regular text-accent-4`}
            secureTextEntry={true}
            value={repassword}
            onChangeText={(value: string) => {
              setError('');
              setRepassword(value);
            }}
          />
        </View>
        <View style={tw`flex-col items-end w-full my-2`}>
          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.5}
            style={tw`flex-row items-center justify-end w-full max-w-[10rem] my-1 px-3 py-1 rounded-md bg-accent-2 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            onPress={handleLogin}>
            <Text style={tw`text-regular text-sm`}>{isLoading ? '_submiting...' : '_submit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`flex-row items-center justify-end w-full max-w-[10rem] my-1 px-3 py-1 rounded-md bg-accent-2`}
            onPress={() => {
              setDefault();
              useNavigate('LoginScreen');
            }}>
            <Text style={tw`text-regular text-sm text-accent-4`}>_login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

export default RegisterScreen;
