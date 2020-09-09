
import React, { Component } from 'react'
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View,
 
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { apis } from '../../configs'
import { WebView } from 'react-native-webview';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'
const height = Dimensions.get('window').height
import {Actions} from 'react-native-router-flux';
const width = Dimensions.get('window').width
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
const mapStateToProps = (state) => ({
	
})
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
			secure: true,
			webViewHeight: 0,
			process: false,
			vat: false,
			item: this.props.item,
			rePassword: '',
			password: '',
			
        }
		
		
    }
	changeLayoutVat = () => {
	
		this.setState({ vat: !this.state.vat }); 
	} 
	onWebViewMessage = (event: WebViewMessageEvent) => {
		this.setState({webViewHeight: Number(event.nativeEvent.data)})
	  }
	_register = () => {
		if(!this.state.vat){
			Alert.alert('Thông báo',  'Bạn phải đồng ý với điều khoản sử dụng của casfood để tiếp tục đăng ký' )
			return;
		}
		const { username, password, rePassword } = this.state
		if (rePassword != password)return showMessage({ message: 'Lỗi', description: 'Xác nhận mật khẩu không đúng', type: "warning" })
        if (!username.trim()) return showMessage({ message: 'Lỗi', description: 'Chưa nhập số điện thoại', type: "warning" })
        if (!password.trim()) return showMessage({ message: 'Lỗi', description: 'chưa nhập mật khẩu', type: "warning" })
        this.setState({ process: true }, () => {
            apis.register(username, password)
                .then(res => {
					this.setState({ process: false })
						
						Alert.alert('Thông báo',  res.data.message )
						Actions.stepone({phone: username, password: password})

                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					Alert.alert('Thông báo',  'Có lỗi trong quá trình đăng ký' )
					
                })
        })     
		//Actions.stepone()
	 }
	_back = () => {
		Actions.pop()
	 }
	 

	  render() {
		  const { username, password, secure, rePassword, process } = this.state
		return (
		  <View style={styles.container}>
			<View style={[styles.box, {width: width, height: 85}]} >
			
			
			<TouchableOpacity   style={styles.back} onPress={this._back}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={styles.buttonText}>
				    <Icon style={{top:10, marginTop:10}} name={'md-arrow-back'} size={20} color='#fff' />
				</Text>
			  </View>
			</TouchableOpacity>
			<Text maxFontSizeMultiplier={1} style={[styles.buttonText, styles.title]}>
				    Đăng Ký
			</Text>
			</View>
			<View style={{width: width, height: (height - 85), marginTop: 0}} >
				<View style={ styles.formGroup }>
                    
                    <View style={ styles.itemInput }>
						<TouchableOpacity onPress={() => this.setState({ secure: !secure })}>
                            <Icon name={'ios-person'} size={24} color='#757F8C' />
                        </TouchableOpacity>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Số điện thoại"
							placeholderTextColor="#757F8C"
							onChangeText={(username) => this.setState({ username })}
							value={username}
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
							placeholder="Nhập lại mật khẩu"
							placeholderTextColor="#757F8C"
							onChangeText={(rePassword) => this.setState({ rePassword })}
							value={rePassword}
						/>
						
					</View>
                </View>
				<CheckBox
				  title='Tôi đồng ý với điều khoản sử dụng'
				  checked={this.state.vat}
				  onPress={this.changeLayoutVat}
				  right={false}
				  containerStyle={{backgroundColor: null}}
				/>
				<WebView
		style={{ height: (this.state.vat) ? 0 : this.state.webViewHeight }}
		onMessage={this.onWebViewMessage}
          
          injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'

         source={{html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div style="width: 100% overflow-y: scroll"><h3 style="margin-top: 30px; margin-left: 20px; textAlign: center; color: #90D077;  font-size: 20px; font-weight: bold">'+this.state.item.title+'</h3><div>'+this.state.item.content+'</div></div><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script>$(document).ready(function(){ $("img").attr("height", "auto");$("img").attr("width", "100%");});</script></body></html>'}} />
				
				<TouchableOpacity   style={{marginBottom:15,width: width - 72, shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,  elevation: 5,marginLeft: 36,paddingVertical: 15,marginTop: 15,backgroundColor: '#90D077'}} onPress={this._register}>
				<View style={{}}>
					<View style={{ height: '100%', position: 'absolute', top: 0, left: 12, alignItems: 'center', justifyContent: 'center' }}>
                        {process ? <ActivityIndicator color={'white'} /> : null}
                    </View>
					<Text maxFontSizeMultiplier={1} style={{width: width - 72, color: '#fff',  textAlign: 'center',}}>
						Đăng ký
					</Text>
					
				  </View>
				</TouchableOpacity>
				
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
  
  back: {
	zIndex: 1,
	left:0,
	bottom:-0,
	position: 'absolute',
	color: '#fff',
	fontSize: 20,
   paddingHorizontal: 20,
    paddingVertical: 15,
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
  title: {
	zIndex: 1,
	bottom:15,
	left:50,
	position: 'absolute',
	color: '#fff',
	fontSize: 20,
   
  },
});
export default connect(mapStateToProps)(Register)