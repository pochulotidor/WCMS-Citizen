//react libarary and react-native components.
import React, { useContext, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, } from 'react-native';

//global stylesheet
import { globalStyles } from '../../global/globalStyles';

//button components.
import Btn from '../../components/loginBtn';

//auth provider
import { AuthContext } from '../../firebase/authProvider';

//formik and yup for form validation. 
import { Formik } from 'formik'; //import formik component
import * as yup from 'yup'; // importing yup library.

import * as Animatable from 'react-native-animatable';
import FontAwesom5 from 'react-native-vector-icons/FontAwesome5';


const Validator = yup.object().shape({
    email: yup.string()
        .required('This field is required')
        .email('Invalid email address.'),
    password: yup.string()
        .required('This field is required')
        .min(6, 'The password is too short.'),

});

export default function Login({ navigation }) {

    const userInfo = {
        email: '',
        password: ''
    }

    const { login } = useContext(AuthContext);
    const [seePassword, setSeePassword] = useState(false)

    return (

        <Formik
            initialValues={userInfo}
            validationSchema={Validator}
            onSubmit={values => {
                const { email, password } = values;
                login(email, password);
            }}
        >

            {({ values, handleChange, handleSubmit, handleBlur, touched, errors }) => {
                //console.log(values);
                const { email, password } = values;

                return (

                    <Animatable.View
                        style={globalStyles.container}
                        animation='fadeInUpBig'
                    >
                        <View style={globalStyles.container}>
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
                                        Waste Collection Monitoring System
                                    </Text>
                                </View>



                                <TextInput
                                    style={globalStyles.lgInputz}
                                    placeholder='Email'
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                    value={email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
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
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setSeePassword(!seePassword)}
                                    >
                                        <FontAwesom5
                                            name={seePassword ? 'eye' : 'eye-slash'}
                                            size={16}
                                        />
                                    </TouchableOpacity>

                                </View>


                                {(errors.password && touched.password) &&

                                    <Text style={{ color: 'red', fontSize: 12 }}>{errors.password}</Text>

                                }


                                <TouchableOpacity>
                                    <Text
                                        style={{
                                            color: '#368547',
                                            fontSize: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#368547',
                                            margin: 10
                                        }}
                                        onPress={() => navigation.navigate('Forgot Password')}
                                    >
                                        Forgot password?
                                    </Text>
                                </TouchableOpacity>


                                <Btn
                                    btnName='Login'
                                    onPress={handleSubmit}
                                />

                                <Btn
                                    btnName='Register'
                                    onPress={() => navigation.navigate('Register')}
                                />


                            </React.Fragment>





                        </View>
                    </Animatable.View>



                )
            }

            }

        </Formik>


    )
}