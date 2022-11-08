import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Dashboard, Settings } from '../screens/index';
import { MainRoutes } from './Types';

const MainStack = createStackNavigator();
const MainNavigation = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name={MainRoutes.Dashboard} component={Dashboard} />
      <MainStack.Screen name={MainRoutes.Settings} component={Settings} />
    </MainStack.Navigator>
  );
};

export default MainNavigation;
