import React from 'react';
import tw from '../../styles/tailwind';
import { OcticonIcon } from '../../utils/Icons';
import { View, Text, TouchableOpacity } from 'react-native';

import { PostPropsInterface } from '../../shared/interfaces';
import { useLikeMutation, useUnlikeMutation } from '../../helpers/tanstack/mutations/reaction';

interface IProps extends Omit<PostPropsInterface, 'story' | 'image' | 'created_at' | 'user'> {
  userId: string;
}

type LikeButtonProps = (props: IProps) => JSX.Element;

const LikeButton: LikeButtonProps = ({ id, _count, likes, userId }) => {

  const likeMutation = useLikeMutation();
  const unlikeMutation = useUnlikeMutation();

  const [like, setLike] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLike(likes.some((liked: { userId: string }) => liked.userId === userId));
  }, [userId, likes]);

  const handleLike = async () => {
    setIsLoading(true);

    await likeMutation.mutateAsync({
      postId: id,
    },
    {
      onError: () => {
        setIsLoading(false);
      },
      onSuccess() {
        setIsLoading(false);
      },
    });
  };

  const handleUnlike = async () => {
    setIsLoading(true);

    await unlikeMutation.mutateAsync({
      postId: id,
    },
    {
      onError: () => {
        setIsLoading(false);
      },
      onSuccess() {
        setIsLoading(false);
      },
    });
  };

  return (
    <View style={tw`flex-col w-full my-1`}>
      <TouchableOpacity
        onPress={async () => {
          setLike(!like);
          like ? await handleUnlike() : await handleLike();
        }}>
        {like
          ? <OcticonIcon size={20} name="heart-fill" color="#27C52C" />
          : <OcticonIcon size={20} name="heart" color="#E8EAED" />
        }
      </TouchableOpacity>
      <Text style={tw`mt-1 text-regular text-center text-xs text-neutral-400`}>{isLoading ? '...' : _count.likes}</Text>
    </View>
  );
};

export default LikeButton;
