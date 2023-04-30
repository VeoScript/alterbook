import React from 'react';
import Loading from '../../layouts/misc/Loading';
import Error from '../../layouts/misc/Error';
import MainLayout from '../../layouts/MainLayout';
import CardPost from '../../components/Cards/CardPost';
import ViewFollowers from '../../components/Modals/ViewFollowers';
import ViewFollowing from '../../components/Modals/ViewFollowing';
import tw from '../../styles/tailwind';
import { FeatherIcon } from '../../utils/Icons';
import { View, Text, Image, ActivityIndicator, FlatList, RefreshControl, TouchableOpacity } from 'react-native';

import { useGetUser } from '../../helpers/tanstack/queries/user';
import { useGetPostsByUser } from '../../helpers/tanstack/queries/post';

const ProfileScreen = () => {

  const [isVisibleFollowers, setIsVisibleFollowers] = React.useState<boolean>(false);
  const [isVisibleFollowing, setIsVisibleFollowing] = React.useState<boolean>(false);

  const {
    data: user,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
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
    isRefetching,
  } = useGetPostsByUser(isSuccessUser ? user.id : '');

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
          You don't have any post yet.
        </Text>
      </View>
    );
  };

  const headerDisplay = () => {
    return (
      <View style={tw`flex-col w-full`}>
        <View style={tw`flex-col w-full h-[5rem] overflow-hidden border-line-bottom`}>
          <View style={tw`flex-1 flex-row items-start w-full mr-2`}>
            {user.image
              ? <Image
                  style={tw`w-[5rem] h-[5rem] overflow-hidden bg-accent-2`}
                  resizeMode="cover"
                  source={{ uri: user.image }}
                />
              : <View style={tw`flex-row items-center justify-center w-[5rem] h-[5rem] p-2 overflow-hidden bg-accent-2`}>
                  <FeatherIcon
                    name="user"
                    size={50}
                    color="#27C52C"
                  />
                </View>
            }
            <View style={tw`flex-1 flex-col w-full ml-2 py-2`}>
              <Text style={tw`text-bold text-xl`}>@{user.username}</Text>
              <Text style={tw`text-light text-xs`}>{(user.shortbio === null || user.shortbio === '') ? 'Short description about you...' : user.shortbio}</Text>
            </View>
          </View>
        </View>
        <View style={tw`flex-row items-center w-full border-line-bottom`}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`flex-1 flex-row items-center justify-center p-3 border-line-right`}
            onPress={() => setIsVisibleFollowers(true)}>
            <Text style={tw`text-regular`}>
              <Text style={tw`text-bold text-accent-4`}>{user._count.followers}</Text>
              {'\r'}_followers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`flex-1 flex-row items-center justify-center p-3 border-line-right`}
            onPress={() => setIsVisibleFollowing(true)}>
            <Text style={tw`text-regular`}>
              <Text style={tw`text-bold text-accent-4`}>{user._count.following}</Text>
              {'\r'}_following
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row items-center w-full p-3 border-line-bottom`}>
          <Text style={tw`text-regular text-base text-accent-4`}>Timeline</Text>
        </View>
      </View>
    );
  };

  const renderData = (item: any) => {
    return (
      <CardPost
        id={item.item.id}
        image={item.item.image}
        story={item.item.story}
        created_at={item.item.created_at}
        user={item.item.user}
        likes={item.item.likes}
        _count={item.item._count}
        userId={user.id}
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
            progressBackgroundColor={'#0E0E0E'}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        }
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={headerDisplay}
        ListEmptyComponent={listIsEmpty}
        data={posts.pages.map((page: any) => page.posts).flat()}
        renderItem={renderData}
        keyExtractor={itemKeyExtractor}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
      />
      <ViewFollowers
        isVisible={isVisibleFollowers}
        setIsVisible={setIsVisibleFollowers}
      />
      <ViewFollowing
        isVisible={isVisibleFollowing}
        setIsVisible={setIsVisibleFollowing}
      />
    </MainLayout>
  );
};

export default ProfileScreen;
