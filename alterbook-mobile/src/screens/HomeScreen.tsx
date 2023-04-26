import React from 'react';
import MainLayout from '../layouts/MainLayout';
import CardPost from '../components/CardPost';
import tw from '../styles/tailwind';
import { ScrollView } from 'react-native';

const HomeScreen = (): JSX.Element => {
  return (
    <MainLayout>
      <ScrollView style={tw`w-full h-full`}>
        <CardPost />
      </ScrollView>
    </MainLayout>
  );
};

export default HomeScreen;
