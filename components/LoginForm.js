import * as React from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';

const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#002f25'
    },
    header: {
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:15,
        backgroundColor:'#7c9c8c',
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#dce5e3'
    },
    logInButton:{
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
    logInText:{
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        color:'#fff'
    },
    logInTextHeader:{
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        color:'#fff',
        fontSize: 40,
    },
    fillContainer:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:100,
    }
});

export default class SignUpForm extends React.Component {
    state = {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };

    startLoading = () => this.setState({ isLoading: true });
    endLoading = () => this.setState({ isLoading: false });
    setError = errorMessage => this.setState({ errorMessage });
    clearError = () => this.setState({ errorMessage: null });

    handleChangeEmail = email => this.setState({ email });

    handleChangePassword = password => this.setState({ password });

    // Håndterer når bruger vil logge ind. laver en const med 2 variabler
    handleSubmit = async () => {
        const { email, password } = this.state;
        try {
            this.startLoading();
            this.clearError();
            const result = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(result);
            this.endLoading();
            this.setState({ isCompleted: true });
        } catch (error) {
            this.setError(error.message);
            this.endLoading();
        }
    };

    render = () => {
        const { errorMessage, email, password, isCompleted } = this.state;
        if (isCompleted) {
            return <Text>You are now logged in</Text>;
        }
        return (
            <View>
                <Text style={styles.fillContainer}></Text>
                <View style={styles.header}>
                <Text style={styles.logInTextHeader}>Login</Text>
                </View>
                <TextInput
                    placeholder="email"
                    value={email}
                    onChangeText={this.handleChangeEmail}
                    style={styles.inputField}
                />
                <TextInput
                    placeholder="password"
                    value={password}
                    onChangeText={this.handleChangePassword}
                    secureTextEntry
                    style={styles.inputField}
                />
                {errorMessage && (
                    <Text style={styles.error}>Error: {errorMessage}</Text>
                )}
                {this.renderButton()}
            </View>
        );
    };

    renderButton = () => {
        const { isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        return (
                <TouchableOpacity
                    style={styles.logInButton}
                    onPress={this.handleSubmit}
                    underlayColor='#fff'>
                    <Text style={styles.logInText}>Sign In!</Text>
                </TouchableOpacity>
            ) ;


    };
}
