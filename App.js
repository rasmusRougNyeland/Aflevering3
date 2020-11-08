import React,{Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import UserScreen from './components/UserScreen';
import firebase from 'firebase';
import LoginForm from "./components/LoginForm";
import ProfileScreen from "./components/ProfileScreen";
import CameraView from "./components/CameraView";

import { Card } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import MapViewLocation from "./components/MapViewLocation";
import {Camera} from "expo/build/removed.web";
// Laver en stacknavigator og tilføjer Userscreen
const StackNavigator = createStackNavigator(
    {
        UserScreen:{screen: UserScreen},
    },
    {initialRouteKey:'UserScreen'}
);
// Laver en bottom tab navigator
const TabNavigator = createBottomTabNavigator({
    Main:{screen: StackNavigator,
        navigationOptions: {
            tabBarLabel:"Sign Up",
            //AntDesign bruges til at skabe iconer på siden
            tabBarIcon: ({tintColor}) => (
                <AntDesign name={"user"} size={30} color={{tintColor}}/>
            )
        },
    },
    //// HER KAN VI TILFØJE FLERE SKÆRME

    // Tilføjer login skærm
    add:{screen: LoginForm,
        navigationOptions: {
            tabBarLabel:"Login",
            tabBarIcon: ({tintColor}) => (
                <AntDesign name={"lock"} size={30} color={{tintColor}}/>
            )
        },
    },
    // Tilføjer MapView med lokationsfunktionalitetsskærm
    add1:{screen: MapViewLocation,
        navigationOptions: {
            tabBarLabel:"MapView",
            tabBarIcon: ({tintColor}) => (
                <AntDesign name={"settings"} size={30} color={{tintColor}}/>
            )
        },
    },
    // Tilføjer Et imagepicker view
    add2:{screen: CameraView,
        navigationOptions: {
            tabBarLabel:"CameraView",
            tabBarIcon: ({tintColor}) => (
                <AntDesign name={"camera"} size={30} color={{tintColor}}/>
            )
        },
    },


});
// Indsætter TabNavigatoren i en appcontainer.
const AppContainer = createAppContainer(TabNavigator);

export default class App extends Component {
    state = {user:null}

    componentDidMount(){
        const fireBaseConfig ={
// Indsat fra min firebase konto
            apiKey: "AIzaSyAEZjV93dHfJPgxwDz215vmVh2dAGW_-dU",
            authDomain: "ovelse5-d8d16.firebaseapp.com",
            databaseURL: "https://ovelse5-d8d16.firebaseio.com",
            projectId: "ovelse5-d8d16",
            storageBucket: "ovelse5-d8d16.appspot.com",
            messagingSenderId: "547045711478",
            appId: "1:547045711478:web:a2a746528961507e7a8957",
            measurementId: "G-C771WBY91M"
        }
        //Initialiserer firebaseBaseConfig
        if (!firebase.apps.length) {
            firebase.initializeApp(fireBaseConfig);
        }


        //validerer brugeren og sætter state til den hentede bruger
        firebase.auth().onAuthStateChanged(user => {
                this.setState({ user });
            });
    }


    render() {
        const {user} = this.state

        if(!user){
    // Hvis brugeren ikke findes returnere vi appcontaineren, som indeholder loginForm, UserScreen og MapViewLocation
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



