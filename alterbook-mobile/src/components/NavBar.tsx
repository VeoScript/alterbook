import React from 'react';
import tw from '../styles/tailwind';
import { FeatherIcon } from '../utils/Icons';
import { View, Text, TouchableOpacity } from 'react-native';

import { navbar } from '../config/Paths';

const NavBar = (): JSX.Element => {
  return (
    <View style={tw`flex-row items-center justify-between w-full p-5 border-line-bottom`}>
      <View style={tw`flex-1 flex-row items-center justify-start`}>
        <Text style={tw`text-regular text-xl text-accent-4`}>alterbook</Text>
      </View>
      <View style={tw`flex-1 flex-row items-center justify-end`}>
        {navbar.map(
          (_nav: {
            type: string;
            name: string;
            icon: string;
            screen: string;
          }) => (
            <React.Fragment key={_nav.name}>
              {_nav.type === 'link' ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={tw`mx-2`}
                  onPress={() => console.log(_nav.name)}>
                  <FeatherIcon size={20} name={_nav.icon} color="#E8EAED" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={tw`mx-2`}
                  onPress={() => console.log('Logout Functionality')}>
                  <FeatherIcon size={20} name={_nav.icon} color="#E8EAED" />
                </TouchableOpacity>
              )}
            </React.Fragment>
          ),
        )}
      </View>
    </View>
  );
};

export default NavBar;
