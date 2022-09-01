import React, { useContext, useState } from 'react';
import { View, Image, Text, TextInput, ScrollView } from 'react-native';
import { AuthContext } from '../../firebase/authProvider';

import * as Animatable from 'react-native-animatable';
import { globalStyles } from '../../global/globalStyles';
import Btn from '../../components/loginBtn';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import { Formik } from 'formik';
import * as  yup from 'yup';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Validator = yup.object().shape({
    email: yup.string()
        .required('Email is required')
        .email('Invalid Email address'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'The password is too short'),
    fName: yup.string()
        .required('First name is required'),
    lName: yup.string()
        .required('Last name is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match')
        .required('Confirm password is required'),

});

export default function Register({ navigation }) {

    const userInfo = {
        email: '',
        password: '',
        confirmPassword: '',
        fName: '',
        lName: ''

    }

    const { register } = useContext(AuthContext);
    const [seePassword, setSeePassword] = useState(false);
    const [seePasswordC, setSeePasswordC] = useState(false);

    return (
        <Formik
            initialValues={userInfo}
            validationSchema={Validator}
            onSubmit={values => {
                const { email, password, lName, fName, } = values;
                register(email, password, fName, lName);
            }}

        >
            {({ values, handleChange, handleSubmit, handleBlur, touched, errors, isValid }) => {
                //console.log(values);
                const { email, password, fName, confirmPassword, lName } = values;


                return (
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    >
                        <Animatable.View
                            style={globalStyles.container}
                            animation='fadeInUpBig'
                        >
                            <View
                                style={globalStyles.container}
                            >
                                <React.Fragment>

                                    <View
                                        style={{ alignItems: 'center', justifyContent: 'center' }}
                                    >

                                        <Image
                                            style={globalStyles.lgImage}
                                            source={require('../../assets/logoW.png')}
                                        />

                                        <Text
                                            style={globalStyles.lgText}
                                        >
                                            Register
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
                                            placeholder='Email'
                                            autoCapitalize='none'
                                            keyboardType='email-address'
                                            value={email}
                                            onBlur={handleBlur('email')}
                                            onChangeText={handleChange('email')}

                                        />

                                        {(errors.email && touched.email) &&

                                            <Text style={{ color: 'red', fontSize: 12 }}>{errors.email}</Text>

                                        }


                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginLeft: 15
                                            }}
                                        >

                                            <TextInput
                                                style={globalStyles.lgInputz}
                                                placeholder='Password'
                                                autoCapitalize='none'
                                                secureTextEntry={seePassword ? false : true}
                                                value={password}
                                                onBlur={handleBlur('password')}
                                                onChangeText={handleChange('password')}

                                            />

                                            <TouchableOpacity
                                                onPress={() => setSeePassword(!seePassword)}
                                            >
                                                <FontAwesome5Icon
                                                    name={seePassword ? 'eye' : 'eye-slash'}
                                                    size={16}
                                                />
                                            </TouchableOpacity>
                                        </View>


                                        {(errors.password && touched.password) &&

                                            <Text style={{ color: 'red', fontSize: 12 }}>{errors.password}</Text>

                                        }


                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginLeft: 15
                                            }}
                                        >

                                            <TextInput
                                                style={globalStyles.lgInputz}
                                                placeholder='Confirm Password'
                                                autoCapitalize='none'
                                                secureTextEntry={seePasswordC ? false : true}
                                                value={confirmPassword}
                                                onBlur={handleBlur('confirmPassword')}
                                                onChangeText={handleChange('confirmPassword')}

                                            />

                                            <TouchableOpacity
                                                onPress={() => setSeePasswordC(!seePasswordC)}
                                            >
                                                <FontAwesome5Icon
                                                    name={seePasswordC ? 'eye' : 'eye-slash'}
                                                    size={16}
                                                />
                                            </TouchableOpacity>
                                        </View>


                                        
                                        {(errors.confirmPassword && touched.confirmPassword) &&

                                            <Text style={{ color: 'red', fontSize: 12 }}>{errors.confirmPassword}</Text>

                                        }

                                        <Btn
                                            btnName='Submit'
                                            onPress={handleSubmit}
                                            disabled={!isValid}
                                        />

                                        <Btn
                                            btnName='back'
                                            onPress={() => navigation.navigate('Login')}
                                        />

                                    </View>

                                </React.Fragment>
                            </View>

                        </Animatable.View>
                    </ScrollView>

                )
            }

            }

        </Formik>
    )




}