import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Login, Signup } from '../screens/index';
import { AuthRoutes } from './Types';
const AuthStack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={AuthRoutes.Login}
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name={AuthRoutes.Signup}
        component={Signup}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
