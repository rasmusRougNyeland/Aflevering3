import * as React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, Image } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import {Accuracy} from "expo-location";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';


export default class MapViewLocation extends React.Component {

    mapViewRef = React.createRef();

    state = {
        //Tjekker om der faktisk er tilladelse til lokation
        hasLocationPermission: null,
        //Tjekker nuværende lokation
        currentLocation: null,
        //Tjekker marker for brugeren
        userMarkerCoordinates: [],
        //Tjekker koordinaterne for de valgte markers
        selectedCoordinate: null,
        //Finder selve adressen på den valgte makør
        selectedAddress: null,
    };


    // Metode som spørger om lokationstilladelse og sætter en state om tilladelse kaldet status
    getLocationPermission = async () => {

        const { status } = await Permissions.askAsync(Permissions.LOCATION);

        this.setState({ hasLocationPermission: status });
    };
        // Mounter først når vi har fået lokationstilladelse
    componentDidMount = async () => {

        await this.getLocationPermission();

    };


    // Denne metode skal bruges til at opdatere brugerens lokation
    // opretter en konstant og bruger en indlejrede metode som hedder getCurrentPositionAsync
    updateLocation = async () => {

        const { coords } = await Location.getCurrentPositionAsync({accuracy: Accuracy.Balanced});

        this.setState({ currentLocation: coords });
    };
// long press hvilken laver en makør. Netop dette denne eventhandler skal håndtere
    handleLongPress = event => {

        const { coordinate } = event.nativeEvent;

        this.setState(prevState => {
            return {
                userMarkerCoordinates: [...prevState.userMarkerCoordinates, coordinate],
            };

        });

    };

    handleSelectMarker = coordinate => {

        this.setState({ selectedCoordinate: coordinate });

        this.findAddress(coordinate);

    };

    findAddress = async coordinate => {

        const [selectedAddress] = await Location.reverseGeocodeAsync(coordinate);

        this.setState({ selectedAddress });
    };

    closeInfoBox = () =>
        this.setState({ selectedCoordinate: null, selectedAddress: null });

    // Metoder som rendere nuværende lokation på brugeren
    renderCurrentLocation = () => {
        // Henter hasLocationPermission og currentLocation og sætter dem til state
        const { hasLocationPermission, currentLocation } = this.state;
        // Hvis intet returneres
        if (hasLocationPermission === null) {
            return null;
        }
        // Siden det er en true eller false statement, betyder false at man ikke har lokationstilladelse
        if (hasLocationPermission === false) {
            return <Text>No location access. Go to settings to change</Text>;
        }
        // Hvis vi har tilladelse returnere den faktiske lokation og en knap hvor man kan opdatere sin lokation
        // Dette gøres ved updateLocation, når man trykker på knappen
        return (
            <View>
                <Button title="Update Your Location" onPress={this.updateLocation} />
                {currentLocation && (
                    <Text>
                        {`${currentLocation.latitude}, ${
                            currentLocation.longitude
                        } ${currentLocation.accuracy}`}
                    </Text>
                )}
            </View>
        );
    };
// Render vores visuals
    render() {

        const {userMarkerCoordinates, selectedCoordinate, selectedAddress,
        } = this.state;

        return (

            <SafeAreaView style={styles.container}>
                {this.renderCurrentLocation()}

                <MapView
                    provider="google"
                    style={styles.map}
                    ref={this.mapViewRef}
                    showsUserLocation
                    onLongPress={this.handleLongPress}>

                    <Marker
                        coordinate={{ latitude: 55.7631035, longitude: 12.4977436 }}
                        title="Lille flagspætte"
                        description=" Orden: Lille flagspætte
                                    Status: Truet
                                    Beskrivelse: Lille flagspætte er en meget
                                    karakteristisk mejse med sin sort- og hvidspættede top og den sort-hvide hovedtegning. Fjerdragten er i øvrigt
                                    karakteriseret ved en mørkt gråbrun overside og en lysegrå underside.">
                        <Image source={{uri: 'https://i.pinimg.com/originals/e6/ac/1f/e6ac1f4030521141f1ebaa50ad02a8e0.png'}}
                               style={{width: 40, height: 40}} />
                    </Marker>
                    <Marker
                        coordinate={{ latitude: 55.7491107, longitude: 12.519411 }}
                        title="Skægmejse"
                        description=" Orden: Spurvefugl
                                    Status: Ikke Truet
                                    Beskrivelse: Topmejsen er en meget
                                    karakteristisk mejse med sin sort- og hvidspættede top og den sort-hvide hovedtegning. Fjerdragten er i øvrigt
                                    karakteriseret ved en mørkt gråbrun overside og en lysegrå underside.">
                        <Image source={{uri: 'https://i.pinimg.com/originals/e6/ac/1f/e6ac1f4030521141f1ebaa50ad02a8e0.png'}}
                               style={{width: 40, height: 40}} />
                    </Marker>
                    <Marker
                        coordinate={{ latitude: 55.7584811, longitude: 12.5346674 }}
                        title="Topmejse"
                        description=" Orden: Spurvefugl
                                    Status: Truet
                                    Beskrivelse: Skægmejse er en meget
                                    karakteristisk mejse med sin sort- og hvidspættede top og den sort-hvide hovedtegning. Fjerdragten er i øvrigt
                                    karakteriseret ved en mørkt gråbrun overside og en lysegrå underside.">
                        <Image source={{uri: 'https://i.pinimg.com/originals/e6/ac/1f/e6ac1f4030521141f1ebaa50ad02a8e0.png'}}
                               style={{width: 40, height: 40}} />
                    </Marker>

                    {userMarkerCoordinates.map((coordinate, index) => (

                        <Marker

                            coordinate={coordinate}
                            key={index.toString()}
                            onPress={() => this.handleSelectMarker(coordinate)}

                        />
                    ))}


                </MapView>

                {selectedCoordinate && (

                    <View style={styles.infoBox}>

                        <Text style={styles.infoText}>
                            {selectedCoordinate.latitude}, {selectedCoordinate.longitude}
                        </Text>

                        {selectedAddress && (

                            <Text style={styles.infoText}>

                                {selectedAddress.name} {selectedAddress.postalCode}

                            </Text>
                        )}

                        <Button title="Close" onPress={this.closeInfoBox} />
                    </View>
                )}
            </SafeAreaView>
        );
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
    map: { flex: 1 },
    infoBox: {
        height: 100,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    infoText: {
        fontSize: 20,
    },
});
