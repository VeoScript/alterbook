import React from 'react';
import tw from '../../styles/tailwind';
import { FeatherIcon } from '../../utils/Icons';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigate } from '../../config/RootNavigation';

import { UserInterface } from '../../shared/interfaces';

interface IProps extends Omit<UserInterface, 'email' | 'shortbio' | 'followers' | 'following'> {
  userId: string;
}

type CardFollowingProps = (props: IProps) => JSX.Element;

const CardFollowing: CardFollowingProps = ({ id, image, username, _count, userId }) => {
  return (
    <View style={tw`flex-col w-full h-[5rem] overflow-hidden border-line-bottom`}>
      <View style={tw`flex-1 flex-row items-start w-full mr-2`}>
        {image
          ? <Image
              style={tw`w-[5rem] h-[5rem] overflow-hidden bg-accent-2`}
              resizeMode="cover"
              source={{ uri: image }}
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
          <TouchableOpacity
            activeOpacity={0.5}
            style={tw`flex-1`}
            onPress={() => {
              if (id === userId) {
                useNavigate('ProfileScreen');
              } else {
                useNavigate('OtherProfileScreen', { id: id });
              }
            }}>
            <Text style={tw`text-bold text-base text-accent-4`}>@{username}</Text>
          </TouchableOpacity>
          <Text style={tw`text-light text-sm`}>_followers: {_count.followers}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardFollowing;
