import React,{Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import UserScreen from './components/UserScreen';
import firebase from 'firebase';
import LoginForm from "./components/LoginForm";
import ProfileScreen from "./components/ProfileScreen";

import { Card } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';

const StackNavigator = createStackNavigator(
    {
        UserScreen:{screen: UserScreen},
    },
    {initialRouteKey:'UserScreen'}
);

const TabNavigator = createBottomTabNavigator({
    Main:{screen: StackNavigator,
        navigationOptions: {
            tabBarLabel:"Sign Up",
            tabBarIcon: ({tintColor}) => (
                <AntDesign name={"user"} size={30} color={{tintColor}}/>
            )
        },
    },
    //// HER KAN VI TILFØJE FLERE SKÆRME
    add:{screen: LoginForm,
        navigationOptions: {
            tabBarLabel:"Login",
            tabBarIcon: ({tintColor}) => (
                <AntDesign name={"lock"} size={30} color={{tintColor}}/>
            )
        },
    },

});

const AppContainer = createAppContainer(TabNavigator);

export default class App extends Component {
    state = {user:null}

    componentDidMount(){
        const fireBaseConfig ={

            apiKey: "AIzaSyAEZjV93dHfJPgxwDz215vmVh2dAGW_-dU",
            authDomain: "ovelse5-d8d16.firebaseapp.com",
            databaseURL: "https://ovelse5-d8d16.firebaseio.com",
            projectId: "ovelse5-d8d16",
            storageBucket: "ovelse5-d8d16.appspot.com",
            messagingSenderId: "547045711478",
            appId: "1:547045711478:web:a2a746528961507e7a8957",
            measurementId: "G-C771WBY91M"
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(fireBaseConfig);
        }



        firebase.auth().onAuthStateChanged(user => {
                this.setState({ user });
            });
    }


    render() {
        const {user} = this.state

        if(!user){

            return (
                <AppContainer/>
            )
        } else {
            return (
                // Hvis credentials matcher sender vi brugeren til profilescreen
                <ProfileScreen user={user}/>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
