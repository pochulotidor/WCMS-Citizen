import React, { useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { globalStyles } from '../global/globalStyles';
import * as ImagePicker from 'react-native-image-crop-picker';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function UploadImage() {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [picture, setPicture] = useState(null);
    const { uid } = auth().currentUser;

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


    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
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


        const imageUrl = await uploadImage();

        firestore()
            .collection('user_Citizen')
            .doc(uid)
            .update({
                profiletImg: imageUrl,
            })
            .then(() => {
                Alert.alert(
                    'Photo updated!',
                    'Your photo has been updated Successfully!',
                );
                setPicture(null);
            })
            .catch((error) => {
                Alert.alert('Something went wrong, please try agin.')
                console.log('Something went wrong with added post to firestore.', error);
            });


    }

  


    const uploadImage = async () => {
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

        const storageRef = storage().ref(`photos/${filename}`);
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

    return (

        <View
            style={globalStyles.container}
        >
            <View
                style={styles.imageHolder}
            >
                {image != null ? <Image source={{ uri: image }} style={styles.imageHolder}

                /> : null}

            </View>

            {uploading ? (
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
                    disabled={image != null ? false : true}
                    onPress={setPhoto}
                >

                    <View
                        style={styles.cam}
                    >
                        <Text>
                            Upload Photo
                        </Text>

                    </View>

                </TouchableOpacity>

            }

            <ActionButton buttonColor="#4CB963">

                <ActionButton.Item buttonColor='#3498db' title="Take photo" onPress={takePhotoFromCamera}>
                    <Icon name="camera-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title="Choose from library" onPress={choosePhotoFromLibrary}>
                    <Icon name="md-images-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>

        </View>
    )
}

const styles = StyleSheet.create({

    imageHolder: {
        width: 200,
        height: 200,
        borderRadius: 180,
        backgroundColor: 'gray'
    },

    cam: {
        width: 200,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#4CB963',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },

    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})