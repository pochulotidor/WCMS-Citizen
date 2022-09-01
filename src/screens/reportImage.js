import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { globalStyles } from '../global/globalStyles';
import * as ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


export default function ReportImage({ route }) {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const { location, reporter } = route.params;


    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 480,
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

    useEffect(() => {
        setPhoto()
    }, []);

    const submitReport = async () => {



        const imageUrl = await setPhoto();

        firestore()
            .collection('citizen_reports')
            .add({

                loc: location,
                reportTime: firestore.Timestamp.fromDate(new Date()),
                complete: false,
                reporter: reporter,
                img: imageUrl
            })
            .then(() => {
                console.log('Report Submitted!');
                Alert.alert(
                    'Report Submitted!',
                );
                setImage(null)
            })
            .catch((error) => {
                console.log('Something went wrong with added post to firestore.', error);
                Alert.alert(
                    'Something went wrong please try again.',
                );
            });

    }




    return (

        <View
            style={globalStyles.container}
        >

            <Text
                style={{ fontSize: 20, fontWeight: 'bold' }}
            >
                Take a photo of the garbage
            </Text>

            <View
                style={styles.imageHolder}
            >

                {
                    image != null ?
                        <Image
                            style={styles.imageHolder}
                            source={{ uri: image }}
                            resizeMode='stretch'
                        />

                        : null
                }


            </View>



            <Text>
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
                    ) : <TouchableOpacity
                        onPress={image ? submitReport : takePhotoFromCamera}
                        style={styles.btn}
                    >

                        <Text
                            style={{ fontSize: 15, color: '#fff' }}
                        >
                            {image ? 'Upload' : 'Take a Photo'}
                        </Text>
                    </TouchableOpacity>

                }
            </Text>

        </View>

    )
}

const styles = StyleSheet.create({

    imageHolder: {
        width: '100%',
        height: '70%',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btn: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CB963',
        borderRadius: 12,
        marginTop: 5
    },

})