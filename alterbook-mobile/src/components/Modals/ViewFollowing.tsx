import React from 'react';
import Loading from '../../layouts/misc/Loading';
import Error from '../../layouts/misc/Error';
import CardFollowing from '../Cards/CardFollowing';
import tw from '../../styles/tailwind';
import { OcticonIcon } from '../../utils/Icons';
import { Modal, FlatList, View, Text, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';

import { useGetFollowing } from '../../helpers/tanstack/queries/followers';

interface IProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

type ViewFollowingProps = (props: IProps) => JSX.Element;

const ViewFollowing: ViewFollowingProps = ({ isVisible, setIsVisible }) => {
  const {
    data: following,
    isLoading: isLoadingFollowing,
    isError: isErrorFollowing,
    error: errorFollowing,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useGetFollowing();

  if (isLoadingFollowing) {
    return <Loading />;
  }

  if (isErrorFollowing) {
    return <Error error={errorFollowing} />;
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
      <View style={tw`flex-col items-center justify-center w-full my-3 p-3`}>
        <Text style={tw`text-regular text-sm text-accent-4`}>
          You don't have any following yet.
        </Text>
      </View>
    );
  };

  const headerDisplay = () => {
    return (
      <View style={tw`flex-row items-center justify-between w-full p-5 border-line-bottom`}>
        <Text style={tw`text-regular text-xl text-accent-4`}>Following</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setIsVisible(false)}>
          <OcticonIcon size={18} name="x" color="#E8EAED" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderData = (item: any) => {
    return (
      <CardFollowing
        image={item.item.follower.image}
        username={item.item.follower.username}
        _count={item.item.follower._count}
      />
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}>
      <View style={tw`flex-col w-full h-full bg-accent-1 bg-opacity-95`}>
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
          ListHeaderComponent={headerDisplay}
          ListEmptyComponent={listIsEmpty}
          data={following.pages.map((page: any) => page.following.following).flat()}
          renderItem={renderData}
          keyExtractor={itemKeyExtractor}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
        />
      </View>
    </Modal>
  );
};

export default ViewFollowing;
