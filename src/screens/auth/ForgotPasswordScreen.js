import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Platform, View, Image, Text, Alert, SafeAreaView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-loading-spinner-overlay';

import firebase from 'react-native-firebase';

class ForgotPasswordScreen extends React.Component {
    static navigationOptions = {
        title: 'Forgot Password?',
    };

    state = {
        spinner: false,
        //////////////
        email: '',
        errorMessage: '',
    };

    auth = firebase.auth();

    render() {
        const {goBack} = this.props.navigation;
        return (
            <SafeAreaView style={{flex: 1,}}>
                <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid={true}
                                         enableAutomaticScroll={(Platform.OS === 'ios')}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Please wait...'}
                        overlayColor="rgba(0, 0, 0, 0.5)"
                        textStyle={{color: 'white'}}
                    />
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.subtitle}>Please enter your email address</Text>
                        <Input inputContainerStyle={styles.inputStyle}
                               leftIcon={<Icon name="envelope" style={styles.iconSmallStyle} />}
                               inputStyle={styles.inputInnerStyle}
                               placeholder="Email" autoCapitalize="none" keyboardType="email-address"
                               onChangeText={(email) => { this.setState({email}); }}
                               value={this.state.email}
                               errorMessage={this.state.errorMessage} errorStyle={{paddingLeft: 20}} />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <Button raised buttonStyle={styles.backButton} title="Back" onPress={() => goBack()} />
                        <Button raised buttonStyle={styles.loginButton} title="Send" onPress={this.onSend} />
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }

    onSend = async () => {
        const {email} = this.state;

        // Start validating...
        let isValidated = true;
        if (email.trim() == '') {
            isValidated = false;
            this.setState({ errorMessage: 'This field is required!'} );
        } else {
            let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            if (emailRegex.test(email) === false) {
                isValidated = false;
                this.setState({ errorMessage: 'Invalid email address'} );
            } else {
                this.setState({ errorMessage: ''} );
            }
        }
        if (!isValidated) return;
        console.log('Validate OK!');
        // End validating...

        this.setState({spinner: true});
        this.auth
            .sendPasswordResetEmail(email)
            .then(async () => {
                Alert.alert(
                    'MedSpa',
                    'Reset password email has been sent to your email address',
                    [{
                        text: 'OK',
                        onPress: () => {
                            this.setState({spinner: false});
                            this.props.navigation.navigate('Landing');
                        }
                    }],
                    {cancelable: false}
                );
            })
            .catch((error) => {
                this.setState({spinner: false});
                Snackbar.show({
                    title: error.message,
                    duration: Snackbar.LENGTH_LONG,
                })
            });
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1
    },
    logoContainer: {
        height: '200rem',
        padding: '10rem',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        aspectRatio: 10/8,
        height: '80%',
        resizeMode: 'contain'
    },
    subtitle: {
        color: 'black',
        fontSize: '16rem',
        textAlign: 'center',
    },
    inputContainer: {
        height: '200rem',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingLeft: '10rem',
        paddingTop: '30rem',
        paddingRight: '10rem',
        paddingBottom: '60rem',
    },
    inputStyle: {
        height: '40rem',
        borderWidth: 1,
        borderColor: 'dodgerblue',
        borderRadius: '20rem',
    },
    inputInnerStyle: {
        fontSize: '16rem',
        paddingLeft: '15rem',
        paddingRight: '25rem',
    },
    inputLabelStyle: {
        paddingLeft: '20rem',
        paddingBottom: '5rem',
        color: 'dodgerblue',
    },
    iconSmallStyle: {
        fontSize: '15rem',
        color: 'dodgerblue',
    },
    iconNormalStyle: {
        fontSize: '20rem',
        color: 'dodgerblue',
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around'
    },
    backButton: {
        width: '130rem',
        height: '50rem',
        backgroundColor: 'lightseagreen',
        borderRadius: '25rem',
    },
    loginButton: {
        width: '130rem',
        height: '50rem',
        backgroundColor: 'mediumvioletred',
        borderRadius: '25rem',
    },
});

export default ForgotPasswordScreen;