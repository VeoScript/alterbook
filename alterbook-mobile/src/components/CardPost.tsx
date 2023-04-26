import React from 'react';
import tw from '../styles/tailwind';
import { FeatherIcon } from '../utils/Icons';
import { View, Text } from 'react-native';

const CardPost = (): JSX.Element => {
  return (
    <View style={tw`flex-row w-full overflow-hidden border-line-bottom p-5`}>
      <View style={tw`flex-col items-start mr-3`}>
        <View style={tw`flex-col w-full my-1`}>
          <FeatherIcon size={20} name="heart" color="#E8EAED" />
          <Text style={tw`mt-1 text-regular text-xs text-neutral-400`}>
            11k
          </Text>
        </View>
        <View style={tw`flex-col w-full my-1`}>
          <FeatherIcon size={20} name="message-square" color="#E8EAED" />
          <Text style={tw`mt-1 text-regular text-xs text-neutral-400`}>
            500
          </Text>
        </View>
      </View>
      <View style={tw`flex-col items-start ml-3`}>
        <View style={tw`w-full`}>
          <Text style={tw`text-light text-sm`}>
            This is the text caption created by the fuckin user...
          </Text>
        </View>
        <View style={tw`flex-col w-full my-3`}>
          <Text style={tw`flex-1 my-1 text-light text-sm text-accent-4`}>
            @username
          </Text>
          <Text style={tw`flex-1 my-1 text-light text-xs text-neutral-400`}>
            April 25, 2023
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardPost;
