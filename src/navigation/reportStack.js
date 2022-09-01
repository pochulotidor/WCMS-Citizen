import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ReportScreen from '../screens/reportScreen';
import Report from '../screens/report';
import His from '../screens/reportHistory';
import RImg from '../screens/reportImage';

export default function ReportStack() {

    const Stack = createStackNavigator();

    return (

        <Stack.Navigator
            initialRouteName="Reports"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#4CB963' },
            }}
        >

            <Stack.Screen
                name='Reports'
                component={ReportScreen}
            />

            <Stack.Screen
                name='Report Location'
                component={Report}
            />

            <Stack.Screen
                name='Report History'
                component={His}
            />

            <Stack.Screen
                name='Submit Image'
                component={RImg}
            />


        </Stack.Navigator>

    )
}
