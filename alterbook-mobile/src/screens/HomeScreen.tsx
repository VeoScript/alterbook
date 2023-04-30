import React from 'react';
import Loading from '../layouts/misc/Loading';
import Error from '../layouts/misc/Error';
import MainLayout from '../layouts/MainLayout';
import CardPost from '../components/CardPost';
import tw from '../styles/tailwind';
import { FlatList, ActivityIndicator, Text, View, RefreshControl } from 'react-native';

import { useGetUser } from '../helpers/tanstack/queries/user';
import { useGetPosts } from '../helpers/tanstack/queries/post';

const HomeScreen = (): JSX.Element => {

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUser();

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    error: errorPosts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  }: any = useGetPosts();

  if (isLoadingUser || isLoadingPosts) {
    return <Loading />;
  }

  if (isErrorUser || isErrorPosts) {
    return <Error error={errorUser || errorPosts} />;
  }

  const itemKeyExtractor = (item: any, index: { toString: () => any }) => {
    return index.toString();
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderSpinner = () => {
    return <ActivityIndicator style={tw`pb-3`} color="#27C52C" size={40} />;
  };

  const listIsEmpty = () => {
    return (
      <View style={tw`flex-1 flex-col items-center justify-center w-full my-3 p-3`}>
        <Text style={tw`text-regular text-sm text-accent-4`}>
          Alterbook newsfeed is no posts as of now.
        </Text>
      </View>
    );
  };

  const renderData = (item: any) => {
    return (
      <CardPost
        id={item.item.id}
        image={item.item.image}
        story={item.item.story}
        user={item.item.user}
        created_at={item.item.created_at}
      />
    );
  };

  return (
    <MainLayout user={user}>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#27C52C']}
            tintColor={'#27C52C'}
            refreshing={isFetching}
            onRefresh={refetch}
          />
        }
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={listIsEmpty}
        data={posts.pages.map((page: any) => page.posts).flat()}
        renderItem={renderData}
        keyExtractor={itemKeyExtractor}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
      />
    </MainLayout>
  );
};

export default HomeScreen;
