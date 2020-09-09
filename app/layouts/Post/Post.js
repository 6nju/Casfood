
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
  ActivityIndicator,
  ScrollView,
  Image,

  Picker,
  Alert
} from 'react-native';
import { WebView } from 'react-native-webview';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons'
const height = Dimensions.get('window').height
import {Actions} from 'react-native-router-flux';
const width = Dimensions.get('window').width
import { connect } from 'react-redux'
import MultiSelect from 'react-native-multiple-select';
const mapStateToProps = (state) => ({
	user_login: state.user_login
})
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
			phone: this.props.user_login.phone,
			process: false,
			expanded: false,
			item: this.props.item,
			items: [],
			

			
        }
		
				apis.steptow(this.state.phone)
                .then(res => {
					this.setState({ process: false, bmi: res.data.bmi, alert_: res.data.alert_ })
                })
                .catch(err => {
					this.setState({ process: false })
					return showMessage({ message: err.data.message, type: "error" })
                })
				apis.getPost()
                .then(res => {
					
					this.setState({ process: false, items: res.data.items })

					
                })
                .catch(err => {
					
					this.setState({ process: false })
					return showMessage({ message: err.data.message, type: "error" })
                })
    }
	_showPost(id){
		Actions.post({item: this.state.items[id]})
	}
	changeLayout = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ expanded: !this.state.expanded });
	}
	_facebook = () => {
		Actions.facebook()
	}
	_alert = () => {
		Actions.alerts()
	}
	_menu = () => {
		Actions.menu()
	}		
	_friends = () => {
		
		Actions.friends()
	 }
	_next = () => {
		Actions.stepthree()
	 }
	_back = () => {
		Actions.pop()
	 }
	 
	onWebViewMessage = (event: WebViewMessageEvent) => {
		this.setState({webViewHeight: Number(event.nativeEvent.data)})
	  }
	  render() {
		  const { process } = this.state
		return (
		  <View style={styles.container}>
			  {
				  (this.state.expanded) ?
				  <View style={[{position:'absolute', height: height - 165, width: width, top: 85, backgroundColor: '#000', opacity: 0.5,left: 0, zIndex: 2}]}>
					<TouchableOpacity style={{height: height, width: width}} onPress={this.changeLayout}>
					</TouchableOpacity>
					</View>
				  : null
			  }
		  <View style={[styles.popup,{ height: this.state.expanded ? (height-165) : 0, overflow: 'hidden', top: 85 }]}>
                  <View style={styles.popup_box}>
                        {
						this.state.items.map((val, index) => {
							if(val.id == this.state.item.id){
							return (
								<TouchableOpacity style={[styles.popup_naviga]} key={index} onPress={this._showPost.bind(this, index)}>
								<Text maxFontSizeMultiplier={1} style={[styles.popup_naviga_text, {color: '#90D077'}]}>{val.title}</Text>
								</TouchableOpacity>
								)
								}else{
								return (
								<TouchableOpacity style={styles.popup_naviga} key={index} onPress={this._showPost.bind(this, index)}>
								<Text maxFontSizeMultiplier={1} style={styles.popup_naviga_text}>{val.title}</Text>
								</TouchableOpacity>
								)	
								}
							})
							
						}
                          
                         
                           <TouchableOpacity style={styles.exit_button} onPress={this.changeLayout}>
                                <Image
                                    source={require('./images/exit.png')}
                                />
                          </TouchableOpacity>
                  </View>
        </View>
			<View style={[styles.box, {width: width, height: 85}]} >
			
			
			<TouchableOpacity   style={styles.back} onPress={this._back}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={styles.buttonText}>
				    <Icon style={{top:10, marginTop:10}} name={'md-arrow-back'} size={20} color='#fff' />
				</Text>
			  </View>
			</TouchableOpacity>
			<Text maxFontSizeMultiplier={1} style={[styles.buttonText, styles.title]}>
				    Kiến thức
			</Text>
			<TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout} style={{position:'absolute', right: 20, top: 50}}>
                    <Image
                        source={require('./images/lb-icon.png')}
                    />
                  </TouchableOpacity>
			</View>
			<View style={[{width: width, height: height - 85 - 80}]} >
			<View style={[{width: width, height: height - 85 - 80}]}>
				
				<View style={{ height: height - 85 - 80}}>
				<WebView
		style={{ height: this.state.webViewHeight }}
		onMessage={this.onWebViewMessage}
          
          injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'

         source={{html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div style="width: 100% overflow-y: scroll"><h3 style="margin-top: 30px; margin-left: 20px; text-align: center; color: #90D077;  font-size: 20px; font-weight: bold">'+this.state.item.title+'</h3><img src="'+'http://casfood.vn/' + this.state.item.image+'"/><div>'+this.state.item.content+'</div></div><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script>$(document).ready(function(){ $("img").attr("height", "auto");$("img").attr("width", "100%");});</script></body></html>'}} />
				
				
				</View>
			</View>	
			</View>
			<View style={[{width: width, height: 80, position: 'absolute', bottom: 0, backgroundColor: '#fff', shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 2,  elevation: 5,}]} >
			<TouchableOpacity   style={{position: 'absolute', width: width*.2, height:80, top:0, left:0}} onPress={this._menu}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', marginTop: 10}}>
				    <Icon style={{top:10, marginTop:7}} name={'ios-restaurant'} size={41} color='#757F8C' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', color: '#757F8C', fontSize: 12}}>
				    Thực đơn
				</Text>
			  </View>
			</TouchableOpacity>
			<TouchableOpacity   style={{position: 'absolute', width: width*.2, height:80, top:0, left:width*.2}} onPress={this._facebook}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', marginTop: 10}}>
				    <Icon style={{top:10, marginTop:7}} name={'md-person-add'} size={41} color='#757F8C' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', color: '#757F8C', fontSize: 12}}>
				    Bạn bè
				</Text>
			  </View>
			</TouchableOpacity>
			<TouchableOpacity   style={{position: 'absolute', width: width*.2, height:80, top:0, left:width*.4}} onPress={this._alert}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', marginTop: 10}}>
				    <Icon style={{top:10, marginTop:7}} name={'ios-heart'} size={41} color='#757F8C' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', color: '#757F8C', fontSize: 12}}>
				     Sức khỏe
				</Text>
			  </View>
			</TouchableOpacity>
			<TouchableOpacity   style={{position: 'absolute', width: width*.2, height:80, top:0, left:width*.6}}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', marginTop: 10}}>
				    <Icon style={{top:10, marginTop:7}} name={'ios-paper'} size={41} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', color: '#90D077', fontSize: 12}}>
				    Kiến thức
				</Text>
			  </View>
			</TouchableOpacity>
			<TouchableOpacity   style={{position: 'absolute', width: width*.2, height:80, top:0, left:width*.8}}  onPress={this._friends}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', marginTop: 10}}>
				    <Icon style={{top:10, marginTop:7}} name={'md-person'} size={41} color='#757F8C' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', color: '#757F8C', fontSize: 12}}>
				    Tài khoản
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
        paddingHorizontal: 0
    },
	itemInput: {
        flexDirection: 'row', 
		width: width,
		color: '#757F8C',
		marginTop: 5,
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
  
  icon: {
	  zIndex: 1,
	left:15,
	bottom:10,
	position: 'absolute',
	color: '#fff',
	fontSize: 20,
   
  },
  back: {
	zIndex: 1,
	left:0,
	bottom:0,
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
    
	fontSize: 20,
  },
  title: {
	zIndex: 1,
	bottom:15,
	left:50,
	position: 'absolute',
	color: '#fff',
	fontSize: 20,
   
  },
   popup:{
    width:width*.85,
    position:'absolute',
	right: 0,
    backgroundColor:'#fff',
    zIndex:10000,
  },
  popup_box:{
    height:height,
  },
  popup_logo:{
    alignItems:'center',
    marginTop:50,
    marginBottom:20,
  },
  exit_button:{
    bottom:50,
    position:'absolute',
    right:20,
  },
  popup_naviga:{
    marginLeft:20,
  },
  popup_naviga_text:{
    paddingTop:5,
    paddingBottom:5,
    fontWeight: 'bold',
    marginTop:10,
  },
});
export default connect(mapStateToProps)(Post)