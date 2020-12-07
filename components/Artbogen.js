import React, { Component } from "react";
import { View, Alert, Text } from "react-native";
import Leaderboard from "react-native-leaderboard";


// Dokumentation => https://npm.io/package/react-native-leaderboard

export default class Artbogen extends Component {
    state = {
        data: DATA };

    componentDidMount() {
        // En metode til at simulere nye brugere som kommer ind på platformen
        setInterval(() => {
            // Definerer navnet på den nye bruger og giver point baseret på math.random som vælger et tilfældigt tal og parser det til en String
            const newData = {
                name: "Ny Bruger Data",
                score: Math.floor(Math.random() * 100).toString(),
                iconUrl:
                    "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png"
            };
            // Sætter en timer så metoden kører hvert 4,5 sekund
            this.setState({ data: this.state.data.concat(newData) });
        }, 4500);
    }
    // Metode som har en onPress der anullere pop-up boksen
    alert = (title, body) => {
        Alert.alert(title, body, [{ text: "OK", onPress: () => {} }], {
            cancelable: false
        });
    };

// Render vores visuals
    render() {
        const props = {
            labelBy: "name",
            // Sortere rækkerne fra højst til lavest score
            sortBy: "score",
            data: this.state.data,
            icon: "iconUrl",
            onRowPress: (item, index) => {

                this.alert(item.name + " Niveau " + Math.round(item.score/7), item.score + " fund!");
            },
            // Tilføjer farve på alle lige rækker
            evenRowColor: "#dde9e7"

        };
        return (
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View
                    style={{
                        paddingTop: 50,
                        backgroundColor: "#043424",
                        alignItems: "center"
                    }}
                >
                    <Text style={{ fontSize: 28, color: "white", paddingBottom: 10 }}>
                        Leaderboard - Flest Dyrefund
                    </Text>
                </View>
                <Leaderboard {...props} />
            </View>
        );
    }
}
// Dummy Data som er der fra starten
const DATA = [
    {
        name: "Jens Jensen",
        score: 2,
        iconUrl:
            "https://st2.depositphotos.com/3895623/5589/v/950/depositphotos_55896913-stock-illustration-usershirt.jpg"
    },
    {
        name: "Louis Florian",
        score: 10,
        iconUrl:
            "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png"
    },
    {
        name: "Rasmus Nyeland",
        score: 244,
        iconUrl: "http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png"
    },
    {
        name: "Milla Bøtten Bæker",
        score: 60,
        iconUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-"
    },
    {
        name: "Jens Brøndum",
        score: 400,
        iconUrl: "https://st2.depositphotos.com/3895623/5589/v/950/depositphotos_55896913-stock-illustration-usershirt.jpg"
    },
    {
        name: "Peter Tomsen",
        score: 62,
        iconUrl: "http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png"
    },
    {
        name: "Sofie Nielsen",
        score: 101,
        iconUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz"
    },
    {
        name: "Mads Mikkelsen",
        score: 51,
        iconUrl: "http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png"
    },
    {
        name: "David Eriksen",
        score: 90,
        iconUrl:
            "https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png"
    },
    {
        name: "Dennis Lassen",
        score: 220,
        iconUrl:
            "https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png"
    },
    {
        name: "Lars Larsen",
        score: null,
        iconUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsSlzi6GEickw2Ft62IdJTfXWsDFrOIbwXhzddXXt4FvsbNGhp"
    },
    {
        name: "Nikoline Grevesen",
        score: 25,
        iconUrl:
            "https://landofblogging.files.wordpress.com/2014/01/bitstripavatarprofilepic.jpeg?w=300&h=300"
    },
    {
        name: "Laura Petersen",
        score: 30,
        iconUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-"
    }
];
