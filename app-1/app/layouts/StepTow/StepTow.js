
import React, { Component } from 'react'
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Image,
  Dimensions,
  ActivityIndicator,
  Picker,
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
class StepTow extends Component {
    constructor(props) {
        super(props)
        this.state = {
			phone: this.props.phone,
			password: this.props.password,
			sex: this.props.sex,
			age: this.props.age,
			process: false,
			alert_: 'Bạn hơi thừa cân theo đánh giá của IDI&WPRO',
			body: '0',
			bmi: '0',
			weight_: '0',

			
        }
		
            apis.steptow(this.state.phone)
                .then(res => {
					this.setState({ process: false, bmi: res.data.bmi,body: parseFloat(res.data.body).toFixed(1), alert_: res.data.alert_, weight_: parseFloat(res.data.wish_).toFixed(1) })
                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					Alert.alert('Thông báo',  'Có lỗi trong quá trình đăng ký' )
					
                })
			
    }
	
		
	
	_next = () => {
		let d = new Date();
		let n = d.getFullYear();
		let old = n - this.state.age;
		if(old >= 3 && old <= 5){
			
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
			<View style={[{width: width}]} >
				<Text maxFontSizeMultiplier={1} style={{marginTop: 20, width: width, textAlign: 'center', color: '#90D077',  fontSize: 20, fontWeight: 'bold'}}>
				    BMI của bạn là {this.state.bmi}
				</Text>
				<Text maxFontSizeMultiplier={1} style={[{marginLeft: 20,marginTop: 25, color: '#757F8C', width: width - 40, textAlign: 'center', fontSize: 20, fontWeight: 'bold'}]}>
				    {this.state.alert_}
				</Text>
				<Text maxFontSizeMultiplier={1} style={[{marginLeft: 20, marginTop: 15, color: '#757F8C', width: width - 40, textAlign: 'center', fontSize: 15}]}>
				    ( IDI&&WPRO là viện nghiên cứu bệnh đái tháo đường thế giới ( International Diabetes Institute - IDI ) và cơ quan khu vực Thái Bình Dương của tổ chức y tế thế giới )
				</Text>
				<Text maxFontSizeMultiplier={1} style={{marginTop: 20, width: width, textAlign: 'center', color: '#90D077',  fontSize: 20, fontWeight: 'bold'}}>
				    Cân nặng lý tưởng theo IDI&&WPRO của bạn là {this.state.weight_} Kg
				</Text>
				<Text maxFontSizeMultiplier={1} style={{marginTop: 20, width: width, textAlign: 'center', color: '#90D077',  fontSize: 20, fontWeight: 'bold'}}>
				   Tỷ lệ mỡ toàn thân của bạn là {this.state.body}% ± 2.4%
				</Text>
			</View>
			{
				(this.state.sex == 0) ?
			<TouchableOpacity style={{position: 'relative', marginTop: 20, width: width*.6, height: 347*(width)/299,marginLeft:width*.2}} onPress={this._menuSport}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/0.png') }
                    style={{width: width*.6, height: 370*(width*.6)/299}}

                />
				
			</View>	
			
			</TouchableOpacity>
			:
			<TouchableOpacity style={{position: 'relative', marginTop: 20, width: width*.6, height: 347*(width)/299,marginLeft:width*.2}} onPress={this._menuSport}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/1.png') }
                    style={{width: width*.6, height: 370*(width*.6)/299}}

                />
				
			</View>	
			
			</TouchableOpacity>
			}
			
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
});
export default connect(mapStateToProps)(StepTow)