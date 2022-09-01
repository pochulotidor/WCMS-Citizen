import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/authScreens/login';
import Splash from '../screens/authScreens/splash';
import Register from '../screens/authScreens/register';
import Forgot from '../screens/authScreens/forgotPass';

export default function AuthStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >

            <Stack.Screen
                name='Splash'
                component={Splash}
            />

            <Stack.Screen
                name='Login'
                component={Login}
            />

            <Stack.Screen
                name='Forgot Password'
                component={Forgot}
            />

            <Stack.Screen
                name='Register'
                component={Register}
            />


        </Stack.Navigator>
    )
}