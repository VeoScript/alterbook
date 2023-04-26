import React from 'react';
import * as screen from './src/shared/screen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './src/config/RootNavigation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // retry to refetch the data from api if the internet is slow or no internet connection.
    },
  },
});

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar
          animated={false}
          backgroundColor="#2E3134"
          barStyle="light-content"
        />
        <Stack.Navigator
          screenOptions={{headerShown: false, animation: 'none'}}>
          <Stack.Screen name="HomeScreen" component={screen.HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
