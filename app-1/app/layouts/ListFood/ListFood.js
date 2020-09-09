
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
class ListFood extends Component {
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
		
            apis.getCreateFood(this.state.phone)
                .then(res => {
				
					this.setState({ items: res.data.data })
                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					
					return showMessage({ message: 'Lỗi', description:  'Có lỗi trong quá trình kết nối', type: "warning" })
                })
       
    }
	
	_showGroup(id) {
		apis.deleteCreateFood(id)
                .then(res => {
					this.setState({ items: res.data.data })
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
			
			</View>
			<View style={[{width: width, height: height - 85}]} >
			<ScrollView>
	  <View style={{marginBottom: 20}}>
			<TouchableOpacity style={{position: 'relative', marginTop: 0,width: width, height: 300*(width)/1000,marginLeft:0,}}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/menu.jpg') }
                    style={{width: width, height: 300*(width)/1000,}}

                />
				
			</View>	
			</TouchableOpacity>
			{
										this.state.items.map((val_, index_) => {
											
											return (
											<View style={{width: width, borderBottomWidth: 1, borderColor: '#ddd', paddingBottom: 10}}>
											<Text maxFontSizeMultiplier={1} style={[styles.itemListText,{fontSize: 16, marginTop: 8}]}>
												{val_.title}  
											</Text>
											<TouchableOpacity style={[{zIndex: 100,marginTop:5,}, {right: 20,	position: 'absolute', top: 15}]} key={index_} onPress={ this._showGroup.bind(this, val_.id ) }>
						<Text maxFontSizeMultiplier={1} style={[{zIndex: 10,bottom:15,color: '#fff',fontSize: 20,}, {color: '#757F8C', fontSize: 15}]}>
							<Icon style={{top:15, marginTop:25}} name={'md-trash'} size={20} color='#000000' />
						</Text>
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
export default connect(mapStateToProps)(ListFood)