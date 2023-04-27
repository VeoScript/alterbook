import React from 'react';
import NavBar from '../components/NavBar';
import FootBar from '../components/FootBar';
import NewPost from '../components/Modals/NewPost';
import tw from '../styles/tailwind';
import { SafeAreaView, View } from 'react-native';

import { useGetUser } from '../helpers/tanstack/queries/user';
import Loading from './misc/Loading';
import Error from './misc/Error';

interface IProps {
  children: React.ReactNode;
}

type MainLayoutProps = (props: IProps) => JSX.Element;

const MainLayout: MainLayoutProps = ({ children }) => {

  const { data: user, isLoading: isLoadingUser, isError: isErrorUser, error: errorUser } = useGetUser();

  if (isLoadingUser) {
    return <Loading />;
  }

  if (isErrorUser) {
    return <Error error={errorUser} />;
  }

  return (
    <SafeAreaView style={tw`relative flex-1 bg-accent-1`}>
      <NavBar />
      <NewPost />
      <View style={tw`flex-1`}>
        {children}
      </View>
      <FootBar user={user} />
    </SafeAreaView>
  );
};

export default MainLayout;
