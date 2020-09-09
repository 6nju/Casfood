
import React, { Component } from 'react'
import { View, Text, StatusBar, KeyboardAvoidingView, TextInput, ScrollView, Dimensions, ActivityIndicator, ImageBackground, TouchableOpacity  } from 'react-native'
import { Button, Image } from 'react-native-elements'

import { showMessage } from 'react-native-flash-message';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { ActionCreators } from '../../redux/ActionCreators'
import Icon from 'react-native-vector-icons/Ionicons'
import Axios from 'axios';
import { colors, apis } from '../../configs'
import { styles } from './styles'

const height = Dimensions.get('window').height
const mapStateToProps = (state) => ({
})

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            process: false,
            secure: true
        }
    }
    _login = () => {
        const { username, password } = this.state

        if (!username.trim()) return alert('You have not entered your username');
        if (!password.trim()) return alert('You have not entered your password');
        this.setState({ process: true }, () => {
            apis.login(username, password)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        let user_login = res.data.data
                        Axios.defaults.headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + user_login.token
                        }
                        this.props.dispatch(ActionCreators.set_user_login(user_login))
                        Actions.home({ type: ActionConst.REPLACE })
                    } else {
                        this.setState({ process: false })
						alert('An error occurred during login');
                        showMessage({ message: 'An error occurred during login', type: "error" })
                    }
                })
                .catch(err => {
                    this.setState({ process: false })
                    console.log(err.response)
                    return showMessage({ message: 'An error occurred during login', type: "error" })
                })
        })     
    }
    

    render() {
        const { username, password, process, secure } = this.state

        return (
            <View style={ styles.wrap }>
                <ImageBackground source={require('./imgs/background.png')}  style={ styles.imgBackground }>
                <StatusBar backgroundColor="#90D077"/>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={Platform.OS == "android" ? -500 : 0} enabled>
                    <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="none">
                        <View style={{ paddingTop: height / 8 }}>
                            <View style={ styles.wrapIcon }>
                                <Image
                                    source={ require('../../assets/images/logo.png') }
                                    style={ styles.icon }

                                />
                            </View>
                            <View style={ styles.formGroup }>
                                <Text maxFontSizeMultiplier={1} style={ styles.labelInput }>Email</Text>
                                <View style={ styles.itemInput }>
                                    <TextInput maxFontSizeMultiplier={1} 
                                        autoCorrect={false}
                                        returnKeyType='done'
                                        style={ styles.input }
                                        onChangeText={(username) => this.setState({ username })}
                                        value={username}
                                    />
                                </View>
                            </View>

                            <View style={ styles.formGroup }>
                                <Text maxFontSizeMultiplier={1} style={ styles.labelInput }>Password</Text>
                                <View style={ styles.itemInput }>
                                    <TextInput maxFontSizeMultiplier={1} 
                                        autoCorrect={false}
                                        returnKeyType='done'
                                        secureTextEntry={secure}
                                        style={ styles.input }
                                        onChangeText={(password) => this.setState({ password })}
                                        value={password}
                                    />
                                    <TouchableOpacity onPress={() => this.setState({ secure: !secure })}>
                                        {
                                            password.trim() ? (secure ? <Icon name={'ios-eye-off'} size={24} color='#fff' /> :
                                                <Icon name={'ios-eye'} size={24} color='#757F8C' />) : null
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={ styles.btnWrap }>
                                <TouchableOpacity onPress={() => this._login()}
                                    style={ styles.btn }>
                                    <View style={{ height: '100%', position: 'absolute', top: 0, left: 12, alignItems: 'center', justifyContent: 'center' }}>
                                        {process ? <ActivityIndicator color={'white'} /> : null}
                                    </View>
                                    <Text maxFontSizeMultiplier={1} style={ styles.textBtn }>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                    </ScrollView>
                </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        )
    }
}

export default connect(mapStateToProps)(Login)