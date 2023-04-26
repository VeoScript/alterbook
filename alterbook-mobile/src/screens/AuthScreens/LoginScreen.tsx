import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import tw from '../../styles/tailwind';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigate } from '../../config/RootNavigation';

const LoginScreen = () => {
  return (
    <AuthLayout>
      <View style={tw`flex-col items-center w-full my-10`}>
        <View style={tw`flex-col items-start w-full my-2`}>
          <Text style={tw`text-light text-sm`}>$ username</Text>
          <TextInput
            style={tw`w-full p-1 border-b border-accent-2 text-accent-4`}
            value=""
            onChangeText={(value: string) => console.log(value)}
          />
        </View>
        <View style={tw`flex-col items-start w-full my-2`}>
          <Text style={tw`text-light text-sm`}>$ password</Text>
          <TextInput
            style={tw`w-full p-1 border-b border-accent-2 text-accent-4`}
            secureTextEntry={true}
            value=""
            onChangeText={(value: string) => console.log(value)}
          />
        </View>
        <View style={tw`flex-col items-end w-full my-2`}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`flex-row items-center justify-end w-full max-w-[10rem] my-1 px-3 py-1 rounded-md bg-accent-2`}
            onPress={() => useNavigate('HomeScreen')}>
            <Text style={tw`text-regular text-sm`}>_login</Text>
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
