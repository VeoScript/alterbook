import React from 'react';
import MainLayout from '../layouts/MainLayout';
import tw from '../styles/tailwind';
import {ScrollView, View, Text} from 'react-native';

const HomeScreen = (): JSX.Element => {
  return (
    <MainLayout>
      <ScrollView style={tw`w-full h-full`}>
        <View style={tw`flex-col w-full h-full`}>
          <Text style={tw`text-regular`}>Home Screen</Text>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default HomeScreen;
