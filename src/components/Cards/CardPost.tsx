import React from 'react';
import ViewPost from '../Modals/ViewPost';
import ViewComments from '../Modals/ViewComments';
import LikeButton from '../Interactions/LikeButton';
import moment from 'moment';
import tw from '../../styles/tailwind';
import { FeatherIcon, OcticonIcon } from '../../utils/Icons';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigate } from '../../config/RootNavigation';

import { PostPropsInterface } from '../../shared/interfaces';
import { useDeletePostMutation } from '../../helpers/tanstack/mutations/post';

interface IProps extends PostPropsInterface {
  userId: string;
}

type CardPostProps = (props: IProps) => JSX.Element;

const CardPost: CardPostProps = ({ id, image, story, created_at, user, likes, _count, userId }) => {

  const [isVisiblePost, setIsVisiblePost] = React.useState<boolean>(false);
  const [isVisibleComment, setIsVisibleComment] = React.useState<boolean>(false);

  const deletePostMutation = useDeletePostMutation(id);

  const handleDeletePost = async () => {
    await deletePostMutation.mutateAsync();
  };

  return (
    <>
      <View style={tw`relative flex-row w-full overflow-hidden border-line-bottom p-5`}>
        <View style={tw`flex-col items-start mr-3`}>
          <LikeButton
            id={id}
            _count={_count}
            likes={likes}
            userId={userId}
          />
          <View style={tw`flex-col w-full my-1`}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setIsVisibleComment(true)}>
              <FeatherIcon size={20} name="message-square" color="#E8EAED" />
            </TouchableOpacity>
            <Text style={tw`mt-1 text-regular text-center text-xs text-neutral-400`}>{_count.comments}</Text>
          </View>
          {user.id === userId && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`flex-col items-center w-full my-1`}
              onPress={() => {
                Alert.alert(
                  '',
                  'Are you sure you want to delete this post?',
                  [
                    {
                      text: 'No',
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      style: 'default',
                      onPress: handleDeletePost,
                    },
                  ],
                  {
                    cancelable: true,
                  },
                );
              }}>
              <OcticonIcon size={20} name="trash" color="#FF5151" />
            </TouchableOpacity>
          )}
        </View>
        <View style={tw`flex-1 flex-col items-start w-full ml-3`}>
          <View style={tw`w-full`}>
            {image && (
              <TouchableOpacity
                activeOpacity={0.5}
                style={tw`w-full`}
                onPress={() => setIsVisiblePost(true)}>
                <Image
                  style={tw`rounded-md mb-3 w-full h-[20rem] bg-accent-2`}
                  resizeMode="cover"
                  source={{
                    uri: `${ image }`,
                  }}
                />
              </TouchableOpacity>
            )}
            <Text style={tw`text-light text-sm`}>{story}</Text>
          </View>
          <View style={tw`flex-row items-center w-full my-3`}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`flex-1`}
              onPress={() => {
                if (user.id === userId) {
                  useNavigate('ProfileScreen');
                } else {
                  useNavigate('OtherProfileScreen', { id: user.id });
                }
              }}>
              <Text style={tw`text-left my-1 text-light text-sm text-accent-4`}>@{user.username}</Text>
            </TouchableOpacity>
            <Text style={tw`flex-1 text-right my-1 text-light text-xs text-neutral-400`}>{moment(created_at).format('LL')}</Text>
          </View>
        </View>
      </View>
      <ViewPost
        image={image}
        story={story}
        username={user.username}
        created_at={created_at}
        isVisible={isVisiblePost}
        setIsVisible={setIsVisiblePost}
      />
      <ViewComments
        userId={userId}
        postId={id}
        isVisible={isVisibleComment}
        setIsVisible={setIsVisibleComment}
      />
    </>
  );
};

export default CardPost;
