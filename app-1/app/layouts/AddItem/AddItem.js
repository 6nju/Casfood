
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
  StatusBar,
  Image,
  ActivityIndicator,
  Picker,
  ScrollView,
  Alert
} from 'react-native';
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
class AddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
			phone: this.props.user_login.phone,
			category: this.props.category,
			name_: this.props.name_,
			keyData: this.props.keyData,
			key: this.props.type_,
			index: this.props.key_,
			isShow: this.props.isShow,
			isShowTow: this.props.isShowTow,
			keyDataTow: this.props.keyDataTow,
			items: [],
			timkiem: '',
			
        }
		
            apis.listFoodPhoneType(this.state.phone, this.state.category, this.state.key)
                .then(res => {
				
					this.setState({
						items: res.data.items
					})
                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					
					return showMessage({ message: 'Lỗi', description:  'Có lỗi trong quá trình kết nối', type: "warning" })
                })
       
    }
	
	_showMenu(id) {
		Actions.infomenu({id: this.state.items[id].id})
	}		
	
	_next = () => {
		
		if(this.state.age >= 3 && this.state.age <= 5){
			
			Actions.stepfour({phone: this.state.phone, password: this.state.password})
		}else{
			
			Actions.stepthree({phone: this.state.phone, password: this.state.password, age: this.state.age})
		}
		
	
		
	 }
	 _save = () => {
		 let array_ = []
		for(let i = 0; i < this.state.items.length; i++){
			if(this.state.items[i].status){
				array_.push(this.state.items[i].id);
			}
		}
		let send_ = JSON.stringify(array_)
		
		apis.saveItemCustom(this.state.phone, this.state.key, send_)
                .then(res => {
					 Actions.menu({reload_: 1, isShow: this.state.isShow, isShowTow: this.state.isShowTow, key_: this.state.index, type_: this.state.key, keyData: this.state.keyData, keyDataTow: this.state.keyDataTow}) 
                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
						Alert.alert('Thông báo',  'Có lỗi trong quá trình kết nối')
					return;
                })
	}
	_back = () => {
		Actions.pop()
	 }
	 
	pickClickTow(id, val) {
		let items = this.state.items
		items[id].status = !items[id].status
		this.setState({ items: items })
	}
	  render() {
		  const { process, timkiem } = this.state
		  let key = 0
		return (
		  <View style={styles.container}>
		  <StatusBar backgroundColor="#fff" barStyle="dark-content" />
			<View style={[styles.box, {width: width, height: 85}]} >
			
			
			<TouchableOpacity   style={styles.back} onPress={this._back}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={styles.buttonText}>
				    <Icon style={{top:10, marginTop:10}} name={'md-arrow-back'} size={20} color='#000' />
				</Text>
			  </View>
			</TouchableOpacity>
			<Text maxFontSizeMultiplier={1} style={[styles.buttonText, styles.title,{color:'#000'}]}>
				{this.state.name_}
			</Text>
			<TouchableOpacity   style={[styles.button]} onPress={this._save}>
					
				<View>
			<Text maxFontSizeMultiplier={1} style={[styles.buttonText, {color:'#000'}]}>
					Lưu
			</Text>
			</View>
			
				
			
			</TouchableOpacity>
			</View>
			<View style={ [styles.formGroup],{height: 45}}>
						<View style={ [styles.itemInput,{marginTop: 10}],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
							
							<TextInput maxFontSizeMultiplier={1} 
								autoCorrect={false}
								returnKeyType='done'
								style={[{}, styles.input ]}
								placeholder="Tìm kiếm"
								placeholderTextColor="#757F8C"
								onChangeText={(timkiem) => {
									let items = this.state.items
									
									this.setState({ timkiem, items: [] })
									this.setState({ items: items })
								}}
								value={timkiem}
							/>
							
						</View>
					</View>
			<View style={[{width: width, height: height - 85}]} >
			<ScrollView style={{marginBottom:40}}>
			
			
			<View style={[{width: width}]} >
			{
						this.state.items.map((val, index) => {
							if(val.title.toUpperCase().includes(this.state.timkiem.toUpperCase()))
							return (
								<View style={{height: 50, position: 'relative', zIndex: 1}}>
								<TouchableOpacity style={{height: 30, marginTop: 10, position: 'relative', zIndex: 1}} key={index} onPress={this.pickClickTow.bind(this, index, this.state.keyDataTow)}>
									{ 
										(val.lydo == null)
										?
									<ScrollView style={[{width: width - 10, height: 40}]} horizontal={true}>
									
									<Text maxFontSizeMultiplier={1} style={[styles.itemOption, {marginLeft: 15, width: width - 40, fontSize: 14}]}>
										{val.title} <Text maxFontSizeMultiplier={1} style={{color: '#90D077'}}>{val.nenan}</Text>
									</Text>
									</ScrollView>
									:
									<ScrollView style={[{width: width - 10, height: 40}]} horizontal={true}>
									
									<Text maxFontSizeMultiplier={1} style={[styles.itemOption, {marginLeft: 15, width: width - 40, fontSize: 14}]}>
										{val.title} <Text maxFontSizeMultiplier={1} style={{color: 'red', fontSize: 12}}>{val.lydo}</Text><Text maxFontSizeMultiplier={1} style={{color: '#90D077'}}>{val.nenan}</Text>
									</Text>
									
									</ScrollView>
									}
									{val.status ? 
										<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
											<Icon style={{top:-4, marginTop:10}} name={'ios-checkmark'} size={32} color='#90D077' />
										</Text>
									: null
					
									}
								</TouchableOpacity>
								
								</View>
							
							
							)
						  })
						}
				
			</View>
			
			</ScrollView>
			</View>
		  </View>
		);
	  }
}
const styles = StyleSheet.create({
	input: {
        margin: 0, 
        padding: 0, 
        flex: 1, 
        height: 50, 
        paddingLeft: 8, 
		color: '#757F8C',
        fontSize: 16
    },
  formGroup: {
        flexDirection: 'column', 
        marginBottom: 5, 
        paddingHorizontal: 0
    },
	wrapOption: {
		shadowColor: '#000',
		
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 2,  
		elevation: 5,
		position: 'absolute',
		width: width,

		
	},
	itemOption: {
		zIndex: 3,
		position: 'relative',
		justifyContent: 'center', 
		width: width - 80,

		
		
	},
	itemList: {
		zIndex: 0,
		position: 'relative',
		
		
		height:40,
		flexDirection: 'row',
	},
	
	itemListText_: {
		color: '#757F8C',
		fontSize: 16,
		minWidth: width - 10,
		marginLeft: 10,
	},
	itemListText: {
	color: '#757F8C',
    fontSize: 16,
	width: width - 40,
	marginLeft: 10,
  },
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
        marginBottom: 5, 
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
    backgroundColor: '#fff',
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
export default connect(mapStateToProps)(AddItem)