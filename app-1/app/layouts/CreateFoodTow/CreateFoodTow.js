
import React, { Component } from 'react'
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  StatusBar,
  TextInput,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Picker,
  Alert
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons'
const height = Dimensions.get('window').height
import RNPickerSelect from 'react-native-picker-select';
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
class CreateFoodTow extends Component {
    constructor(props) {
        super(props)
        this.state = {
			phone: this.props.user_login.phone,
			isShow: false,
			process: false,
			group: '',
			nguyenlieu: '',
			timkiem: '',
			name: '',

			t: height,
			height: height,
			khoiluong: 0,
			enegry: '',
			protein: '',
			lipid: '',
			glucid: '',
			vitamin_a: '',
			cenlluloza: '',
			vitamin_c: '',
			calci: '',
			fe: '',
			natri: '',
			kali: '',
			zn: '',
			cholesterol: '',
			beta: '',
			array_: [
				{title: 'Năng lượng', total_: 0, don_vi: 'Kcal', percen: ''},
				{title: 'Protein', total_: 0, don_vi: 'g', percen: 0},
				{title: 'Lipid', total_: 0, don_vi: 'g', percen: 0},
				{title: 'Glucid', total_: 0, don_vi: 'g', percen: 0},
				{title: 'Vitamin A', total_: 0, don_vi: 'mcg', percen: ''},
				{title: 'Celluloza', total_: 0, don_vi: 'g', percen: ''},
				{title: 'Vitamin C', total_: 0, don_vi: 'mcg', percen: ''},
				{title: 'Calci', total_: 0, don_vi: 'mg', percen: ''},
				{title: 'Fe', total_: 0, don_vi: 'mg', percen: ''},
				{title: 'Natri', total_: 0, don_vi: 'mg', percen: ''},
				{title: 'Kali', total_: 0, don_vi: 'mg', percen: ''},
				{title: 'Zn', total_: 0, don_vi: 'mg', percen: ''},
				{title: 'Cholesterol', total_: 0, don_vi: 'mg', percen: ''},
				{title: 'Beta caroten', total_: 0, don_vi: 'mcg', percen: ''},,
			],
			groups: [],
			foods: [],
			items: [],
			data: [],
			l: 10,
			

			
        }    
		apis.getFood(this.state.phone)
                .then(res => {
					this.setState({ foods: res.data.foods, groups: res.data.groups })
                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					
					return showMessage({ message: 'Lỗi', description:  'Có lỗi trong quá trình kết nối', type: "warning" })
                })
    }
	_save = () => {
	const { process, name, isShow,khoiluong, nguyenlieu, timkiem, enegry, protein, lipid, glucid, vitamin_a, cenlluloza, vitamin_c, calci, fe, natri, kali, zn, cholesterol, beta } = this.state
		let data = {
			name: this.state.name,
			group: this.state.group,
			khoiluong: khoiluong,
			enegry: enegry,
			protein: protein,
			lipid: lipid,
			glucid: glucid,
			vitamin_a: vitamin_a,
			cenlluloza: cenlluloza,
			vitamin_c: vitamin_c,
			calci: calci,
			fe: fe,
			natri: natri,
			kali: kali,
			zn: zn,
			cholesterol: cholesterol,
			beta: beta,

		}
		
		let send_ = JSON.stringify(data)
		apis.saveFoodTow(send_, this.state.phone)
                .then(res => {
					Alert.alert('Thông báo',  'Bạn đã lưu món ăn vào thực đơn tổng' )
                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					
					return Alert.alert('Thông báo',  'Có lỗi trong quá trình kết nối' )
                })
	}
	pickClick(id) {
		let array_ = this.state.items
		let data = this.state.data
		
		if(array_[id].status){
			for(let i = 0; i < data.length; i++){
				if(data[i].id == id){
					data.splice(i, 1);
				}
			}
		}else{
			
			data.push({id: id, value: array_[id], khoiluong: ''});
		}
		
		array_[id].status = !array_[id].status;
		this.setState({
		  data: data,
		  items: array_
		})
	}
	_stepfour = () => {
		Actions.stepfour()
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
	_offBreakfast = () => {
		this.setState({
		  timkiem: '',
		})
		this.setState({
		  foods: [],
		})
		let items = this.state.items
		this.setState({
		  isShow: !this.state.isShow,
		  foods: items,
		})
		
		this.setState({
		  height: height,

		})
	 }
	_showFood = () => {
		let items = this.state.foods

		this.setState({
		  isShow: !this.state.isShow,

		  items: items, 
		  l: 10,

		})

		LayoutAnimation.configureNext(
		  LayoutAnimation.create(
			400,
			LayoutAnimation.Types.easeInEaseOut,
			LayoutAnimation.Properties.scaleXY,
		  ),
		);
		this.setState({t: height*.5, l: 0})
	}
	_stepGroup = () => {
		Actions.menugroup()
	}
	_menuList = () => {
		Actions.mymenu()
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
	 

	  render() {
		  const { process, name, isShow, nguyenlieu, khoiluong, timkiem, enegry, protein, lipid, glucid, vitamin_a, cenlluloza, vitamin_c, calci, fe, natri, kali, zn, cholesterol, beta } = this.state
		return (
		  <View style={styles.container}>
			<View style={[styles.box, {width: width, height: 85}]} >
			<StatusBar backgroundColor="#fff" barStyle="dark-content" />
			
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
			<TouchableOpacity   style={styles.button} onPress={this._save}>
					
					
				  <View>
				<Text maxFontSizeMultiplier={1} style={[styles.buttonText, {color: '#000'}]}>
						Lưu
				</Text>
				</View>
				
				
				</TouchableOpacity>
			</View>
			<View style={[{width: width, height: height - 85}]} >
			<ScrollView style={[{width: width, height: height - 85}]}>
			<TouchableOpacity style={{position: 'relative', marginTop: 0,width: width, height: 300*(width)/1000,marginLeft:0, backgroundColor:'#42949f'}}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/nguyenlieu.jpg') }
                    style={{width: width, height: 300*(width)/1000,borderRadius:20}}

                />
				
			</View>	
			</TouchableOpacity>
			
			<View style={[{width: width,  marginBottom: 10, marginTop: -4, height: 40, backgroundColor: '#ddd', position: 'relative'}]} >
				<Text maxFontSizeMultiplier={1} style={styles.icon}>
				    <Icon style={{top:10, marginTop:10}} name={'ios-help-circle-outline'} size={15} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40}]}>
				    Tạo món ăn mới?
				</Text>
			</View>	
			<View style={ [styles.formGroup],{height: 40} }>
                    
                    <View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{fontWeight:'bold',}, styles.input ]}
							placeholder="Tên món ăn"
							placeholderTextColor="#757F8C"
							onChangeText={(name) => this.setState({ name })}
							value={name}
						/>
						
						
					</View>
                </View>	
				
				<View style={ [styles.formGroup, {borderColor: '#757F8C',borderBottomWidth: 1, height: 40}] }>
				 <RNPickerSelect
								  value={this.state.group}
									placeholder={{
										label: 'Chọn nhóm?',
										value: '',
									}}
									style={{
										
						placeholder: {
 							fontSize:16,
							color: '#757F8C',
							fontWeight:'bold',		
              			},
              			inputAndroid: {
              			fontSize:16,
						color: '#757F8C',
						fontWeight:'bold',
				    
						},
						inputIOS: {
						marginLeft:10,
						marginTop:7,
				    	
						},
					}}
					
									items={this.state.groups}
								  onValueChange={(value, index) => {  
										this.setState({group: value})
								  }}/>
				
				</View>
				<View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Khối lượng trên 1 khẩu phần"
							placeholderTextColor="#757F8C"
							onChangeText={(khoiluong) => this.setState({ khoiluong })}
							value={khoiluong}
						/>
						
						
					</View>
				 <View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Năng Lượng(Kcal)"
							placeholderTextColor="#757F8C"
							onChangeText={(enegry) => this.setState({ enegry })}
							value={enegry}
						/>
						
						
					</View>
				
				<View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Protein(g)"
							placeholderTextColor="#757F8C"
							onChangeText={(protein) => this.setState({ protein })}
							value={protein}
						/>
						
						
					</View>
				<View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Lipid(g)"
							placeholderTextColor="#757F8C"
							onChangeText={(lipid) => this.setState({ lipid })}
							value={lipid}
						/>
						
						
					</View>
				<View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Glucid(g)"
							placeholderTextColor="#757F8C"
							onChangeText={(glucid) => this.setState({ glucid })}
							value={glucid}
						/>
						
						
					</View>
				<View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Vitamin A(mcg)"
							placeholderTextColor="#757F8C"
							onChangeText={(vitamin_a) => this.setState({ vitamin_a })}
							value={vitamin_a}
						/>
						
						
					</View>
				<View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Cenlluloza(g)"
							placeholderTextColor="#757F8C"
							onChangeText={(cenlluloza) => this.setState({ cenlluloza })}
							value={cenlluloza}
						/>
						
						
					</View>
					
				<View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Vitamin C(mcg)"
							placeholderTextColor="#757F8C"
							onChangeText={(vitamin_c) => this.setState({ vitamin_c })}
							value={vitamin_c}
						/>
						
						
					</View>
					
					<View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Calci(mg)"
							placeholderTextColor="#757F8C"
							onChangeText={(calci) => this.setState({ calci })}
							value={calci}
						/>
						
						
					</View>
					
					<View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Fe(mg)"
							placeholderTextColor="#757F8C"
							onChangeText={(fe) => this.setState({ fe })}
							value={fe}
						/>
						
						
					</View>
					<View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Natri(mg)"
							placeholderTextColor="#757F8C"
							onChangeText={(natri) => this.setState({ natri })}
							value={natri}
						/>
						
						
					</View>
					<View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Kali(mg)"
							placeholderTextColor="#757F8C"
							onChangeText={(kali) => this.setState({ kali })}
							value={kali}
						/>
						
						
					</View>
					<View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Zn(mg)"
							placeholderTextColor="#757F8C"
							onChangeText={(zn) => this.setState({ zn })}
							value={zn}
						/>
						
						
					</View>
					<View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Cholesterol(mg)"
							placeholderTextColor="#757F8C"
							onChangeText={(cholesterol) => this.setState({ cholesterol })}
							value={cholesterol}
						/>
						
						
					</View>
					<View style={ [styles.itemInput],{height: 35, borderColor: '#757F8C',borderBottomWidth: 1,} }>
						
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Beta Caroten(mcg)"
							placeholderTextColor="#757F8C"
							onChangeText={(beta) => this.setState({ beta })}
							value={beta}
						/>
						
						
					</View>
			</ScrollView>	
			</View>
			
			{
				isShow ? 
					<View style={[styles.wrapOption, {height: height*.5 + 50, backgroundColor: '#fff', top: this.state.t, left: this.state.l, zIndex: 99,  bottom: -50}]}>
					<ScrollView>
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
							<TouchableOpacity style={{height: 30, top: 10, right:10, position: 'absolute', zIndex: 10}} onPress={this._offBreakfast}>
							<Text>Xong</Text>
							</TouchableOpacity>
						</View>
					</View>
						{
						this.state.items.map((val, index) => {
							if(val.title.toUpperCase().includes(this.state.timkiem.toUpperCase()))
							return (
								<View style={{height: 40, position: 'relative', zIndex: 1}}>
								<TouchableOpacity style={{height: 30, marginTop: 10, position: 'relative', zIndex: 1}} key={index} onPress={this.pickClick.bind(this, index)}>
									<Text maxFontSizeMultiplier={1} style={[styles.itemOption, {marginLeft: 15}]}>
										{val.title}
									</Text>
									{val.status ? 
										<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
											<Icon style={{top:4, marginTop:10}} name={'ios-checkmark'} size={32} color='#90D077' />
										</Text>
									: null
					
									}
								</TouchableOpacity>
								
								</View>
							
							
							)
						  })
						}

					</ScrollView>
					</View>
					
					: null
					
					}
			{
				isShow ?
				<View style={[styles.wrapOption, {height: height, width: width, top: 0, left: 0, backgroundColor: '#000', opacity: 0.5, zIndex: 2}]}>
					<TouchableOpacity style={{height: height, width: width}} onPress={this._offBreakfast}>
					
					</TouchableOpacity>
					</View>
					: null
					
				}
		  </View>
		);
	  }
}
const styles = StyleSheet.create({
	itemList: {
		zIndex: 0,
		position: 'relative',
		width: width,
		borderColor: '#757F8C',
		borderBottomWidth: 1,
		height:40,
		flexDirection: 'row',
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
  itemListText: {
	color: '#757F8C',
    fontSize: 16,
	width: width - 40,
	marginLeft: 10,
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
export default connect(mapStateToProps)(CreateFoodTow)