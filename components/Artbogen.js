import React, { Component } from 'react';

import { WebView } from 'react-native-webview';

export default class Artbogen extends Component {
    render() {
        return (
            <WebView
                source={{
                    uri: 'https://arter.dk/search/taxon?take=15&skip=0&notMatched=false&speciesGroup=Fugle&isDkTaxon=true&isDefaultTaxon=true&isMissingPhoto=false&searchText='
                }}
                style={{ marginTop: 20 }}
            />
        );
    }
}

