import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    map: {

        width: '100%',
        height: '70%',


    },

    mapBtnContainer: {

        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'


    },

    lgImage: {
        height: 90,
        width: 90
    },

    lgText: {
        textAlign: 'center',
        color: '#4CB963',
        fontSize: 19,
        margin: 10
    },

    lgInputz: {
        color: '#000',
        borderBottomColor: '#4CB963',
        width: 300,
        height: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        margin: 5
    },

    splashImgContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },

    splashImg: {
        width: 115,
        height: 115
    },

    splashText: {
        fontSize: 16,
        color: '#4CB963',
        textAlign: 'center',
        margin: 2
    },

    notifContainer: {
        flex: 1,
        backgroundColor: '#DDDDDD',
        alignItems: 'center',
        justifyContent: 'center'

    },

    ///////Modal/////
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    modalView: {
        width: '90%',
        height: 250,
        margin: 20,
        backgroundColor: '#4CB963',
        borderRadius: 20,
        alignItems: "center",
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#4CB963'

    },

    modalText: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 15,
        color: '#fff'
    },

    button: {
        borderRadius: 20,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },

    buttonClose: {
        backgroundColor: "#BD1616",
    },
    ////////END////////

    //////Report////
    reportText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#191919',

    },

    reportContainer: {
        width: '100%',
        height: height / 7,
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin: 3,
    },
    ///////END//////

    //////Homescreen/////

    reportCard: {
        width: '100%',
        height: 450,
        borderRadius: 15,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderTopWidth: 0.3
    },

    cardHeader: {
        height: '15%',
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        justifyContent: 'center'
    },

    cardFooter: {
        width: '100%',
        height: '15%',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'center'
    },

    cardText: {
        fontSize: 15,
        color: '#232323',
        marginLeft: 8,
        fontWeight: 'bold'
    }



})