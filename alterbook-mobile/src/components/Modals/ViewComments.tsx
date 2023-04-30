import React from 'react';
import Loading from '../../layouts/misc/Loading';
import Error from '../../layouts/misc/Error';
import CardComment from '../Cards/CardComment';
import tw from '../../styles/tailwind';
import { OcticonIcon } from '../../utils/Icons';
import { Modal, FlatList, View, Text, ActivityIndicator, RefreshControl, TextInput, TouchableOpacity } from 'react-native';

import { useGetComments } from '../../helpers/tanstack/queries/comments';
import { useCreateCommentMutation } from '../../helpers/tanstack/mutations/comments';

interface IProps {
  userId: string;
  postId: string;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

type ViewCommentsProps = (props: IProps) => JSX.Element;

const ViewComments: ViewCommentsProps = ({ userId, postId, isVisible, setIsVisible }) => {

  const createCommentMutation = useCreateCommentMutation();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [comment, setComment] = React.useState<string>('');

  const {
    data: comments,
    isLoading: isLoadingComments,
    isError: isErrorComments,
    error: errorComments,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useGetComments(postId);

  if (isLoadingComments) {
    return <Loading />;
  }

  if (isErrorComments) {
    return <Error error={errorComments} />;
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
          No comments as of now.
        </Text>
      </View>
    );
  };

  const renderData = (item: any) => {
    return (
      <CardComment
        id={item.item.id}
        message={item.item.message}
        created_at={item.item.created_at}
        user={item.item.user}
        userId={userId}
      />
    );
  };

  const handleComment = async () => {
    if (comment.trim() === '') {
      return setError('Comment is required');
    }

    setIsLoading(true);

    await createCommentMutation.mutateAsync({
      message: comment,
      postId,
    },
    {
      onError: (e: any) => {
        setIsLoading(false);
        setError(e.response.data?.message);
      },
      onSuccess: () => {
        setIsLoading(false);
        setError('');
        setComment('');
      },
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setError('');
        setComment('');
        setIsVisible(false);
      }}>
      <View style={tw`flex-col w-full h-full bg-accent-1 bg-opacity-95`}>
        <View style={tw`flex-col items-center w-full p-3 border-line-bottom p-5`}>
          <View style={tw`flex-row items-center justify-between w-full mb-3`}>
            <Text style={tw`text-regular text-xl text-accent-4`}>Comments</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
              setError('');
              setComment('');
              setIsVisible(false);
            }}>
              <OcticonIcon size={18} name="x" color="#E8EAED" />
            </TouchableOpacity>
          </View>
          {error && (
            <View style={tw`flex-col items-center w-full mt-5`}>
              <Text style={tw`text-regular text-red-500 lowercase`}>{error}</Text>
            </View>
          )}
          <View style={tw`flex-col w-full`}>
            <Text style={tw`text-regular`}>$ your_comment</Text>
            <TextInput
              multiline
              style={tw`w-full p-3 text-regular border-line-bottom text-accent-4`}
              value={comment}
              onChangeText={(value: string) => {
                setError('');
                setComment(value);
              }}
            />
          </View>
          <View style={tw`flex-row items-center justify-end w-full mt-3`}>
            <TouchableOpacity
              disabled={isLoading || comment.trim() === ''}
              activeOpacity={0.5}
              style={tw`flex-row items-center justify-end w-full max-w-[8rem] px-3 py-1 rounded-md bg-accent-2 ${(isLoading || comment.trim() === '') ? 'opacity-50' : 'opacity-100'}`}
              onPress={handleComment}>
              <Text style={tw`text-regular text-sm`}>{isLoading ? '_sending...' : '_comment'}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
          ListEmptyComponent={listIsEmpty}
          data={comments.pages.map((page: any) => page.comments).flat()}
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

export default ViewComments;
