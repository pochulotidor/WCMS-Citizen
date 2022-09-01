import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,

                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password)
                    } catch (e) {
                        Alert.alert('Invalid email or password');
                        console.log(e);
                    }
                },

                register: async (email, password, fName, lName) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password)
                            .then(() => {
                                Alert.alert('Account successfully created.');
                                console.log('success');
                                //Once the user creation has happened successfully, we can add the currentUser into firestore
                                //with the appropriate details.
                                firestore().collection('user_Citizen').doc(auth().currentUser.uid)
                                    .set({
                                        firstName: fName,
                                        lastName: lName,
                                        email: email,
                                        createdAt: firestore.Timestamp.fromDate(new Date()),

                                    })
                                    //ensure we catch any errors at this stage to advise us if something does go wrong
                                    .catch(error => {
                                        console.log('Something went wrong with added user to firestore: ', error);

                                    })
                            })
                            //we need to catch the whole sign up process if it fails too.
                            .catch(error => {
                                Alert.alert('Invalid registration please try again.');
                                console.log('Something went wrong with sign up: ', error);
                            });
                    } catch (e) {
                        console.log(e);
                    }
                },

                logout: () => {
                    try {
                        auth().signOut();
                        Alert.alert('logged out.');
                    } catch (e) {
                        Alert.alert('logged out.');
                        console.log(e);
                    }
                },

                resetPassword: (email) => {
                    try {
                        auth().sendPasswordResetEmail(email);
                        Alert.alert('Password reset email sent!')
                    } catch (e) {
                        Alert.alert('Something went wrong!')
                    }
                }


            }}
        >
            {children}
        </AuthContext.Provider>
    )
}