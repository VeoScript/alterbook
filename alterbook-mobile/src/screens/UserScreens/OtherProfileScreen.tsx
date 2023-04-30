import React from 'react';
import Loading from '../../layouts/misc/Loading';
import Error from '../../layouts/misc/Error';
import MainLayout from '../../layouts/MainLayout';
import CardPost from '../../components/Cards/CardPost';
import tw from '../../styles/tailwind';
import { FeatherIcon } from '../../utils/Icons';
import { View, Text, Image, ActivityIndicator, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { useGetUser, useGetUserById } from '../../helpers/tanstack/queries/user';
import { useGetPostsByUser } from '../../helpers/tanstack/queries/post';
import { useFollowMutation, useUnfollowMutation } from '../../helpers/tanstack/mutations/follow';

const OtherProfileScreen = () => {

  const { params }: any = useRoute();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const followMutation = useFollowMutation();
  const unfollowMutation = useUnfollowMutation();

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
    refetch: refetchUser,
    isRefetching: isRefetchingUser,
  } = useGetUser();

  const {
    data: profile,
    isLoading: isLoadingUserById,
    isError: isErrorUserById,
    error: errorUserById,
    refetch: refetchProfile,
    isRefetching: isRefetchingProfile,
  } = useGetUserById(params?.id ?? '');

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    error: errorPosts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch: refetchPost,
    isRefetching: isRefetchingPost,
  } = useGetPostsByUser(params?.id ?? '');

  if (isLoadingUser || isLoadingUserById || isLoadingPosts) {
    return <Loading />;
  }

  if (isErrorUser || isErrorUserById || isErrorPosts) {
    return <Error error={errorUser || errorUserById || errorPosts} />;
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
            {profile.image
              ? <Image
                  style={tw`w-[5rem] h-[5rem] overflow-hidden bg-accent-2`}
                  resizeMode="cover"
                  source={{ uri: profile.image }}
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
              <Text style={tw`text-bold text-xl`}>@{profile.username}</Text>
              <Text style={tw`text-light text-xs`}>{(profile.shortbio === null || profile.shortbio === '') ? 'Short description about you...' : profile.shortbio}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`flex-col items-center w-full p-3 border-line-bottom`}
          onPress={() => {
            handleFollow();
          }}
        >
          <Text style={tw`text-regular text-accent-4`}>{isLoading ? '_loading...' : isFollow ? '_unfollow' : '_follow'}</Text>
        </TouchableOpacity>
        <View style={tw`flex-row items-center w-full border-line-bottom`}>
          <View style={tw`flex-1 flex-row items-center justify-center p-3 border-line-right`}>
            <Text style={tw`text-regular`}>
              <Text style={tw`text-bold text-accent-4`}>{profile._count.followers}</Text>
              {'\r'}_followers
            </Text>
          </View>
          <View style={tw`flex-1 flex-row items-center justify-center p-3`}>
            <Text style={tw`text-regular`}>
              <Text style={tw`text-bold text-accent-4`}>{profile._count.following}</Text>
              {'\r'}_following
            </Text>
          </View>
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
        id={item.item?.id}
        image={item.item?.image}
        story={item.item?.story}
        created_at={item.item?.created_at}
        user={item.item?.user}
        likes={item.item?.likes}
        _count={item.item?._count}
        userId={profile.id}
      />
    );
  };

  const handleFollow = async () => {
    setIsLoading(true);

    if (isFollow) {
      await unfollowMutation.mutateAsync({
        followerId: profile.id,
        followingId: user.id,
      },
      {
        onError: () => {
          setIsLoading(false);
        },
        onSuccess: () => {
          setIsLoading(false);
        },
      });
    } else {
      await followMutation.mutateAsync({
        followerId: profile.id,
        followingId: user.id,
      },
      {
        onError: () => {
          setIsLoading(false);
        },
        onSuccess: () => {
          setIsLoading(false);
        },
      });
    }
  };

  // check if the current user is already followed the user in this profile...
  const isFollow = profile.followers.some((followUser: { followingId: string }) => followUser.followingId === user.id);

  return (
    <MainLayout user={user}>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#27C52C']}
            tintColor={'#27C52C'}
            progressBackgroundColor={'#0E0E0E'}
            refreshing={isRefetchingUser || isRefetchingProfile || isRefetchingPost}
            onRefresh={() => {
              refetchUser();
              refetchProfile();
              refetchPost();
            }}
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
    </MainLayout>
  );
};

export default OtherProfileScreen;
