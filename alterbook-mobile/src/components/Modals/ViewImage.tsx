import React from 'react';
import moment from 'moment';
import tw from '../../styles/tailwind';
import { ScrollView, Modal, View, Image, Text, TouchableOpacity } from 'react-native';
import { OcticonIcon } from '../../utils/Icons';

interface IProps {
  image?: string;
  story: string;
  username: string;
  created_at: string;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

type ViewImageProps = (props: IProps) => JSX.Element;

const ViewImage: ViewImageProps = ({ image, story, username, created_at, isVisible, setIsVisible }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(false);
      }}>
      <View style={tw`flex-1 flex-col w-full bg-accent-1 bg-opacity-95`}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={tw`flex-col w-full p-5 overflow-hidden`}>
            <View style={tw`flex-row items-center justify-between w-full mb-5`}>
              <Text style={tw`text-regular text-xl text-accent-4`}>Post</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={() => setIsVisible(false)}>
                <OcticonIcon size={18} name="x" color="#E8EAED" />
              </TouchableOpacity>
            </View>
            {image && (
              <Image
                style={tw`rounded-md mb-3 w-full h-[30rem] bg-accent-2`}
                resizeMode="cover"
                source={{
                  uri: `${ image }`,
                }}
              />
            )}
            <View style={tw`flex-col w-full mx-3 my-5`}>
              <Text style={tw`text-regular text-base`}>{story}</Text>
            </View>
            <View style={tw`flex-col w-full mx-3 my-5`}>
              <Text style={tw`text-regular text-sm text-accent-4`}>@{username}</Text>
              <Text style={tw`text-light text-xs text-neutral-400`}>{moment(created_at).format('LL')}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ViewImage;
