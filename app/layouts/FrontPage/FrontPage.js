
import React, { Component } from 'react'
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
import { showMessage } from 'react-native-flash-message';
import { Actions, ActionConst } from 'react-native-router-flux';

import Axios from 'axios';
import { colors, apis } from '../../configs'
import { ActionCreators } from '../../redux/ActionCreators'

import { connect } from 'react-redux'
const mapStateToProps = (state) => ({
	user_login: state.user_login
})
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
class FrontPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.phone,
            login_: (this.props.login) ? 1 : 0,
            w: width,
			process: false,
			item: {},
			h: height,
			borderBottomLeftRadius:0,
			borderBottomRightRadius:0,
			marginTop:height/3,
			opacity:1,
			height:height*7/11,
			secure: true,
			password: this.props.password,
			
        }
		apis.getPost()
                .then(res => {
					let item;
					
					for(let i = 0; i < res.data.items.length; i++){
						if(res.data.items[i].dieukhoan == 1){
							item = res.data.items[i]
							
						}
						
					}
					this.setState({ process: false, item: item })

					
                })
                .catch(err => {
					
					this.setState({ process: false })
					return showMessage({ message: err.data.message, type: "error" })
                })
		
    }
	_showPost2 = () => {
		Actions.post({item: this.state.item})
	}
	componentDidMount() {

       if(this.state.login_ == 1){
			this.setState({ process: true }, () => {
            apis.login(this.state.username, this.state.password)
                .then(res => {
                    this.setState({ process: false })
                        let user_login = res.data.data
                        Axios.defaults.headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + user_login.token
                        }
						
						Alert.alert('Thông báo',  'Bạn đã đăng nhập thành công' )
                        this.props.dispatch(ActionCreators.set_user_login(user_login))
                        Actions.home({ type: ActionConst.REPLACE, phone: res.data.data.phone })	
                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Thông báo', description: err.data.message, type: "warning" })
					Alert.alert('Thông báo',  'Có lỗi trong quá trình đăng nhập' )
					
                    
                    
                })
        }) 
		}
    }
	 _loginFacebook = () => {
		 
	 }
	 _loginForgot = () => {
		 Actions.forgot()
	 }
	 _register = () => {
		 Actions.register({item: this.state.item})
	 }
	 _login = () => {
		const { username, password } = this.state

        if (!username.trim()) return showMessage({ message: 'Lỗi', description: 'You have not entered your username', type: "warning" })
        if (!password.trim()) return showMessage({ message: 'Lỗi', description: 'You have not entered your password', type: "warning" })
        this.setState({ process: true }, () => {
            apis.login(username, password)
                .then(res => {
                    this.setState({ process: false })
                        let user_login = res.data.data
                        Axios.defaults.headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + user_login.token
                        }
						Alert.alert('Thông báo',  'Bạn đã đăng nhập thành công' )
                        this.props.dispatch(ActionCreators.set_user_login(user_login))
                        Actions.home({ type: ActionConst.REPLACE, phone: res.data.data.phone })	
                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Thông báo', description: err.data.message, type: "warning" })
					Alert.alert('Thông báo',  'Có lỗi trong quá trình đăng nhập' )
					
                    
                    
                })
        }) 
	 }
	 _onPress = () => {
		this.setState({opacity: 0})

		LayoutAnimation.configureNext(
		  LayoutAnimation.create(
			700,
			LayoutAnimation.Types.easeInEaseOut,
			LayoutAnimation.Properties.scaleXY,
		  ),
		);
		this.setState({h: height*4/11, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, opacity: 0, marginTop: this.state.marginTop - 50 })
	  }

	  render() {
		  const { username, password, secure, process } = this.state
		return (
		  <View style={styles.container}>
			<View style={[styles.box, {width: this.state.w, height: this.state.h, borderBottomLeftRadius: this.state.borderBottomLeftRadius, borderBottomRightRadius: this.state.borderBottomRightRadius}]} >
			<Text maxFontSizeMultiplier={1} style={{fontWeight: 'bold', fontSize: 40, color: '#fff', marginTop: this.state.marginTop, width: width, textAlign: 'center'}}>Casfood</Text>
			<Text maxFontSizeMultiplier={1} opacity={this.state.opacity} style={{fontSize: 20, color: '#fff', marginTop: 10, width: width, textAlign: 'center', opacity: this.state.opacity}}>Sức khỏe từ điều nhỏ nhất</Text>
			
			<TouchableOpacity   style={styles.button} onPress={this._onPress}>
			  <View opacity={this.state.opacity}>
				
				
				<Text maxFontSizeMultiplier={1} style={[styles.buttonText, {fontSize:20}]}>
				    <Icon style={{top:10, marginTop:10}} name={'md-arrow-dropright'} size={16} color='#fff' /> Skip
				</Text>
				
			  </View>
			</TouchableOpacity>
			</View>
			<View style={{width: width, height: this.state.height, marginTop: 0}} >
				<View style={ styles.formGroup }>
                    
                    <View style={ styles.itemInput }>
						<TouchableOpacity onPress={() => this.setState({ secure: !secure })}>
                            <Icon name={'ios-person'} size={24} color='#757F8C' />
                        </TouchableOpacity>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Tên Đăng Nhập / Số Điện Thoại"
							placeholderTextColor="#757F8C"
							onChangeText={(username) => this.setState({ username })}
							value={username}
							maxFontSizeMultiplier={1}
						/>
						
						
					</View>
                </View>
				<View style={ styles.formGroup }>
                    
                    <View style={[ styles.itemInput,{marginTop: 5} ]}>
						<TouchableOpacity onPress={() => this.setState({ secure: !secure })}>
                            <Icon name={'ios-lock'} size={24} color='#757F8C' />
                        </TouchableOpacity>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{marginLeft: 5}, styles.input ]}
							secureTextEntry={secure}
							placeholder="Mật khẩu"
							placeholderTextColor="#757F8C"
							onChangeText={(password) => this.setState({ password })}
							value={password}
							maxFontSizeMultiplier={1}
						/>
						
					</View>
                </View>
				<TouchableOpacity   style={{width: width - 72, shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,  elevation: 5,marginLeft: 36,paddingVertical: 15,marginTop: 15,backgroundColor: '#90D077'}} onPress={this._login}>
				<View style={{}}>
				<View style={{ height: '100%', position: 'absolute', top: 0, left: 12, alignItems: 'center', justifyContent: 'center' }}>
                                        {process ? <ActivityIndicator color={'white'} /> : null}
                                    </View>
					<Text maxFontSizeMultiplier={1} style={{width: width - 72, color: '#fff',  textAlign: 'center',}}>
						Đăng nhập
					</Text>
					
				  </View>
				</TouchableOpacity>
				
				<View   style={{width: width - 72,marginLeft: 36, position: 'relative'}}>
					<TouchableOpacity   style={{paddingVertical: 15}} onPress={this._register}>
					<View style={{}}>
						<Text maxFontSizeMultiplier={1} style={{color: '#757F8C', fontSize: 12}} >
							Bạn chưa có tài khoản? <Text maxFontSizeMultiplier={1} style={{color: '#90D077'}}>Đăng ký</Text>
						</Text>
						
					  </View>
					</TouchableOpacity>
					<TouchableOpacity   style={[styles.button]} onPress={this._loginForgot}>
					<View style={{}}>
						<Text maxFontSizeMultiplier={1} style={{color: '#757F8C', fontSize: 12, textDecorationLine: "underline",textDecorationStyle: "solid",textDecorationColor: "#757F8C"}}>
							Quên mật khẩu
						</Text>
						
					  </View>
					</TouchableOpacity>
				</View>
			</View>
		  </View>
		);
	  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  input: {
        margin: 0, 
        padding: 0, 
        flex: 1, 
        height: 40, 
        paddingLeft: 8, 
		color: '#757F8C',
        fontSize: 16
    },
  formGroup: {
        flexDirection: 'column', 
        marginBottom: 16, 
        paddingHorizontal: 16
    },
	itemInput: {
        flexDirection: 'row', 
		width: width - 72,
		marginLeft: 20,
		marginTop: 20,
        borderColor: '#757F8C',
        borderBottomWidth: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
labelInput: {
        fontSize: 13, 
        color: '#757F8C', 
        marginBottom: 5
    },
  box: {
    position: 'relative',
	zIndex: 0,
    backgroundColor: '#90D077',
  },
  button: {
	  
	zIndex: 1,
	bottom:0,
	right:0,
	position: 'absolute',
	color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
	fontSize: 15,
  },
});
export default connect(mapStateToProps)(FrontPage)