import React from 'react';
import moment from 'moment';
import tw from '../../styles/tailwind';
import { OcticonIcon } from '../../utils/Icons';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { CommentPropsInterface } from '../../shared/interfaces';
import { useDeleteCommentMutation } from '../../helpers/tanstack/mutations/comments';

type CardCommentProps = (props: CommentPropsInterface) => JSX.Element;

const CardComment: CardCommentProps = ({ id, message, created_at, user }) => {

  const deleteCommentMutation = useDeleteCommentMutation();

  const handleDeleteComment = async () => {
    await deleteCommentMutation.mutateAsync({
      commentId: id,
    });
  };

  return (
    <View style={tw`flex-col items-start w-full p-3 border-line-bottom`}>
      <View style={tw`flex-row items-center justify-between w-full`}>
        <Text style={tw`text-light text-sm`}>{message}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            Alert.alert(
              '',
              'Are you sure you want to delete this comment?',
              [
                {
                  text: 'No',
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  style: 'default',
                  onPress: handleDeleteComment,
                },
              ],
              {
                cancelable: true,
              },
            );
          }}>
          <OcticonIcon size={15} name="trash" color="#B00000" />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row items-center w-full my-3`}>
        <Text style={tw`flex-1 text-left my-1 text-light text-sm text-accent-4`}>@{user.username}</Text>
        <Text style={tw`flex-1 text-right my-1 text-light text-xs text-neutral-400`}>{moment(created_at).format('LL')}</Text>
      </View>
    </View>
  );
};

export default CardComment;
