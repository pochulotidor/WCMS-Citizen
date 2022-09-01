import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Modal, Pressable } from 'react-native';

import { globalStyles } from '../global/globalStyles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';




export default function ReportHistory() {

    const user = auth().currentUser;
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {

        const subscriber = firestore()
            .collection('citizen_reports')
            .where('reporter', '==', user.uid)
            //.orderBy('createdAt', )
            .onSnapshot(querySnapshot => {
                const reports = [];

                querySnapshot.forEach(documentSnapshot => {
                    reports.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setReports(reports);
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }







    return (

        <View>


            <FlatList
           
                data={reports}
                renderItem={({ item }) => (
                    <View style={globalStyles.container}>
                        <View
                            style={{ width: '100%', margin: 3, backgroundColor:'#F7F7F7' }}
                        >

                            <View
                                style={globalStyles.reportContainer}
                               
                            >
                                <Text
                                    style={globalStyles.reportText}
                                >
                                    Report ID: {item.key}</Text>
                                <Text
                                    style={globalStyles.reportText}
                                >
                                    Status: {item.complete? 'Collected' : 'Not Collected'}</Text>
                                <Text
                                    style={globalStyles.reportText}
                                >
                                    Latitude: {[item.loc.latitude]}, Longitude: {[item.loc.longitude]}</Text>
                                <Text
                                    style={globalStyles.reportText}
                                >
                                    Report time: {[item.reportTime.toDate().toDateString()]}</Text>
                            </View>




                        </View>


                    </View>
                )}
            />

        </View>

    );
}