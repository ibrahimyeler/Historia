import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  MainApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen}
        options={{
          animation: 'fade'
        }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen 
        name="MainApp" 
        component={TabNavigator}
        options={{
          animation: 'fade'
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator; 