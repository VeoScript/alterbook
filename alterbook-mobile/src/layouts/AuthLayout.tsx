import React from 'react';
import tw from '../styles/tailwind';
import { SafeAreaView, ScrollView, View, Text, Image } from 'react-native';

interface IProps {
  children: React.ReactNode;
}

type AuthLayoutProps = (props: IProps) => JSX.Element;

const AuthLayout: AuthLayoutProps = ({ children }) => {
  return (
    <SafeAreaView style={tw`relative flex-1 bg-accent-1`}>
      <ScrollView style={tw`w-full h-full`} keyboardShouldPersistTaps="handled">
        <View style={tw`flex-1 flex-col items-center justify-center w-full px-5 py-10`}>
          <View style={tw`flex-col items-center w-full my-10`}>
            <Image
              style={tw`w-[5rem] h-[5rem]`}
              resizeMode="cover"
              source={require('../assets/images/alterbook-logo.png')}
            />
            <Text style={tw`text-black text-2xl text-accent-4`}>alterbook</Text>
            <Text style={tw`text-light text-xs text-accent-4`}>just put out everything you want to say here...</Text>
          </View>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthLayout;
