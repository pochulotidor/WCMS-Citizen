import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { height, width } from '../utils/Dimensions';


export default function ReportBtns({ btnName, ...rest }) {

    return (
        <TouchableOpacity
            style={styles.button}
            {...rest}
        >
            <Text
            style={styles.text}
            >
                {btnName}
            </Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({

    button: {

        width: width / 2.5,
        height: height / 15,
        backgroundColor: '#4CB963',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:12,
        margin: 5

    },

    text: {
        fontSize: 15,
        fontWeight: '500',
        color: '#fff'
    }

})