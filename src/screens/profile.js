import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import { globalStyles } from '../global/globalStyles';
import { AuthContext } from '../firebase/authProvider';
import Button from '../components/loginBtn';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Profile({ navigation }) {
    const { logout } = useContext(AuthContext);
    const [user, setUser] = useState();
    const { uid } = auth().currentUser;
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const subscriber = firestore()
            .collection('user_Citizen')
            .doc(uid)
            .onSnapshot(documentSnapshot => {
                const userData = documentSnapshot.data();



                setUser(userData);
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();

    }, []);


    if (loading) {
        return (
            <View
                style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
            >
                <ActivityIndicator size="large" color="#4CB963" />
            </View>
        )
    }


    return (

        <ScrollView
            style={{ flex: 1, backgroundColor: '#fff', }}


        >


            <View
                style={styles.header}
            >
                <View
                    style={{ width: '100%', height: '100%', backgroundColor: '#4CB963', flex: 1, justifyContent: 'center', alignItems: 'center' }}
                >
                    <View
                        style={styles.imageHolder}
                    >

                        <Image
                            style={styles.imageHolder}
                            source={{ uri: user && user.profiletImg }}

                        />


                    </View>
                    <View
                        style={{ width: 100, height: 30, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginVertical: 5 }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Set Image')}
                        >

                            <Text>
                                Upload Image
                            </Text>

                        </TouchableOpacity>
                    </View>

                </View>

                <View
                    style={{ width: '100%', height: '100%', backgroundColor: '#4CB963', flex: 2, justifyContent: 'center' }}
                >

                    <Text
                        style={styles.headerText}
                    >
                        {user && user?.firstName} {user && user?.lastName}
                    </Text>

                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#ffffff',
                            marginLeft: 8

                        }}
                    >
                        {user && user?.email}

                    </Text>

                </View>



            </View>
            <View
                style={{
                    width: '100%',
                    height: 300,
                    backgroundColor: '#ffffff',
                    marginVertical: 5
                }}
            >
                <View
                    style={{
                        width: '100%',
                        height: 70,
                        alignItems: 'center',
                        flexDirection: 'row'

                    }}
                >

                    <FontAwesome5
                        style={{
                            marginLeft: 8
                        }}
                        name='id-card'
                        size={18}
                        color={'#171717'}
                    />

                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#171717',
                            marginLeft: 5
                        }}
                    >

                        User ID: {uid}

                    </Text>

                </View>

                <View
                    style={{
                        width: '100%',
                        height: 70,
                        alignItems: 'center',
                        flexDirection: 'row'

                    }}
                >

                    <FontAwesome5
                        style={{
                            marginLeft: 8
                        }}
                        name='envelope'
                        size={18}
                        color={'#171717'}
                    />

                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#171717',
                            marginLeft: 10
                        }}
                    >

                        Email: {user && user?.email}

                    </Text>

                </View>

                <View
                    style={{
                        width: '100%',
                        height: 70,
                        alignItems: 'center',
                        flexDirection: 'row'

                    }}
                >

                    <FontAwesome5
                        style={{
                            marginLeft: 8
                        }}
                        name='trash'
                        color={'#171717'}
                        size={18}
                    />

                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#171717',
                            marginLeft: 10
                        }}
                    >

                        Member since: {user && user?.createdAt.toDate().toDateString()}

                    </Text>

                </View>

                <View
                    style={{
                        width: '100%',
                        height: 70,
                        justifyContent: 'center'

                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >

                        <FontAwesome5
                            style={{
                                marginLeft: 8
                            }}
                            name='map-marked-alt'
                            size={18}
                            color={'#171717'}
                        />

                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#171717',
                                marginLeft: 10
                            }}
                        >

                            Address (optional): 

                        </Text>

                    </View>

                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#171717',
                            marginLeft: 8,
                        }}
                    >
                        {user && user?.address}
                    </Text>


                </View>



            </View>
            <View
                style={globalStyles.container}
            >


                <Button

                    btnName='Edit my details'
                    onPress={() => navigation.navigate('Edit profile')}
                />

                <Button
                    onPress={logout}
                    btnName='Logout'
                />
            </View>



        </ScrollView>
    )
}

const styles = StyleSheet.create({

    header: {

        width: '100%',
        height: 200,
        backgroundColor: '#4CB963',
        borderTopWidth: 1,
        borderTopColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    imageHolder: {
        width: 120,
        height: 120,
        borderRadius: 180,
        backgroundColor: '#fff',

    },

    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 8
    }

})