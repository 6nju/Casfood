
import React, { Component } from 'react'
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  CheckBox,
  TextInput,
  Linking,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Picker
} from 'react-native';

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
class Heavy extends Component {
    constructor(props) {
        super(props)
        this.state = {
			additional: 0,
			secure: true,
			process: false,
			enegy: 0,
			change : 0,
			phone: this.props.user_login.phone,
        }
    }
	onSelectedItemsChange = selectedItems => {
		this.setState({ selectedItems });
	  };
		
	_alert = () => {
		
		this.setState({ process: true }, () => {
            apis.saveAlert(this.state.phone, this.state.enegy, this.state.additional, this.state.change)
                .then(res => {
					this.setState({ process: false })
					return showMessage({ message: res.data.message, type: "warning" })
					Actions.stepfour({phone: phone})
					
					
                })
                .catch(err => {
					this.setState({ process: false })
					return showMessage({ message: 'Lỗi', type: "warning" })
                    this.setState({ process: false })
                    console.log(err.response)
                    return showMessage({ message: 'An error occurred during login', type: "error" })
                })
        })   
		
	 }
			
			
	_next = () => {
		const { job, sick, sport, play, hour, phone, radioSelected } = this.state
		this.setState({ process: true }, () => {
            apis.stepthree(job, sick, sport, play, hour, phone, radioSelected)
                .then(res => {
					this.setState({ process: false })
					return showMessage({ message: res.data.message, type: "warning" })
					Actions.stepfour({phone: phone})
					
					
                })
                .catch(err => {
					this.setState({ process: false })
					return showMessage({ message: err.data.message, type: "error" })
                    this.setState({ process: false })
                    console.log(err.response)
                    return showMessage({ message: 'An error occurred during login', type: "error" })
                })
        })   
		
	 }
	_back = () => {
		Actions.pop()
	 }
	 enegy(id) {
		 this.setState({
		  enegy: id
		})
	 }
	_facebook = () => {
		Actions.facebook()
	}
	
	_menu = () => {
		Actions.list()
	}
	 _friends = () => {
		Actions.friends()
	 }
	  _facebook_ = () => {
	  	Linking.openURL("fb-messenger://user-thread/449529225233733");
		
	 }
	 _home = () => {
		Actions.home({tess_: '1111'})
	}
	 additional(id) {
		this.setState({
		  additional: id
		})
	  }
	  change(id) {
		this.setState({
		  change: id
		})
	  }

	  render() {
		  const { secure, process } = this.state
		  const options = [{
			  id: 0,
			  text: 'Ít quá'
			},
			{
			  id: 1,
			  text: 'Nhiều quá'
			},
			{
			  id: 2,
			  text: 'Phù hợp'
			}];
		  const help = [{
			  id: 0,
			  text: 'Có tôi cần hỗ trợ'
			},
			{
			  id: 1,
			  text: 'Không, cảm ơn'
			}];
		  const options_ = [{
			  id: 0,
			  text: 'Phù hợp'
			},
			{
			  id: 1,
			  text: 'Cần thay đổi'
			}];
		return (
		
		  <View style={styles.container}>
		  <StatusBar backgroundColor="#90D077"/>
			<View style={[styles.box, {width: width, height: 85}]} >
			<TouchableOpacity   style={styles.back} onPress={this._back}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={styles.buttonText}>
				    <Icon style={{top:10, marginTop:10}} name={'md-arrow-back'} size={20} color='#fff' />
				</Text>
				
			  </View>
			  
			</TouchableOpacity>
			<Text maxFontSizeMultiplier={1} style={[styles.buttonText, styles.title]}>
				    Thông báo
				</Text>
			</View>
			<View style={[{width: width, height: height - 85 - 80}]} >
			<ScrollView style={[{width: width, height: height - 85 - 80}]}>
			<View style={[{width: width,  marginBottom: 7, height: 40, backgroundColor: '#ddd', position: 'relative'}]} >
				<Text maxFontSizeMultiplier={1} style={styles.icon}>
				    <Icon style={{top:10, marginTop:10}} name={'ios-help-circle-outline'} size={15} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40}]}>
				    Năng lượng bữa ăn có đủ hay không?
				</Text>
			</View>
			<View style={[{width: width}]} >
				
			
			{
			options.map((val) => {
				return (
					<View style={ [styles.formGroup, {height: 40}] }>
                    
                    
				  <TouchableOpacity  style={ [styles.itemInput, {position: 'relative', marginTop: 10,height: 30, width: width}] } key={val.id} onPress={this.enegy.bind(this, val.id)}>
					<View style={{
					  height: 20,
					  width: 20,
					  borderRadius: 10,
					  borderWidth: 1,
					  borderColor: '#757F8C',
					  alignItems: 'center',
					  justifyContent: 'center',
					  position: 'absolute',
					  bottom: 7,
					  left: 10
					}}>
					  {
						val.id == this.state.enegy ?
						  <View style={{
							height: 14,
							width: 14,
							borderRadius: 7,
							backgroundColor: '#90D077',
						  }} />
						  : null
					  }
					</View>
					<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40}]}>
						{val.text}
					</Text>
				  </TouchableOpacity>
				  
				
				  </View>
				)
			  })
			}
			</View>
			
			
			<View style={[{width: width,  marginBottom: 7, height: 60,marginTop: -4, backgroundColor: '#ddd', position: 'relative'}]} >
				<Text maxFontSizeMultiplier={1} style={styles.icon}>
				    <Icon style={{top:10, marginTop:10}} name={'ios-help-circle-outline'} size={15} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40, width: width - 60}]}>
				    Tỷ lệ năng lượng giữa các bữa ăn có phù hợp không?
				</Text>
			</View>
			<View style={[{width: width}]} >
				
			
			{
			options_.map((val) => {
				return (
					<View style={ [styles.formGroup, {height: 60}] }>
                    
                    
				  <TouchableOpacity  style={ [styles.itemInput, {position: 'relative', marginTop: 10,height: 30, width: width}] } key={val.id} onPress={this.additional.bind(this, val.id)}>
					<View style={{
					  height: 20,
					  width: 20,
					  borderRadius: 10,
					  borderWidth: 1,
					  borderColor: '#757F8C',
					  alignItems: 'center',
					  justifyContent: 'center',
					  position: 'absolute',
					  bottom: 7,
					  left: 10
					}}>
					  {
						val.id == this.state.additional ?
						  <View style={{
							height: 14,
							width: 14,
							borderRadius: 7,
							backgroundColor: '#90D077',
						  }} />
						  : null
					  }
					</View>
					<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40}]}>
						{val.text}
					</Text>
				  </TouchableOpacity>
				  
				
				  </View>
				)
			  })
			}
			</View>
			
			<View style={[{width: width,  marginBottom: 7, height: 60,marginTop: -4, backgroundColor: '#ddd', position: 'relative'}]} >
				<Text maxFontSizeMultiplier={1} style={styles.icon}>
				    <Icon style={{top:10, marginTop:10}} name={'ios-help-circle-outline'} size={15} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40, width: width - 60}]}>
				    Nếu bạn cần hỗ trợ chúng tôi sẽ liên lạc sớm nhất với bạn?
				</Text>
			</View>
			<View style={[{width: width}]} >
				
			
			{
			help.map((val) => {
				return (
					<View style={ [styles.formGroup, {height: 40}] }>
                    
                    
				  <TouchableOpacity  style={ [styles.itemInput, {position: 'relative', marginTop: 10,height: 30, width: width}] } key={val.id} onPress={this.change.bind(this, val.id)}>
					<View style={{
					  height: 20,
					  width: 20,
					  borderRadius: 10,
					  borderWidth: 1,
					  borderColor: '#757F8C',
					  alignItems: 'center',
					  justifyContent: 'center',
					  position: 'absolute',
					  bottom: 7,
					  left: 10
					}}>
					  {
						val.id == this.state.change ?
						  <View style={{
							height: 14,
							width: 14,
							borderRadius: 7,
							backgroundColor: '#90D077',
						  }} />
						  : null
					  }
					</View>
					<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40}]}>
						{val.text}
					</Text>
				  </TouchableOpacity>
				  
				
				  </View>
				)
			  })
			}
			</View>
			<View style={ [styles.formGroup,{height: 150}] }>
			<TouchableOpacity   style={{width: width - 72, shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,  elevation: 5,marginLeft: 36,paddingVertical: 15,marginTop: 15,backgroundColor: '#90D077'}} onPress={() => this._alert()}>
				<View style={{}}>
					<View style={{ height: '100%', position: 'absolute', top: 0, left: 12, alignItems: 'center', justifyContent: 'center' }}>
                        {process ? <ActivityIndicator color={'white'} /> : null}
                    </View>
					<Text maxFontSizeMultiplier={1} style={{width: width - 72, color: '#fff',  textAlign: 'center',}}>
						Cập nhật
					</Text>
					
				  </View>
				</TouchableOpacity>
				<TouchableOpacity   style={{width: width - 72, shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,  elevation: 5,marginLeft: 36,paddingVertical: 15,marginTop: 15,backgroundColor: '#4267b2'}}  onPress={this._facebook_}>
				<View style={{}}>
					<View style={{ height: '100%', position: 'absolute', top: 0, left: 12, alignItems: 'center', justifyContent: 'center' }}>
                        {process ? <ActivityIndicator color={'white'} /> : null}
                    </View>
					<Text maxFontSizeMultiplier={1} style={{width: width - 72, color: '#fff',  textAlign: 'center',}}>
						Liên hệ với chúng tôi
					</Text>
					
				  </View>
				</TouchableOpacity>
			</View>
			
			
			</ScrollView>
			</View>

			<View style={[{width: width, height: 80,position: 'absolute', bottom: 0, backgroundColor: '#fff', shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 2,  elevation: 5,}]} >
			<TouchableOpacity   onPress={this._menu} style={{position: 'absolute', width: width*.2, height:80, top:0, left:0}}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', marginTop: 10}}>
				    <Icon style={{top:10, marginTop:7}} name={'ios-restaurant'} size={41} color='#757F8C' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', color: '#757F8C', fontSize: 12}}>
				    Thực đơn
				</Text>
			  </View>
			</TouchableOpacity>
			<TouchableOpacity   onPress={this._facebook} style={{position: 'absolute', width: width*.2, height:80, top:0, left:width*.2}}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', marginTop: 10}}>
				    <Icon style={{top:10, marginTop:7}} name={'md-person-add'} size={41} color='#757F8C' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', color: '#757F8C', fontSize: 12}}>
				    Bạn bè
				</Text>
			  </View>
			</TouchableOpacity>
			<TouchableOpacity   style={{position: 'absolute', width: width*.2, height:80, top:0, left:width*.4}}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', marginTop: 10}}>
				    <Icon style={{top:10, marginTop:7}} name={'ios-heart'} size={41} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', color: '#90D077', fontSize: 12}}>
				    Sức khỏe				</Text>
			  </View>
			</TouchableOpacity>
			<TouchableOpacity   style={{position: 'absolute', width: width*.2, height:80, top:0, left:width*.6}}  onPress={this._home}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', marginTop: 10}}>
				    <Icon style={{top:10, marginTop:7}} name={'ios-paper'} size={41} color='#757F8C' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', color: '#757F8C', fontSize: 12}}>
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
        height:30,
        marginBottom: 4, 
        paddingHorizontal: 0
    },
	itemInput: {
        flexDirection: 'row', 
		width: width,
		color: '#757F8C',

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
});
export default connect(mapStateToProps)(Heavy)