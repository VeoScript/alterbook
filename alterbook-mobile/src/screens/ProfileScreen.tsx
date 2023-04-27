import React from 'react';
import Loading from '../layouts/misc/Loading';
import Error from '../layouts/misc/Error';
import MainLayout from '../layouts/MainLayout';
import tw from '../styles/tailwind';
import { FeatherIcon } from '../utils/Icons';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { useGetUser } from '../helpers/tanstack/queries/user';

const ProfileScreen = () => {

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUser();

  if (isLoadingUser) {
    return <Loading />;
  }

  if (isErrorUser) {
    return <Error error={errorUser} />;
  }

  return (
    <MainLayout user={user}>
      <View style={tw`flex-col w-full h-full`}>
        <View style={tw`flex-col w-full h-[5rem] overflow-hidden border-line-bottom`}>
          <View style={tw`flex-1 flex-row items-start w-full mr-2`}>
            {user.image
              ? <Image
                  style={tw`w-[5rem] h-[5rem] overflow-hidden bg-accent-2`}
                  resizeMode="cover"
                  source={{ uri: user.image }}
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
              <Text style={tw`text-bold text-xl`}>@{user.username}</Text>
              <Text style={tw`text-light text-xs`}>{user.shortbio ?? 'Short description about you...'}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`flex-col items-center w-full p-3 border-line-bottom`}
          onPress={() => console.log('Change profile photo')}
        >
          <Text style={tw`text-regular text-accent-4`}>_change_profile_photo</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default ProfileScreen;
