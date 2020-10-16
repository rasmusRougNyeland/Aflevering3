import * as React from 'react';
import {Button,Text,
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
    SignUpButton:{
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
    SignUpText:{
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        color:'#fff'
    },
    fillContainer:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:50,
    },
    signUpTextHeader:{
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        color:'#fff',
        fontSize: 40,
    },

});

export default class UserScreen extends React.Component {
    state = {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };
    // IsLoading sættes til true
    startLoading = () => this.setState({ isLoading: true });
    // For at stoppe loading sættes isLoading til false
    endLoading = () => this.setState({ isLoading: false });
    // Denne metode er til at vise fejlbeskeden
    setError = errorMessage => this.setState({ errorMessage });
    // Fjerner errorbeskeden da den sættes til null
    clearError = () => this.setState({ errorMessage: null });
    // Handler som sætter state til email som vi oprettede i starten
    handleChangeEmail = email => this.setState({ email });
    // Handler som sætter state til password som jeg oprettede i starten
    handleChangePassword = password => this.setState({ password });
// Håndterer sign up ved at oprette  const email & password og bruger .auth() til at tjekker om brugeren ligger i firebase databasen
    // Hvis ikke oprettes de i databasen
    // Hvis der sker en fejl catches den og printes ud for brugeren nede i render(<View>)
    handleSubmit = async () => {
        const { email, password } = this.state;
        try {
            this.startLoading();
            this.clearError();
            const result = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            console.log(result);
            this.endLoading();
            this.setState({ isCompleted: true });
        } catch (error) {

            this.setError(error.message);
            this.endLoading();
        }
    };
// Render vores visuals
    render = () => {
        const { errorMessage, email, password, isCompleted } = this.state;
        if (isCompleted) {
            return <Text>You are now signed up</Text>;
        }
        return (
            <View>
                <Text style={styles.fillContainer}></Text>
                <View style={styles.header}>
                <Text style={styles.signUpTextHeader}>Sign up</Text>
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

                    <Text
                        style={styles.error}>Error: {errorMessage}

                    </Text>
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
        // Benytter touchableOpacity, da denne kan styles i IOS
        return(
            <TouchableOpacity
                style={styles.SignUpButton}
                onPress={this.handleSubmit}
                underlayColor='#fff'>
                <Text style={styles.SignUpText}>Sign Up!</Text>
            </TouchableOpacity>
        );
    };
}
