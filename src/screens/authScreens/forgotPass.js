//react libarary and react-native components.
import React, { useContext } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity} from 'react-native';

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


const Validator = yup.object().shape({
    email: yup.string()
        .required('This field is required')
        .email('Invalid email address.'),
   

});

export default function Login({ navigation }) {

    const userInfo = {
        email: '',
       
    }

    const { resetPassword } = useContext(AuthContext);

    return (

        <Formik
            initialValues={userInfo}
            validationSchema={Validator}
            onSubmit={values => {
                const { email,} = values;
                resetPassword(email);
            }}
        >

            {({ values, handleChange, handleSubmit, handleBlur, touched, errors }) => {
                //console.log(values);
                const { email} = values;

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
                                    />

                                    {(errors.email && touched.email) &&

                                        <Text style={{ color: 'red', fontSize: 12 }}>{errors.email}</Text>

                                    }



                                    <Btn
                                        btnName='Submit'
                                        onPress={() => {handleSubmit(); navigation.goBack();}}
                                    />

                                    <Btn
                                        btnName='Login to your account'
                                        onPress={() => navigation.navigate('Login')}
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