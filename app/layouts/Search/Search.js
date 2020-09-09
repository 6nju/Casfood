
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
class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
			phone: this.props.user_login.phone,
			items: [],
			key_ezxx: 1,
			nguyenlieu: this.props.nguyenlieu,
			
        }
		if(this.state.nguyenlieu != ''){
			apis.getItemFoot(this.state.nguyenlieu)
			.then(res => {
				this.setState({
					items: res.data.data
				})		
			})
			.catch(err => {
				this.setState({ process: false })
				if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
						
				return showMessage({ message: 'Lỗi', description:  'Có lỗi trong quá trình kết nối', type: "warning" })
			})
		}
            
       
    }
	
	_showInfo(val) {
		Actions.searchinfo({val: val})
	}		
	
	_save = () => {
		this.setState({expanded : !this.state.expanded})
		apis.getItemFoot(this.state.nguyenlieu)
        .then(res => {
			this.setState({
				items: res.data.data
			})		
        })
        .catch(err => {
			this.setState({ process: false })
			if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					
			return showMessage({ message: 'Lỗi', description:  'Có lỗi trong quá trình kết nối', type: "warning" })
        })
		
	
		
	 }
	_back = () => {
		Actions.pop()
	 }
	 

	  render() {
		  const { process, nguyenlieu } = this.state
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
			<Text maxFontSizeMultiplier={1} style={[styles.buttonText, styles.title, {color: '#000'}]}>
				    Casfood
			</Text>
			</View>
			<View style={[{width: width, height: height - 85}]} >
			<ScrollView>
			
			<TouchableOpacity style={{position: 'relative', marginTop: 0,width: width, height: 300*(width)/1000,marginLeft:0, backgroundColor:'#0BB689'}}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/tracuu.jpg') }
                    style={{width: width, height: 300*(width)/1000,borderRadius:20}}

                />
				
			</View>	
			</TouchableOpacity>
			<TouchableOpacity >
				<Text maxFontSizeMultiplier={1} style={{width: width - 10,marginLeft: 5, fontSize: 16, fontWeight:'bold'}}>
					Nhập nguyên liệu 
				</Text>
			</TouchableOpacity>
			
						
			
					<View style={[ styles.formGroup, {marginBottom: 20} ]}>
                    <View style={ styles.itemInput  }>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Nguyên liệu"
							placeholderTextColor="#757F8C"
							onChangeText={(nguyenlieu) => this.setState({ nguyenlieu: nguyenlieu  })}
							value={nguyenlieu}
						/>
					</View>
					<TouchableOpacity onPress={this._save} style={{width: 100, backgroundColor: '#90D077', borderRadius:5,borderWidth: 1, borderColor: '#fff',position: 'absolute', zIndex: 100, height:30, top:5, right: 20}} >
					  <View>
						<Text maxFontSizeMultiplier={1} style={{width: 100, height:30, justifyContent: 'center', textAlign: 'center', color: '#fff', fontSize: 15}}>
							Tra cứu
						</Text>
					  </View>
					</TouchableOpacity>
					<View style={{width:width, height: !this.state.expanded ? null : 0, overflow: 'hidden', }}>
					<Text maxFontSizeMultiplier={1} style={{width: width - 10,marginLeft: 5, fontSize: 13,marginTop:20,textAlign:'center'}}>
						Nguồn dữ lệu thực phẩm được trích dẫn từ 'Bảng thành phần thực phẩm Việt Nam - Viện dinh dưỡng ' và Bộ nông nghiệp Hoa Kỳ (USDA).
					</Text>
					</View>
                </View>
			<View style={{paddingTop: 10, paddingBottom: 5}}>
				{
					this.state.items.map((val, index) => {
						
							return (
							<View>
							<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
								<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }}  key={index}  onPress={this._showInfo.bind(this, val)}>
								<Image 
								source={{uri: 'http://casfood.vn/' + val.image,width: 35, height: 35}} style={{position: 'absolute', top: -10, left: 0}}/>
								
								<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 35}]}>
									{val.title}
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropright'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
							</View>
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
  itemList: {
		zIndex: 0,
		position: 'relative',
		
		
		height:40,
		flexDirection: 'row',
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
export default connect(mapStateToProps)(Search)