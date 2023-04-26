import React from 'react';
import tw from '../../styles/tailwind';
import {OcticonIcon} from '../../utils/Icons';
import {Modal, View, Text, TouchableOpacity, TextInput} from 'react-native';

import {newPostStore} from '../../helpers/zustand/store';

const NewPost = (): JSX.Element => {
  const {isVisible, story, setStory, setDefault} = newPostStore();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setDefault();
      }}>
      <View style={tw`flex-1 flex-col w-full p-5 bg-accent-1 bg-opacity-95`}>
        <View style={tw`flex-col w-full overflow-hidden`}>
          <View style={tw`flex-row items-center justify-between w-full`}>
            <Text style={tw`text-regular text-xl text-accent-4`}>New Post</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={() => setDefault()}>
              <OcticonIcon size={18} name="x" color="#E8EAED" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-col w-full my-5 overflow-hidden`}>
            <View style={tw`flex-col w-full my-3`}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={tw`flex-row items-center justify-center w-full px-3 py-2 rounded-md bg-accent-2`}>
                <Text style={tw`text-regular text-sm`}>add_photo</Text>
              </TouchableOpacity>
            </View>
            <View style={tw`flex-col w-full my-3`}>
              <Text style={tw`text-regular`}>$ your_story</Text>
              <TextInput
                multiline
                style={tw`w-full p-3 border-b border-accent-2 text-accent-4`}
                value={story}
                onChangeText={(value: string) => setStory(value)}
              />
            </View>
            <View style={tw`flex-row items-center justify-end w-full`}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={tw`flex-row items-center justify-center w-full max-w-[8rem] px-3 py-1 rounded-md bg-accent-2`}
                onPress={() => setDefault()}>
                <Text style={tw`text-regular text-sm`}>_post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewPost;
