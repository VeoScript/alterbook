import React from 'react';
import Loading from '../layouts/misc/Loading';
import Error from '../layouts/misc/Error';
import MainLayout from '../layouts/MainLayout';
import ViewUploadProfile from '../components/Modals/ViewUploadProfile';
import tw from '../styles/tailwind';
import { launchImageLibrary } from 'react-native-image-picker';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useGoBack } from '../config/RootNavigation';
import { useBackHandler } from '../helpers/hooks/useBackHandler';

import { settingsRegisterStore } from '../helpers/zustand/store';
import { useGetUser } from '../helpers/tanstack/queries/user';
import { useUpdateAccountMutation, useChangePasswordMutation } from '../helpers/tanstack/mutations/account';

const SettingsScreen = () => {

  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = React.useState<boolean>(false);
  const [isLoadingChange, setIsLoadingChange] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [errorPassword, setErrorPassword] = React.useState<string>('');

  const updateAccountMutation = useUpdateAccountMutation();
  const changePasswordMutation = useChangePasswordMutation();

  const {
    image,
    shortbio,
    username,
    email,
    old_password,
    new_password,
    re_password,
    setImage,
    setShortBio,
    setUsername,
    setEmail,
    setOldPassword,
    setNewPassword,
    setRePassword,
    setDefault,
  } = settingsRegisterStore();

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

  React.useEffect(() => {
    setShortBio(user.shortbio);
    setUsername(user.username);
    setEmail(user.email);
  }, [user]);

  useBackHandler(() => {
    setDefault();
    useGoBack();
  });

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
        setIsVisible(false);
        return;
      }
      if (response) {
        setError('');
        setImage(response.assets);
        setIsVisible(true);
      }
    });
  };

  const handleUpdateAccount = async () => {
    if (username.trim() === '') {
      return setError('Username is not valid');
    }

    setIsLoadingUpdate(true);

    await updateAccountMutation.mutateAsync({
      shortbio,
      username,
    },
    {
      onError: (e) => {
        setIsLoadingUpdate(false);
        setError(e.response.data?.message);
      },
      onSuccess: () => {
        setIsLoadingUpdate(false);
        setDefault();
      },
    });
  };

  const handleChangePassword = async () => {
    if (old_password.trim() === '') {
      return setErrorPassword('Old password is required');
    }
    if (new_password.trim() === '') {
      return setErrorPassword('New password is required');
    }
    if (re_password !== new_password) {
      return setErrorPassword('Password not match');
    }

    setIsLoadingChange(true);

    await changePasswordMutation.mutateAsync({
      new_password,
      old_password,
    },
    {
      onError: (e) => {
        setIsLoadingChange(false);
        setErrorPassword(e.response.data?.message);
      },
      onSuccess: () => {
        setIsLoadingChange(false);
        setDefault();
      },
    });
  };

  return (
    <MainLayout user={user}>
      <ScrollView
        style={tw`w-full h-full`}
        keyboardShouldPersistTaps="handled">
        <View style={tw`flex-col w-full h-full p-3`}>
          {error && (
            <View style={tw`flex-col items-center w-full my-3`}>
              <Text style={tw`text-regular text-red-500 lowercase`}>{error}</Text>
            </View>
          )}
          <View style={tw`flex-col items-start w-full my-2`}>
            <Text style={tw`text-regular text-base text-accent-4`}>Account Information</Text>
          </View>
          <View style={tw`flex-col items-start w-full my-2`}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`flex-row items-center justify-center w-full px-3 py-2 rounded-md bg-accent-2`}
              onPress={handleChoosePhoto}>
              <Text style={tw`text-regular text-sm`}>change_profile_photo</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-col items-start w-full my-2`}>
            <Text style={tw`text-light text-sm`}>$ short_bio</Text>
            <TextInput
              multiline
              style={tw`w-full p-1 border-line-bottom text-regular text-accent-4`}
              value={shortbio}
              onChangeText={(value: string) => {
                setError('');
                setShortBio(value);
              }}
            />
          </View>
          <View style={tw`flex-col items-start w-full my-2`}>
            <Text style={tw`text-light text-sm`}>$ username</Text>
            <TextInput
              style={tw`w-full p-1 border-line-bottom text-regular text-accent-4`}
              value={username}
              onChangeText={(value: string) => {
                setError('');
                setUsername(value);
              }}
            />
          </View>
          <View style={tw`flex-col items-start w-full my-2`}>
            <Text style={tw`text-light text-sm`}>$ email</Text>
            <TextInput
              editable={false}
              style={tw`w-full p-1 border-line-bottom text-regular text-accent-4`}
              value={email}
              onChangeText={(value: string) => setEmail(value)}
            />
          </View>
          <View style={tw`flex-col items-end w-full my-2`}>
            <TouchableOpacity
              disabled={isLoadingUpdate}
              activeOpacity={0.5}
              style={tw`flex-row items-center justify-end w-full max-w-[8rem] my-1 px-3 py-1 rounded-md bg-accent-2`}
              onPress={handleUpdateAccount}>
              <Text style={tw`text-regular text-sm text-accent-4`}>{isLoadingUpdate ? '_updating...' : '_update'}</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-col items-start w-full my-2`}>
            <Text style={tw`text-regular text-base text-accent-4`}>Change Password</Text>
          </View>
          {errorPassword && (
            <View style={tw`flex-col items-center w-full my-3`}>
              <Text style={tw`text-regular text-red-500 lowercase`}>{errorPassword}</Text>
            </View>
          )}
          <View style={tw`flex-col items-start w-full my-2`}>
            <Text style={tw`text-light text-sm`}>$ old_password</Text>
            <TextInput
              style={tw`w-full p-1 border-line-bottom text-regular text-accent-4`}
              secureTextEntry={true}
              value={old_password}
              onChangeText={(value: string) => {
                setErrorPassword('');
                setOldPassword(value);
              }}
            />
          </View>
          <View style={tw`flex-col items-start w-full my-2`}>
            <Text style={tw`text-light text-sm`}>$ new_password</Text>
            <TextInput
              style={tw`w-full p-1 border-line-bottom text-regular text-accent-4`}
              secureTextEntry={true}
              value={new_password}
              onChangeText={(value: string) => {
                setErrorPassword('');
                setNewPassword(value);
              }}
            />
          </View>
          <View style={tw`flex-col items-start w-full my-2`}>
            <Text style={tw`text-light text-sm`}>$ re_enter_password</Text>
            <TextInput
              style={tw`w-full p-1 border-line-bottom text-regular text-accent-4`}
              secureTextEntry={true}
              value={re_password}
              onChangeText={(value: string) => {
                setErrorPassword('');
                setRePassword(value);
              }}
            />
          </View>
          <View style={tw`flex-col items-end w-full my-2`}>
            <TouchableOpacity
              disabled={isLoadingChange}
              activeOpacity={0.5}
              style={tw`flex-row items-center justify-end w-full max-w-[8rem] my-1 px-3 py-1 rounded-md bg-accent-2 ${isLoadingChange ? 'opacity-50' : 'opacity-100'}`}
              onPress={handleChangePassword}>
              <Text style={tw`text-regular text-sm text-accent-4`}>{isLoadingChange ? '_changing...' : '_change'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <ViewUploadProfile
        image={image}
        isVisible={isVisible}
        setImage={setImage}
        setIsVisible={setIsVisible}
      />
    </MainLayout>
  );
};

export default SettingsScreen;
