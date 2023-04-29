import React from 'react';
import ViewImage from '../components/Modals/ViewImage';
import moment from 'moment';
import tw from '../styles/tailwind';
import { FeatherIcon } from '../utils/Icons';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { PostPropsInterface } from '../shared/interfaces';

type CardPostProps = (props: PostPropsInterface) => JSX.Element;

const CardPost: CardPostProps = ({ image, story, user, created_at }) => {

  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  return (
    <>
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
        <View style={tw`flex-1 flex-col items-start w-full ml-3`}>
          <View style={tw`w-full`}>
            {image && (
              <TouchableOpacity
                activeOpacity={0.5}
                style={tw`w-full`}
                onPress={() => setIsVisible(true)}>
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
            <Text style={tw`flex-1 text-left my-1 text-light text-sm text-accent-4`}>@{user.username}</Text>
            <Text style={tw`flex-1 text-right my-1 text-light text-xs text-neutral-400`}>{moment(created_at).format('LL')}</Text>
          </View>
        </View>
      </View>
      <ViewImage
        image={image}
        story={story}
        username={user.username}
        created_at={created_at}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
};

export default CardPost;
