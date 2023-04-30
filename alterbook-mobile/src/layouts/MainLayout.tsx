import React from 'react';
import NavBar from '../components/NavBar';
import FootBar from '../components/FootBar';
import NewPost from '../components/Modals/NewPost';
import tw from '../styles/tailwind';
import { SafeAreaView, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { UserPropsInterface } from '../shared/interfaces';

interface IProps extends UserPropsInterface {
  children: React.ReactNode;
}

type MainLayoutProps = (props: IProps) => JSX.Element;

const MainLayout: MainLayoutProps = ({ children, user }) => {

  const route = useRoute();

  return (
    <SafeAreaView style={tw`relative flex-1 bg-accent-1`}>
      <NavBar />
      <NewPost />
      <View style={tw`flex-1`}>
        {children}
      </View>
      {route.name !== 'SettingsScreen' && (
        <FootBar user={user} />
      )}
    </SafeAreaView>
  );
};

export default MainLayout;
