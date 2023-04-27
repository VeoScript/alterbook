import React from 'react';
import tw from '../styles/tailwind';
import { View, Text, TouchableOpacity } from 'react-native';

import { UserInterface } from '../shared/interfaces';
import { newPostStore } from '../helpers/zustand/store';

type FoorBarProps = (props: UserInterface) => JSX.Element;

const FootBar: FoorBarProps = ({ user }) => {

  const { setIsVisible } = newPostStore();

  return (
    <View style={tw`flex-row items-center justify-between w-full px-5 py-3 border-line-top`}>
      <Text style={tw`flex-1 text-regular text-xs text-accent-4`}>@{user.username}</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        style={tw`flex-1 flex-row items-center justify-end w-full max-w-[6rem] px-3 py-1 rounded-md bg-accent-2`}
        onPress={() => setIsVisible(true)}>
        <Text style={tw`text-regular text-sm`}>_new_post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FootBar;
