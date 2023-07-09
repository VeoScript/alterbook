import React from 'react';
import { StatusBar } from 'react-native';

const StatusBarMain = (): JSX.Element => {
  return (
    <StatusBar
      animated={false}
      backgroundColor="#1E2022"
      barStyle="light-content"
    />
  );
};

export default StatusBarMain;
