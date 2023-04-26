import React from 'react';
import tw from '../styles/tailwind';
import {View, Text, TouchableOpacity} from 'react-native';

import {newPostStore} from '../helpers/zustand/store';

const FootBar = (): JSX.Element => {
  const {setIsVisible} = newPostStore();

  return (
    <View
      style={tw`flex-row items-center justify-between w-full px-5 py-3 border-t border-accent-2`}>
      <Text style={tw`flex-1 text-regular text-base text-accent-4`}>
        @username
      </Text>
      <TouchableOpacity
        activeOpacity={0.5}
        style={tw`flex-1 flex-row items-center justify-center w-full max-w-[8rem] px-3 py-1 rounded-full bg-accent-2`}
        onPress={() => setIsVisible(true)}>
        <Text style={tw`text-regular text-sm`}>new_post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FootBar;
