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
  Picker
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons'
const height = Dimensions.get('window').height
import {Actions} from 'react-native-router-flux';
const width = Dimensions.get('window').width
import { connect } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select';

const mapStateToProps = (state) => ({
	
})
const { UIManager } = NativeModules;
let items = [{
		id: '0',
		name: 'Nam',
	  }, {
		id: '1',
		name: 'Nữ',
	  }];
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
class StepOne extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: this.props.phone,
            password: this.props.password,

            name: '',
			secure: true,
			process: false,
			old: '',
			mangthai: 0,
			_height: '',
			_weight: '',
			sex: '',
			selectedItems : '',
			
        }
		 
    }
	onSelectedItemsChange = selectedItems => {
		this.setState({ selectedItems });
	};
		
	
	_next = () => {
		const { name, old, _height, _weight, sex, phone, mangthai } = this.state
		
        if (!name.trim()) return Alert.alert('Thông báo',  'Chưa nhập Tên' )
        if (!old.trim()) return  Alert.alert('Thông báo',  'Chưa nhập năm sinh' )
        if (!_height.trim()) return Alert.alert('Thông báo',  'Chưa nhập chiều cao' )
        if (!_weight.trim()) return Alert.alert('Thông báo',  'Chưa nhập cân nặng' )
        if (sex == '') return Alert.alert('Thông báo',  'Bạn chưa chọn giới tính' )
        this.setState({ process: true }, () => {
            apis.stepone(name, old, _height, _weight, sex, phone, mangthai)
                .then(res => {
					this.setState({ process: false })
					
					
					let d = new Date();
					let n = d.getFullYear();
					let old_ = parseInt(n) - parseInt(old);
					
					
					if(old_ <= 5){
						Actions.stepfour({phone: this.state.phone, password: this.state.password, age: old_})
					}else if(old_ > 19){
						Actions.steptow({phone: this.state.phone, password: this.state.password, age: old_, sex: sex})
					}else{
						Actions.stepthree({phone: this.state.phone, password: this.state.password, age: old_})
					}
					
                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					Alert.alert('Thông báo',  'Có lỗi trong quá trình đăng ký' )
					
                })
        })     

	 }
	_back = () => {
		Actions.pop()
	 }
	 

	  render() {
		  const { name, old, secure, _height, _weight, sex, selectedItems, process, phone, mangthai } = this.state
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
			<TouchableOpacity   style={styles.button} onPress={this._next}>
			  <View>
			<Text maxFontSizeMultiplier={1} style={[styles.buttonText]}>
				    Tiếp
			</Text>
			</View>
			</TouchableOpacity>
			</View>
			<View style={[{width: width,  height: 40, backgroundColor: '#ddd', position: 'relative'}]} >
				<Text maxFontSizeMultiplier={1} style={styles.icon}>
				    <Icon style={{top:10, marginTop:10}} name={'ios-help-circle-outline'} size={15} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40, fontWeight:'bold'}]}>
				    Thông tin cá nhân
				</Text>
			</View>
			<View style={{width: width, height: (height - 85), marginTop: 0}} >
				<View style={ [styles.formGroup, {height: 50}] }>
                    
                    <View style={ styles.itemInput }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Họ và tên"
							placeholderTextColor="#757F8C"
							onChangeText={(name) => this.setState({ name })}
							value={name}
						/>
						
						
					</View>
                </View>
				<View style={ [styles.formGroup, {height: 50}] }>
                    
                    <View style={ styles.itemInput }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Năm sinh"
							placeholderTextColor="#757F8C"
							onChangeText={(old) => this.setState({ old })}
							value={old}
						/>
						
						
					</View>
                </View>
				<View style={ [styles.formGroup, {height: 50}] }>                   
                    <View style={ styles.itemInput }>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Chiều cao(cm)"
							placeholderTextColor="#757F8C"
							onChangeText={(_height) => this.setState({ _height })}
							value={_height}
						/>
						
						
					</View>
                </View>
				
				<View style={ [styles.formGroup, {height: 50}] }>
                    <View style={ styles.itemInput }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Cân nặng(kg)"
							placeholderTextColor="#757F8C"
							onChangeText={(_weight) => this.setState({ _weight })}
							value={_weight}
						/>
					</View>
                </View>
				<View style={ [styles.formGroup, {height: 50}] }>
				<RNPickerSelect
				placeholder={{
										label: 'Chọn giới tính',
										value: ''
									}}
									style={{
										
						placeholder: {
 							fontSize:16,
							color: '#757F8C',
							marginTop:15
              				},
              			inputIOS: {
				    marginLeft:10,
				    fontSize:16,
				    color: '#757F8C',
				    marginTop:15,
				    
  				},
					}}
				value={this.state.sex}
            onValueChange={(itemValue, itemIndex) =>
					this.setState({sex: itemValue})
				  }
            items={[
                { label: 'Nam', value: '0' },
                { label: 'Nữ', value: '1' },
                
            ]}
        />
				
				</View>
				{
				(this.state.sex == 1) ? 
				<View style={ [styles.formGroup, {height: 50, borderColor: '#757F8C',borderBottomWidth: 1,}] }>
				 <RNPickerSelect
				placeholder={{
										label: 'Nếu bạn có thai ?',
										value: -1,
									}}
									style={{
										
						placeholder: {
 							fontSize:16,
							color: '#757F8C',
							marginTop:15,
              				},
              			inputIOS: {
				    marginLeft:10,
				    fontSize:16,
					color: '#757F8C',
				    marginTop:15,
				    
  				},
					}}
				value={this.state.mangthai}
            onValueChange={(itemValue, itemIndex) =>
					this.setState({mangthai: itemValue})
				  }
            items={[
                { label: 'Không mang thai', value: '0' },
                { label: 'Mang thai 3 tháng đầu', value: '1' },
                { label: 'Mang thai 3 tháng giữa', value: '2' },
                { label: 'Mang thai 3 tháng cuối', value: '3' },
                { label: 'Đang cho con bú', value: '4' },
            ]}
        />
				
				</View>
				:null
			}
				
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
        paddingHorizontal: 0
    },
	itemInput: {
        flexDirection: 'row', 
		width: width,
		color: '#757F8C',
		marginTop: 15,
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
export default connect(mapStateToProps)(StepOne)