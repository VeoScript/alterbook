import React from 'react';
import tw from '../../styles/tailwind';
import { OcticonIcon } from '../../utils/Icons';
import { launchImageLibrary } from 'react-native-image-picker';
import { Modal, View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';

import { IMGBB_API_SECRET } from '@env';
import { newPostStore } from '../../helpers/zustand/store';
import { useCreatePostMutation } from '../../helpers/tanstack/mutations/post';

const NewPost = (): JSX.Element => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const { isVisible, image, story, setStory, setImage, setDefault } = newPostStore();

  const createPostMutation = useCreatePostMutation();

  const handleChoosePhoto = () => {
    let options: any = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        setError('');
        setImage(null);
        return;
      }
      if (response) {
        setError('');
        setImage(response.assets);
      }
    });
  };

  const handleCreatePost = async () => {
    try {
      setIsLoading(true);

      if (image !== null) {
        const photo: any = image[0];
        const data = new FormData();

        data.append('image', {
          uri: photo.uri,
          name: photo.fileName,
          type: photo.type,
          size: photo.fileSize,
        });

        await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_SECRET}`, {
          method: 'POST',
          body: data,
        })
        .then((response) => response.json())
        .then(async (result) => {
          await createPostMutation.mutateAsync({
            image: String(result.data.url) ?? null,
            story: story,
          },
          {
            onError: (e: any) => {
              setIsLoading(false);
              setError(e.response.data?.message);
            },
            onSuccess: () => {
              setIsLoading(false);
              setDefault();
            },
          });
        })
        .catch((e) => {
          setIsLoading(false);
          setError(String(e));
          console.log(e);
        });
      } else {
        await createPostMutation.mutateAsync({
          image: null,
          story: story,
        },
        {
          onError: (e: any) => {
            setIsLoading(false);
            setError(e.response.data?.message);
          },
          onSuccess: () => {
            setIsLoading(false);
            setDefault();
          },
        });
      }
    } catch (e: any) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setError('');
        setDefault();
      }}>
      <View style={tw`flex-1 flex-col w-full bg-accent-1 bg-opacity-95`}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={tw`flex-col w-full p-5 overflow-hidden`}>
            <View style={tw`flex-row items-center justify-between w-full`}>
              <Text style={tw`text-regular text-xl text-accent-4`}>New Post</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={() => {
                setError('');
                setDefault();
              }}>
                <OcticonIcon size={18} name="x" color="#E8EAED" />
              </TouchableOpacity>
            </View>
            {error && (
              <View style={tw`flex-col items-center w-full mt-5`}>
                <Text style={tw`text-regular text-red-500 lowercase`}>{error}</Text>
              </View>
            )}
            <View style={tw`flex-col w-full my-5 overflow-hidden`}>
              <View style={tw`flex-col w-full my-3`}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={tw`flex-row items-center justify-center w-full px-3 py-2 rounded-md bg-accent-2`}
                  onPress={handleChoosePhoto}>
                  <Text style={tw`text-regular text-sm`}>add_photo</Text>
                </TouchableOpacity>
                {image && (
                  <View style={tw`relative w-full mt-3`}>
                    <Image
                      style={tw`rounded-md w-full h-[20rem]`}
                      resizeMode="cover"
                      source={{
                        uri: `${ image[0].uri }`,
                      }}
                    />
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={tw`absolute top-3 right-3 flex-row items-center justify-center rounded-full w-[1.5rem] h-[1.5rem] bg-accent-1`}
                      onPress={() => setImage(null)}>
                      <OcticonIcon size={15} name="x" color="#E8EAED" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View style={tw`flex-col w-full my-3`}>
                <Text style={tw`text-regular`}>$ your_story</Text>
                <TextInput
                  multiline
                  style={tw`w-full p-3 text-regular border-line-bottom text-accent-4`}
                  value={story}
                  onChangeText={(value: string) => {
                    setError('');
                    setStory(value);
                  }}
                />
              </View>
              <View style={tw`flex-row items-center justify-end w-full`}>
                <TouchableOpacity
                  disabled={isLoading || story.trim() === ''}
                  activeOpacity={0.5}
                  style={tw`flex-row items-center justify-end w-full max-w-[8rem] px-3 py-1 rounded-md bg-accent-2 ${(isLoading || story.trim() === '') ? 'opacity-50' : 'opacity-100'}`}
                  onPress={handleCreatePost}>
                  <Text style={tw`text-regular text-sm`}>{isLoading ? '_loading...' : '_post'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default NewPost;
