import React from 'react';
import tw from '../../styles/tailwind';
import { OcticonIcon } from '../../utils/Icons';
import { ScrollView, Modal, View, Image, Text, TouchableOpacity } from 'react-native';

import { IMGBB_API_SECRET } from '@env';
import { settingsRegisterStore } from '../../helpers/zustand/store';
import { useUpdateProfileImageMutation } from '../../helpers/tanstack/mutations/account';

interface IProps {
  image: any;
  isVisible: boolean;
  setImage: (value: any) => void;
  setIsVisible: (value: boolean) => void;
}

type ViewUploadProfileProps = (props: IProps) => JSX.Element;

const ViewUploadProfile: ViewUploadProfileProps = ({ image, isVisible, setImage, setIsVisible }) => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const updateProfileImageMutation = useUpdateProfileImageMutation();

  const { setDefault } = settingsRegisterStore();

  const handleUploadProfile = async () => {
    try {
      setIsLoading(true);

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
        await updateProfileImageMutation.mutateAsync({
          image: String(result.data.url) ?? null,
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
        setImage(null);
        setIsVisible(false);
      }}>
      <View style={tw`flex-1 flex-col w-full bg-accent-1 bg-opacity-95`}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={tw`flex-col w-full p-5 overflow-hidden`}>
            <View style={tw`flex-row items-center justify-between w-full mb-5`}>
              <Text style={tw`text-regular text-xl text-accent-4`}>Change Profile Photo</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={() => {
                setImage(null);
                setIsVisible(false);
              }}>
                <OcticonIcon size={18} name="x" color="#E8EAED" />
              </TouchableOpacity>
            </View>
            {error && (
              <View style={tw`flex-col items-center w-full mt-5`}>
                <Text style={tw`text-regular text-red-500 lowercase`}>{error}</Text>
              </View>
            )}
            {image && (
              <Image
                style={tw`rounded-md mb-3 w-full h-[20rem] bg-accent-2`}
                resizeMode="cover"
                source={{
                  uri: `${ image[0].uri }`,
                }}
              />
            )}
            <View style={tw`flex-row items-center justify-end w-full`}>
              <TouchableOpacity
                disabled={isLoading || image === null}
                activeOpacity={0.5}
                style={tw`flex-row items-center justify-end w-full max-w-[8rem] px-3 py-1 rounded-md bg-accent-2 ${(isLoading || image === null) ? 'opacity-50' : 'opacity-100'}`}
                onPress={handleUploadProfile}>
                <Text style={tw`text-regular text-sm`}>{isLoading ? '_uploading...' : '_upload'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ViewUploadProfile;
