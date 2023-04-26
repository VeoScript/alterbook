import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import tw from '../../styles/tailwind';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigate } from '../../config/RootNavigation';
import { registerStore } from '../../helpers/zustand/store';

const RegisterScreen = () => {

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

  const handleLogin = async () => {
    console.log('payload', {
      username,
      email,
      password,
    });

    setDefault();
  };

  return (
    <AuthLayout>
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
          <Text style={tw`text-light text-sm`}>$ email</Text>
          <TextInput
            style={tw`w-full p-1 border-line-bottom text-regular text-accent-4`}
            keyboardType="email-address"
            value={email}
            onChangeText={(value: string) => setEmail(value)}
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
        <View style={tw`flex-col items-start w-full my-2`}>
          <Text style={tw`text-light text-sm`}>$ re_enter_password</Text>
          <TextInput
            style={tw`w-full p-1 border-line-bottom text-regular text-accent-4`}
            secureTextEntry={true}
            value={repassword}
            onChangeText={(value: string) => setRepassword(value)}
          />
        </View>
        <View style={tw`flex-col items-end w-full my-2`}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`flex-row items-center justify-end w-full max-w-[10rem] my-1 px-3 py-1 rounded-md bg-accent-2`}
            onPress={handleLogin}>
            <Text style={tw`text-regular text-sm`}>_submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`flex-row items-center justify-end w-full max-w-[10rem] my-1 px-3 py-1 rounded-md bg-accent-2`}
            onPress={() => useNavigate('LoginScreen')}>
            <Text style={tw`text-regular text-sm text-accent-4`}>_login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

export default RegisterScreen;
