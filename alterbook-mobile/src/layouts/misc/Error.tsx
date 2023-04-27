import React from 'react';
import StatusBarMain from '../../components/StatusBarMain';
import tw from '../../styles/tailwind';
import { View, Text } from 'react-native';

interface IProps {
  error?: string;
}

type ErrorProps = (props: IProps) => JSX.Element;

const Error: ErrorProps = ({ error }) => {
  return (
    <>
      <StatusBarMain />
      <View style={tw`flex-1 flex-col items-center justify-center w-full p-5 bg-accent-1`}>
        <View style={tw`flex-col items-center w-full mb-10`}>
          <Text style={tw`text-black text-2xl text-accent-4`}>alterbook</Text>
          <Text style={tw`text-light text-xs text-accent-4`}>just put out everything you want to say here...</Text>
        </View>
        {error
          ? <Text style={tw`text-regular text-center text-sm text-red-600`}>{error}</Text>
          : <Text style={tw`text-regular text-center text-sm text-red-600`}>there is an error, we will fix it asap.</Text>
        }
      </View>
    </>
  );
};

export default Error;
