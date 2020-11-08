import React, { useState, useEffect } from 'react';
import {Button, Image, View, Platform, TouchableOpacity, StyleSheet, Text, ScrollView, StatusBar, TextInput, Picker} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';


const styles = StyleSheet.create({
    pickPhotoButton:{
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
    photoPickTextButton:{
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        color:'#fff'

    },
    textInputBox:{
     width: 250,
     fontSize: 20,
     padding: 5,
     borderWidth: 2,
     borderColor: 'black',

    },
    textOverTextInputBox:{
     fontSize: 20,
     marginRight: 175,
     padding: 10,
    },
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    }
});
StatusBar.setBarStyle('dark-content', true);

export default function ImagePickerExample() {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                // Efterspørger adgang til brugeren fotos
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'Granted') {
                    alert('Please Allow Us to use your Cameraroll ');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // Virker kun på android... Ellers skal man hente ImageManipulator API
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    const [selectedValue, setSelectedValue] = useState("start");
    return (
        <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 }}>


            {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}

            <TouchableOpacity
                style={styles.pickPhotoButton}
                onPress={pickImage}
                underlayColor='#fff'>
                <Text style={styles.photoPickTextButton}>Pick Image!</Text>
            </TouchableOpacity>


        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 }}>

            <Text style={styles.textOverTextInputBox}>Name:</Text>
            <TextInput style={styles.textInputBox}></TextInput>

            <Text style={styles.textOverTextInputBox}>Found:</Text>

            <TextInput style={styles.textInputBox}></TextInput>
            <Picker

                selectedValue={selectedValue}
                style={{ height: 300, width: 300 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Please Select Type of Bird" value="start" />
                <Picker.Item label="Bird of Prey" value="birdOfPrey" />
                <Picker.Item label="Migratory Bird" value="migratoryBird" />
                <Picker.Item label="Seated Bird" value="seatedBird" />
            </Picker>
        </View>



        </ScrollView>


    );
}
