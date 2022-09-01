import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../navigation/homeStack';
import ReportStack from '../navigation/reportStack';
import ProfileStack from '../navigation/profileStack';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function AppNav() {

    const Tab = createMaterialBottomTabNavigator();

    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name == 'Home Screen') {
                        iconName = 'home'
                        size = focused ? 21 : 17
                    }
                    else if (route.name == 'Report') {
                        iconName = 'record-vinyl'
                        size = focused ? 21 : 17
                    } else if (route.name == 'Profile screen') {
                        iconName = 'user-alt'
                        size = focused ? 21 : 17
                    } 

                    return (
                        <FontAwesome5
                            size={size}
                            name={iconName}
                            color={color}
                        />
                    )

                }
            })}
            activeColor='#fff'
            inactiveColor='#fff'
            barStyle={{ backgroundColor: '#4CB963' }}

        >

            <Tab.Screen
                name='Home Screen'
                component={Home}
                options={{
                    title: 'Home'
                }}
            />

            <Tab.Screen
                name='Report'
                component={ReportStack}
            />

            <Tab.Screen
                name='Profile screen'
                component={ProfileStack}
                options={{
                    title: 'Profile'
                }}
            />

        </Tab.Navigator>

    )

}