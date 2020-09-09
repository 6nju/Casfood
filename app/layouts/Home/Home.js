
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
  StatusBar,
  ScrollView,
  Image,

  Picker,
  Alert
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import { WebView } from 'react-native-webview';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons'
const height = Dimensions.get('window').height
import {Actions} from 'react-native-router-flux';
const width = Dimensions.get('window').width
import { connect } from 'react-redux'
import MultiSelect from 'react-native-multiple-select';
import { ActionFour } from '../../redux/ActionFour'
const mapStateToProps = (state) => ({
	user_login: state.user_login,
	step_four: state.step_four,
})
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
			phone: this.props.user_login.phone,
			user_login: this.props.user_login,
			process: false,
			expanded: false,
			item: {},
			items: [],
			progess_:(typeof this.props.tess_ != 'undefined') ? false : true,
			request_friend: [],
			nguyenlieu: ''

			
        }
		
		apis.getListUser(this.state.phone)
                .then(res => {
					
					this.setState({ request_friend: res.data.request })
					if(res.data.request.length > 0){
						Alert.alert(
						'Thông báo',
						'Có người vừa kết bạn với bạn',
					  [
						{
						  text: 'Xem',
						  onPress: () => {
							 Actions.facebook({check: true}) 
						  }
						},
						
						
					  { cancelable: false }
					  ]
					);
					}
                })
                .catch(err => {
					
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Thông báo', description: err.data.message, type: "warning" })
					
					return showMessage({ message: 'Thông báo', description:  'Có lỗi trong quá trình tìm kiếm', type: "warning" })
                    
                })
            apis.steptow(this.state.phone)
                .then(res => {
					
					this.setState({ process: false, bmi: res.data.bmi, alert_: res.data.alert_ })

					
                })
                .catch(err => {
					this.setState({ process: false })
					return showMessage({ message: err.data.message, type: "error" })
                })
			apis.getTop()
                .then(res => {
					
					this.setState({ process: false, item: res.data.item })

					
                })
				apis.count(this.state.phone).then(res => {
					
					

					
                }).catch(err => {
					this.setState({ process: false })
					alert('Lỗi');
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
				
				apis.listFoodPhone(this.state.user_login.phone)
                .then(res => {
					
					this.props.dispatch(ActionFour.set_step_four(res.data))

					
					
					
                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					Alert.alert('Thông báo',  'Có lỗi trong quá trình đăng ký' )
					
                })
				
				
				
				
				
				
				
				
				
				
    }
	
	_showPost2 = () => {
		Actions.post({item: this.state.item})
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
		Actions.list()
	}		
	_friends = () => {
		
		Actions.friends()
	 }
	 componentDidMount() {
  	
		  	if(this.state.progess_){
				  setTimeout( () => {
				     this.setState({progess_: false})
				  },6300);
			}
			}
	_next = () => {
		Actions.stepthree()
	 }
	_back = () => {
		Actions.pop()
	 }
	 _search = () => {
		Actions.search({nguyenlieu: this.state.nguyenlieu})
	}
	 onWebViewMessage = (event: WebViewMessageEvent) => {
		 
		this.setState({webViewHeight: Number(event.nativeEvent.data)})
	  }

	  render() {
		  const { process, nguyenlieu,progess_ } = this.state
		  if (this.state.progess_) return <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
                <Image 
					source={require('./images/cfood.gif')}   
					style={{width:2*width/3,height:600*width/1200}}
				/>
            </View>
        else
		return (
		  <View style={styles.container}>
		  <StatusBar backgroundColor="#90D077"/>
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
                  	<ScrollView style={{marginBottom:200,}}>
                        {
						this.state.items.map((val, index) => {
							if(val.id == this.state.item.id ){
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
                          
                         
                          
                    </ScrollView>
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
			
				<TouchableOpacity activeOpacity={0.8} onPress={this._search} style={{position:'absolute', right: 47, top: 50}}>
                    <Icon name={'ios-search'} size={25} color='#fff' />
                  </TouchableOpacity>
			<TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout} style={{position:'absolute', right: 15, top: 50}}>
                    <Image
                        source={require('./images/lb-icon.png')}
                    />
                  </TouchableOpacity>
			</View>
			<ScrollView style={[{width: width, height: height - 85 - 80}]} >
			<View>
				
				<View>
				<TouchableOpacity   style={{width: width - 40, marginLeft: 20, marginTop: 30}} onPress={this._showPost2}>
			  
				<Text maxFontSizeMultiplier={1} style={{width: width - 40,  textAlign: "center", color: "#90D077", fontSize: 20, fontWeight: "bold"}}>
					{ this.state.item.title }
				</Text>
				
			 
			</TouchableOpacity>
				<WebView
		style={{ height: this.state.webViewHeight,height:340, }}
		onMessage={this.onWebViewMessage}
          
          injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'

         source={{html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div style="width: 100% overflow-y: scroll"><div>'+this.state.item.mota+'</div><img src="'+'http://casfood.vn/' + this.state.item.image+'"/></div><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script>$(document).ready(function(){ $("img").attr("height", "auto");$("img").attr("width", "100%");});</script></body></html>'}} />
				
	  
						
				</View>
				<View style={{marginBottom: 70}}>
				{
						this.state.items.map((val, index) => {
							if(val.id != this.state.item.id && val.dieukhoan != 1 && val.status_ == 1)
							return(
		              <TouchableOpacity style={styles.new} key={index} onPress={this._showPost.bind(this, index)}>
		              		<View style={styles.new_image}>
		              			<Image 
									 source={{uri: 'http://casfood.vn/' + val.image,width: width*.4 - 20, height: (width*.4 -20)}} />
		              		</View>
		              		<View style={styles.new_title}>
		              				<Text maxFontSizeMultiplier={1} style={styles.new_title_text}>{val.title}</Text>
		              				<Text maxFontSizeMultiplier={1} style={styles.new_title_text_}>{val.mota}</Text>
		              		</View>
		              </TouchableOpacity>
						)
						})
				}
			</View>	
			</View>	
			</ScrollView>
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
		color: '#000',
        fontSize: 16
    },
  formGroup: {
        flexDirection: 'column', 
        marginBottom: 16, 
        paddingHorizontal: 0
    },
	itemInput: {
        flexDirection: 'row', 
		borderRadius: 10,
		backgroundColor: '#fff',
		color: '#757F8C',
		marginTop: 5,
		
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
    bottom:70,
    position:'absolute',
    right:20,
  },
  popup_naviga:{
    marginLeft:20,
  },
  popup_naviga_text:{
    paddingTop:5,
    paddingBottom:5,

    marginTop:10,
	fontWeight: 'bold'
  },
  wrapper:{
		height:height,
		paddingBottom:70,
	},
 	header_section:{
	    flexDirection:'row',
	    flexWrap:'wrap',
	    backgroundColor:'#fff',
	    paddingTop:5,
	    paddingBottom:5,
  	},
	page: {
    textAlign: 'center',

    marginTop: 10,
    marginBottom: 10,
    marginLeft:10,

    paddingBottom:5,
    paddingTop:5,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
	header_left:{
	    alignItems:'center',
	    width:width*0.1,
	},
  	header_right:{
	    alignItems:'flex-start',
	    width:width*0.1,
  	},
  	header_middle:{
    	width:width*0.7,
  	},
  	new:{
  		flexDirection:'row',
  		flexWrap:'wrap',
  		backgroundColor:'#fff',
  		marginTop:10,
  	},
  	new_image:{
  		width:width*0.4,
  		paddingLeft:15,
  	},
  	new_title:{
  		width:width*0.6,
  		paddingRight:15,
  	},
  	new_title_text:{
  		marginLeft:15,
  		marginTop:10,
  		color:'#0f1738',
  		fontSize:16,
  		fontWeight:'bold',
  		
  	},
	new_title_text_:{
  		marginLeft:15,
  		marginTop:10,
  		color:'#0f1738',
  		fontSize:14,
  		
  	},
  	bottom_bar:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopColor:'#e6e6e6',
    borderTopWidth:2,
    position:'absolute',
    bottom:0,
    backgroundColor:'#f8f8f8',
    paddingBottom:20,
  },
  scrollview_section:{
		height: height - 200
	},
  width25:{
    width:width*0.25,
    alignItems:'center',
    marginTop:5,
  },
  bottom1:{
    color:'#8d8d8d',
    fontSize:12,
  },
});
export default connect(mapStateToProps)(Home)