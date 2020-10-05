import * as React from 'react';

import firebase from 'firebase';

import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';



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
    }

});


export default class ProfileScreen extends React.Component {

    componentDidMount = () => {
        const { user } = firebase.auth();
        this.setState({ user });
    };


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
            <View>
                <Text>Current user: {user.email}</Text>

                <TouchableOpacity
                    style={styles.logOutScreenButton}
                    onPress={this.handleLogOut}
                    underlayColor='#fff'>
                    <Text style={styles.logOutText}>Log out!</Text>
                </TouchableOpacity>

            </View>


        );
    }
}
