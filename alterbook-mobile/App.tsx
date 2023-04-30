import React from 'react';
import * as screen from './src/shared/screens';
import StatusBarMain from './src/components/StatusBarMain';
import Loading from './src/layouts/misc/Loading';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './src/config/RootNavigation';
import { useGuard } from './src/helpers/hooks/useGuard';
import { useCheckOnline } from './src/helpers/hooks/useCheckOnline';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // retry to refetch the data from api if the internet is slow or no internet connection.
    },
  },
});

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {

  const isAuth = useGuard();

  const checkOnline = useCheckOnline();

  if (checkOnline !== null && !checkOnline) {
    return <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef}>
        <StatusBarMain />
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
          {!isAuth
            ? <>
                <Stack.Screen name="LoginScreen" component={screen.LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={screen.RegisterScreen} />
              </>
            : <>
                <Stack.Screen name="HomeScreen" component={screen.HomeScreen} />
                <Stack.Screen name="ProfileScreen" component={screen.ProfileScreen} />
                <Stack.Screen name="SettingsScreen" component={screen.SettingsScreen} />
              </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
