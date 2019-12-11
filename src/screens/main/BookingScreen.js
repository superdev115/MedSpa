import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Icon } from 'react-native-elements';

import SegmentedControlTab from 'react-native-segmented-control-tab';

import Moment from 'moment';
import Spinner from "react-native-loading-spinner-overlay";
import {WebView} from "react-native-webview";

export default class BookingScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Booking',
        headerBackTitle: '',
        headerRight: () => (
            <Image style={styles.navLogo}
                   source={require('../../assets/images/logo.png')} />
        ),
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        };
    }

    hideSpinner() {
        this.setState({ loading: false });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Spinner visible={this.state.loading}
                         overlayColor={{color: 'white'}}
                         color={'cadetblue'} />
                <WebView style={{ flex: 1, }}
                         source={{ uri: "https://web2.myaestheticspro.com/booknow/index.cfm?53FD14C9E55FEC061C611199D522BE6D" }}
                         onLoad={() => (this.hideSpinner())}
                />
            </SafeAreaView>
        )
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
        backgroundColor: 'white',
    },
    navLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginRight: 10,
    },
})