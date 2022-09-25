import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPassword from './ForgotPasswordScreen';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
    return(
        <RootStack.Navigator headerMode='none' >
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="ForgotPassword" component={ForgotPassword}/>
       </RootStack.Navigator>
    );
}

export default RootStackScreen;