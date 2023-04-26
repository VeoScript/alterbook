import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Platform } from 'react-native';

export const useCheckOnline = (): boolean => {
  const [isOnline, setIsOnline] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      return NetInfo.addEventListener((state) => {
        if (state.isConnected != null && state.isConnected && Boolean(state.isInternetReachable)) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      });
    }
  }, []);

  return isOnline;
};
