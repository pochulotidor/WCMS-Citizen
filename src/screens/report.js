import React, { useState, useEffect } from 'react';
import { View, Text, Platform, TouchableOpacity, Alert, StyleSheet, Modal, Image, ActivityIndicator, Dimensions } from 'react-native';
import { globalStyles } from '../global/globalStyles';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";//

import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


import { customStyleMap } from '../global/index';

import Geolocation, { getCurrentPosition } from "react-native-geolocation-service" // 👈

import * as ImagePicker from 'react-native-image-crop-picker';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';



const { height, width } = Dimensions.get('window');


export default function Report({ navigation }) {


    const citizen = auth().currentUser;
    const [location, setLocation] = useState(null);
    const [modalVisible, setModalVissible] = useState(false);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);




    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 500,
            cropping: true,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        });
    };


    const setPhoto = async () => {
        if (image == null) {
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true);
        setTransferred(0);

        const storageRef = storage().ref(`citizenReports/${filename}`);
        const task = storageRef.putFile(uploadUri);

        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );

            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });

        try {
            await task;

            const url = await storageRef.getDownloadURL();

            setUploading(false);
            setImage(null);

            Alert.alert('Image uploaded!',);
            return url;

        } catch (e) {
            console.log(e);
            return null;
        }

    };


    const submitReport = async () => {

        const imageUrl = await setPhoto();

        firestore()
            .collection('citizen_reports')
            .add({

                loc: location,
                reportTime: firestore.Timestamp.fromDate(new Date()),
                complete: false,
                reporter: citizen.uid,
                img: imageUrl
            })
            .then(() => {
                console.log('Report Submitted!');
                Alert.alert(
                    'Report Submitted!',
                );
            })
            .catch((error) => {
                console.log('Something went wrong with added post to firestore.', error);
                Alert.alert(
                    'Something went wrong please try again.',
                );
            });

    }




    const handlePermission = async () => {

        let permissionCheck = '';

        if (Platform.OS == 'android') {
            permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if (
                permissionCheck === RESULTS.BLOCKED ||
                permissionCheck === RESULTS.DENIED
            ) {
                const permissionRequest = await request(
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                );
                permissionRequest === RESULTS.GRANTED
                    ? console.warn('Location permission granted.')
                    : console.warn('location permission denied.');
            }
        }

    };

    useEffect(() => {
        handlePermission()
    }, [])

    useEffect(() => { // 👈
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords
                setLocation({ latitude, longitude })
                console.log(latitude, longitude)
            },
            error => {
                console.log(error.code, error.message)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    }, [])



    return (
        <View style={globalStyles.container}>


            {location && (
                <MapView
                    customMapStyle={customStyleMap}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    maxZoomLevel={17.5} // 👈
                    loadingEnabled={true} // 👈
                    paddingAdjustmentBehavior="automatic"
                    loadingIndicatorColor="#fff" // 👈
                    loadingBackgroundColor="#4CB963" // 👈
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}

                    showsUserLocation={true}
                    showsMyLocationButton={true}


                >

                    <Marker
                    coordinate={{latitude: location.latitude, longitude: location.longitude}}
                    onPress={() => navigation.navigate('Submit Image', {location: location, reporter: citizen.uid })}
                    />



                    </MapView>

            )}


            <Modal

                animationType="fade"
                transparent
                visible={modalVisible}
                hardwareAccelerated
                onRequestClose={() => {

                    setModalVissible(!modalVisible);


                }}
            >
                <View
                    style={globalStyles.centeredView}
                >

                    <View
                        style={{ width: '90%', height: '80%', backgroundColor: '#fff', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ActionButton buttonColor="#4CB963">

                            <ActionButton.Item buttonColor="#4CB963" title="Take photo" onPress={takePhotoFromCamera}>
                                <Icon name="camera-outline" style={styles.actionButtonIcon} />
                            </ActionButton.Item>

                        </ActionButton>

                        <Text
                            style={{
                            fontSize: 18
                        }}
                        >
                            Take a Photo of the garbage
                        </Text>

                        <View
                            style={{
                                width: '90%',
                                height: '50%',
                                marginBottom: 5,
                                justifyContent: 'center'

                            }}
                        >
                            {image != null ?
                                <Image
                                    style={{
                                        width: '100%',
                                        height: '70%',
                                        marginBottom: 5,

                                    }}
                                    resizeMode='stretch'
                                    source={{ uri: image }}

                                /> : null}


                        </View>

                        <View>

                            {uploading ?

                                (
                                    <View
                                        style={{ alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Text>
                                            {transferred} % Completed!
                                        </Text>
                                        <ActivityIndicator size="large" color="#4CB963" />
                                    </View>
                                ) :

                                <TouchableOpacity
                                    style={{ width: 150, height: 50, backgroundColor: "#4CB963", borderRadius: 12, alignItems: 'center', justifyContent: 'center', margin: 5 }}
                                    disabled={image != null ? false : true}
                                    onPress={() => { submitReport(); }}
                                >
                                    <Text>
                                        Upload
                                    </Text>
                                </TouchableOpacity>

                            }



                            <TouchableOpacity
                                style={{ width: 150, height: 50, backgroundColor: 'red', borderRadius: 12, alignItems: 'center', justifyContent: 'center', margin: 5 }}
                                onPress={() => { setModalVissible(!modalVisible); setImage(null) }}
                            >
                                <Text>
                                    Close
                                </Text>
                            </TouchableOpacity>
                        </View>



                    </View>
                </View>

            </Modal>




        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },

    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})