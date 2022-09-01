import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/profile';
import Edit from '../screens/editProfile';
import Upload from '../screens/uploadImage';

export default function homeStack() {

    const Stack = createStackNavigator();

    return (

        <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#4CB963' },
            }}
        >

            <Stack.Screen
                name='Profile'
                component={ProfileScreen}
            />

            <Stack.Screen
                name='Edit profile'
                component={Edit}
            />

            <Stack.Screen
                name='Set Image'
                component={Upload}
            />

        </Stack.Navigator>

    )
}
