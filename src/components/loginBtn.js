import React from 'react';
import {TouchableOpacity, StyleSheet, Text } from 'react-native';
import {height, width} from '../utils/Dimensions';

export default function Loginbtn({btnName, ...rest}){
    return(

        <TouchableOpacity
        style={styles.button}
        {...rest}
        >
            <Text
            style={styles.buttonText}
            >
                {btnName}
            </Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#4CB963',
        width: width / 2,
        height: height / 20,
        margin:6

    },

    buttonText: {
        color: '#fff',
        fontSize: 15
    }
})