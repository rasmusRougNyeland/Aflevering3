import * as React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView } from 'react-native';
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
                        coordinate={{ latitude: 55.676200, longitude: 12.569420 }}
                        title="Påfugl"
                        description="Påfuglen er en fasanfugl. Fuglen yngler i Indien og på Sri Lanka, men er indført og udsat mange steder i verden. I Danmark fik et par fritgående påfugle på Sejerø deres første kuld kyllinger i foråret 1982, og der er nu en fast bestand på øen"
                    />
                    <Marker
                        coordinate={{ latitude: 55.673032, longitude: 12.568757 }}
                        title="Egern"
                        description="Egern, også kaldet europæisk egern eller almindeligt egern, er en gnaver i egernfamilien med en kropslængde på omkring 22 cm. Den store hale måler 17 cm. Det er almindeligt forekommende i Danmark, både i en rød, brun og sort farvevariant"
                    />
                    <Marker
                        coordinate={{ latitude: 55.674000, longitude: 12.598110 }}
                        title="Bisamrotte"
                        description="En bisamrotte måler fra snudespids til halerod ca. 30-40 cm, halen bliver op til 28 cm lang og den kan veje op til 1,8 kg."
                    />

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
