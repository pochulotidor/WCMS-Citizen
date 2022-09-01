import React from 'react';
import { View, Text, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { globalStyles } from '../../global/globalStyles';

export default function Splash({navigation}) {
    setTimeout(() => {
        navigation.replace('Login');
    }, 3000
    );
    return (
        <View
            style={globalStyles.container}
        >

            <Animatable.View
                style={globalStyles.splashImgContainer}
                animation='bounceIn'
            >

                <Image
                    style={globalStyles.splashImg}
                    source={require('../../assets/logoG.png')}
                    resizeMode='stretch'
                />

                <Text
                    style={globalStyles.splashText}
                >
                    Waste Collection Monitoring System
                </Text>

            </Animatable.View>

        </View>
    )
}