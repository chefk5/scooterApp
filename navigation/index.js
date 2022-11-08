import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';

const RootNavigation = () => {
  const user = useAuth();

  return (
    <NavigationContainer>
      {user != null ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
