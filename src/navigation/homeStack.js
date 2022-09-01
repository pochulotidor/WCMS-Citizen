import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/home';

export default function homeStack() {

    const Stack = createStackNavigator();

    return (

        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#4CB963' },
            }}
        >

            <Stack.Screen
                name='Home'
                component={Home}
            />

        </Stack.Navigator>

    )
}
