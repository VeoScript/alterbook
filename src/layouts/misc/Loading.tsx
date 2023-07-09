import React from 'react';
import StatusBarMain from '../../components/StatusBarMain';
import tw from '../../styles/tailwind';
import { View, Text, Image } from 'react-native';

const Loading = (): JSX.Element => {
  return (
    <>
      <StatusBarMain />
      <View style={tw`flex-1 flex-col items-center justify-center w-full bg-accent-1`}>
        <View style={tw`flex-col items-center w-full mb-10`}>
          <Image
            style={tw`w-[5rem] h-[5rem]`}
            resizeMode="cover"
            source={require('../../assets/images/alterbook-logo.png')}
          />
          <Text style={tw`text-black text-2xl text-accent-4`}>alterbook</Text>
          <Text style={tw`text-light text-xs text-accent-4`}>just put out everything you want to say here...</Text>
        </View>
        <Text style={tw`text-regular text-xl text-accent-4`}>_loading...</Text>
      </View>
    </>
  );
};

export default Loading;
