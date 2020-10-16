import * as React from 'react';

import firebase from 'firebase';
import MapView, { Marker } from 'react-native-maps';
import {View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Image,
    Dimensions,
}
    from 'react-native';




const styles = StyleSheet.create({
    // Designer Logout knappen

    logOutScreenButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#002f25',
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#fff'
    },
    // Designer den Logout tekst som står inde i knappen
    logOutText:{
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        color:'#fff'
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding:25,
    },
    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        padding:75,

        flex: 1,

    },
    text: {
        fontSize: 42,
    },
    emailText:{
        padding:5,
        fontSize: 20,

    },
    loggedInWithText:{
        padding:5,
        fontSize: 20,
        fontWeight: 'bold',

    },

    otherText:{
        right: 25,
    },
    container2: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    fillContainer:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:50,
    },
    mapViewTextHeader:{
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        color:'#fff',
        fontSize: 40,
    },
    header: {
        marginRight:1,
        marginLeft:1,
        marginTop:5,
        paddingTop:5,
        paddingBottom:10,
        backgroundColor:'#7c9c8c',
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#dce5e3'
    },
    welcomeHeader: {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        color: '#002f25',
        fontSize: 40,
    },

});


export default class ProfileScreen extends React.Component {

    componentDidMount = () => {
        const { user } = firebase.auth();
        this.setState({ user });
    };

    // Handler som håndterer at en bruger logger ud
    handleLogOut = async () => {

        await firebase.auth().signOut();
    };

    render() {
        const { user } = this.props;
        // Håndterer hvis der ikke er logget nogen bruger ind og rertunerner null
        if (!user) {
            return null;
        }
        return (
            <ScrollView>
            <View style={styles.container}>
                    <Image source={{uri: 'https://cache.nichehuset.dk/annoncer/jobannoncer/images/annoncoerer/logoer_thumbnails/319/743.png'}}
                           style={{width: 200, height: 177}} />
                <Text style={styles.welcomeHeader}>Miljøstyrelsen</Text>
                    <Text style={styles.emailText}>You are logged in as:</Text>

                <Text style={styles.loggedInWithText}>{user.email}</Text>

                    <ScrollView style={styles.scrollView}>
                    <Text style={styles.otherText}>
                        You have 3 recently accquired achievements (badges)!
                    </Text>
                        <Image source={{uri: 'https://images.vexels.com/media/users/3/137591/isolated/lists/6b1c28ded2a1a4c3b8c971ac95648ea7-fishing-fish-animal.png'}}
                               style={{width: 200, height: 177, right:30}} />
                        <Image source={{uri: 'https://img2.pngio.com/animal-creative-dog-pet-shape-wolf-icon-2854-free-icons-wolf-logos-png-256_256.png'}}
                               style={{width: 200, height: 177, right:30}} />
                        <Image source={{uri: 'https://images.vexels.com/media/users/3/198912/isolated/lists/20c329a21dd73d43112db9a9e85aa463-mandala-ant-head-blue.png'}}
                               style={{width: 200, height: 177, right:30}} />
                        <Image source={{uri: ''}}
                               style={{width: 200, height: 40, right:30}} />

                    </ScrollView>


                <View>
                    <Text style={styles.fillContainer}></Text>
                    <View style={styles.header}>
                        <Text style={styles.mapViewTextHeader}>Animal Safari</Text>
                    </View>
                </View>


                <View style={styles.container}>
                    <MapView style={styles.mapStyle} />
                </View>

                <View>
                    <TouchableOpacity
                        style={styles.logOutScreenButton}
                        onPress={this.handleLogOut}
                        underlayColor='#fff'>
                        <Text style={styles.logOutText}>Log out!</Text>
                    </TouchableOpacity>
                </View>
            </View>

            </ScrollView>


        );
    }
}
