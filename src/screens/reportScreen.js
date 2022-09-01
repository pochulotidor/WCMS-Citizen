import React from "react";
import { View, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

import { globalStyles } from "../global/globalStyles";

const { height, width } = Dimensions.get('window');


export default function ReportScreen({ navigation }) {
    return (
        <View
            style={globalStyles.container}
        >

            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate('Report Location')}
                >

                    <FontAwesome5Icons
                        name='map-marked'
                        size={20}
                        color={'#ffffff'}
                    />
                    <Text
                    style={styles.btnText}
                    >
                        Report Location
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate('Report History')}
                >

                    <FontAwesome5Icons
                        name='history'
                        size={20}
                        color={'#ffffff'}
                    />

                    <Text
                    style={styles.btnText}
                    >
                        My report history
                    </Text>


                </TouchableOpacity>



            </View>




        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        height: height / 6,
        width: width / 2.5,
        backgroundColor: '#4CB963',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 5
    },

    btnText: {
        fontSize: 15,
        color: '#ffffff',
        marginLeft: 5,
        fontWeight: 'bold'
    }
})