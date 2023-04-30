import React from 'react';
import Loading from '../../layouts/misc/Loading';
import Error from '../../layouts/misc/Error';
import CardFollowers from '../Cards/CardFollowers';
import tw from '../../styles/tailwind';
import { OcticonIcon } from '../../utils/Icons';
import { Modal, FlatList, View, Text, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';

import { useGetFollowers } from '../../helpers/tanstack/queries/followers';

interface IProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

type ViewFollowersProps = (props: IProps) => JSX.Element;

const ViewFollowers: ViewFollowersProps = ({ isVisible, setIsVisible }) => {
  const {
    data: followers,
    isLoading: isLoadingFollowers,
    isError: isErrorFollowers,
    error: errorFollowers,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useGetFollowers();

  if (isLoadingFollowers) {
    return <Loading />;
  }

  if (isErrorFollowers) {
    return <Error error={errorFollowers} />;
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
          You don't have any followers as of now.
        </Text>
      </View>
    );
  };

  const headerDisplay = () => {
    return (
      <View style={tw`flex-row items-center justify-between w-full p-5 border-line-bottom`}>
        <Text style={tw`text-regular text-xl text-accent-4`}>Followers</Text>
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
      <CardFollowers
        image={item.item.following.image}
        username={item.item.following.username}
        _count={item.item.following._count}
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
          data={followers.pages.map((page: any) => page.followers.followers).flat()}
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

export default ViewFollowers;
