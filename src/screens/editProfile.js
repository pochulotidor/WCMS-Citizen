import React, { useEffect } from 'react';
import { View, Image, Text, TextInput, Alert} from 'react-native';
import { globalStyles } from '../global/globalStyles';
import Btn from '../components/loginBtn';
import firestore from '@react-native-firebase/firestore';

import { Formik } from 'formik';
import * as  yup from 'yup';

import auth from '@react-native-firebase/auth';




const Validator = yup.object().shape({


    fName: yup.string()
        .required('First name is required'),
    lName: yup.string()
        .required('Last name is required'),
    address: yup.string()
        .required('First name is required'),

});

export default function EditProfile({ navigation }) {


    const { uid } = auth().currentUser;


    const Update = async (fName, lName, address) => {

        firestore()
            .collection('user_Citizen')
            .doc(uid)
            .update({
                firstName: fName,
                lastName: lName,
                address: address


            })

            .then(() => {
                console.log('updated!');
                Alert.alert('Successfully updated your profile.');
            })

            .catch((error) => {
                console.log('Something went wrong with added post to firestore.', error);
                Alert.alert(
                    'Something went wrong please try again.',
                );
            });

    }

 
    const userInfo = {
        address: '',
        fName: '',
        lName: ''

    }


    return (
        <Formik
            initialValues={userInfo}
            validationSchema={Validator}
            onSubmit={values => {
                const {lName, fName, address } = values;
                Update(fName, lName, address);
            }}

        >
            {({ values, handleChange, handleSubmit, handleBlur, touched, errors, isValid }) => {
                console.log(values);
                const { fName, lName, address } = values;


                return (


                    <View
                        style={globalStyles.container}

                    >


                        <View
                            style={globalStyles.container}
                        >
                            <React.Fragment>

                                <View
                                    style={{ alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Text
                                        style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 8 }}
                                    >
                                        Personal Information
                                    </Text>

                                    <TextInput
                                        style={globalStyles.lgInputz}
                                        placeholder='First name'
                                        value={fName}
                                        onBlur={handleBlur('fName')}
                                        onChangeText={handleChange('fName')}

                                    />

                                    {(errors.fName && touched.fName) &&

                                        <Text style={{ color: 'red', fontSize: 12 }}>{errors.fName}</Text>

                                    }

                                    <TextInput
                                        style={globalStyles.lgInputz}
                                        placeholder='Last name'
                                        value={lName}
                                        onBlur={handleBlur('lName')}
                                        onChangeText={handleChange('lName')}

                                    />

                                    {(errors.fName && touched.fName) &&

                                        <Text style={{ color: 'red', fontSize: 12 }}>{errors.lName}</Text>

                                    }


                                    <TextInput
                                        style={globalStyles.lgInputz}
                                        placeholder='Address'
                                        value={address}
                                        onBlur={handleBlur('address')}
                                        onChangeText={handleChange('address')}

                                    />

                                    {(errors.email && touched.email) &&

                                        <Text style={{ color: 'red', fontSize: 12 }}>{errors.address}</Text>

                                    }

                                    <Btn
                                        btnName='Submit'
                                        onPress={() => { handleSubmit(); navigation.goBack(); }}
                                        disabled={!isValid}
                                    />



                                </View>

                            </React.Fragment>
                        </View>

                    </View>
                )
            }

            }

        </Formik>
    )




}