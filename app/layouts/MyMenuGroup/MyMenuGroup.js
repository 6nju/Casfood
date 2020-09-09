
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
class MyMenuGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
			phone: this.props.user_login.phone,
			items: [],
			key_ezxx: 1,
			data: [
				'Bữa sáng', 'Bữa trưa', 'Bữa tối', 'Bữa phụ'
			],
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
				{title: 'Beta caroten', total_: 0, don_vi: 'mcg', percen: ''},
			],
        }
		
            apis.getItemMenuGroup(this.state.phone)
                .then(res => {
					this.setState({ process: false, items: res.data.items })
					let a = [
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
											{title: 'Beta caroten', total_: 0, don_vi: 'mcg', percen: ''},
										];
					
					for(let i = 0; i < res.data.arrays.length; i++){
						a[0].total_ = a[0].total_ + res.data.arrays[i][0].total_
						a[1].total_ = a[1].total_ + res.data.arrays[i][1].total_ 
						a[2].total_ = a[2].total_ + res.data.arrays[i][2].total_ 
						a[3].total_ = a[3].total_ + res.data.arrays[i][3].total_ 
						a[4].total_ = a[4].total_ + res.data.arrays[i][4].total_ 
						a[5].total_ = a[5].total_ + res.data.arrays[i][5].total_ 
						a[6].total_ = a[6].total_ + res.data.arrays[i][6].total_ 
						a[7].total_ = a[7].total_ + res.data.arrays[i][7].total_ 
						a[8].total_ = a[8].total_ + res.data.arrays[i][8].total_ 
						a[9].total_ = a[9].total_ + res.data.arrays[i][9].total_
						a[10].total_ = a[10].total_ + res.data.arrays[i][10].total_ 
						a[11].total_ = a[11].total_ + res.data.arrays[i][11].total_ 
						a[12].total_ = a[12].total_ + res.data.arrays[i][12].total_ 
						a[13].total_ = a[13].total_ + res.data.arrays[i][13].total_ 
					}
					a[1].percen = Math.floor(((a[1].total_ * 4)/ a[0].total_) * 100);
					a[3].percen = Math.floor(((a[3].total_ * 4)/ a[0].total_) * 100);
					a[2].percen= 100 - a[1].percen - a[3].percen;
					this.setState({ array_: a })
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
	_back = () => {
		Actions.pop()
	 }
	 

	  render() {
		  const { process } = this.state
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
			
			</View>
			<View style={[{width: width, height: height - 85}]} >
			<ScrollView>
			
			<TouchableOpacity style={{position: 'relative', marginTop: 0,width: width, height: 300*(width)/1000,marginLeft:0, backgroundColor:'#175427'}}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/m8.jpg') }
                    style={{width: width, height: 300*(width)/1000,borderRadius:20}}

                />
				
			</View>	
			</TouchableOpacity>
			<View style={[{width: width}]} >
			{
				this.state.items.map((val, index) => {
					return (
						<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5}]}>
							<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width, borderColor: '#757F8C',borderBottomWidth: 1 }}  key={index} onPress={this._showMenu.bind(this, index)}>
								<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {fontWeight: 'bold'}]}>
									{
										this.state.data[val.meal]
									}
								</Text>
							
							</TouchableOpacity>
						</View>
					)
				})
			}
				
			</View>
			<View style={[{width: width,  marginBottom: 10, marginTop: -4, height: 40, backgroundColor: '#ddd', position: 'relative'}]} >
				
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 10, fontWeight: 'bold'}]}>
				    GIÁ TRỊ DINH DƯỠNG CẢ NGÀY
				</Text>
			</View>
			<View style={{width:width, marginTop: -10}}>	
				
				{
				this.state.array_.map((val, index) => {
						
				
				return(
				<View style={[{width: width,  height: 40, backgroundColor: '#E7F0E4', position: 'relative'}]} >
						<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
							{val.title}: {parseFloat(val.total_).toFixed(0)}{val.don_vi}{ (val.percen != '') ?  ' ' + val.percen+'%' : ''}
						</Text>
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
export default connect(mapStateToProps)(MyMenuGroup)