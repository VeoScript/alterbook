import React from 'react';
import Loading from '../layouts/misc/Loading';
import Error from '../layouts/misc/Error';
import MainLayout from '../layouts/MainLayout';
import CardPost from '../components/CardPost';
import tw from '../styles/tailwind';
import { ScrollView } from 'react-native';

import { useGetUser } from '../helpers/tanstack/queries/user';

const HomeScreen = (): JSX.Element => {

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUser();

  if (isLoadingUser) {
    return <Loading />;
  }

  if (isErrorUser) {
    return <Error error={errorUser} />;
  }

  return (
    <MainLayout user={user}>
      <ScrollView
        style={tw`w-full h-full`}
        keyboardShouldPersistTaps="handled"
      >
        <CardPost />
      </ScrollView>
    </MainLayout>
  );
};

export default HomeScreen;
