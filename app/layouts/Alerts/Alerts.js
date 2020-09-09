
import React, { Component } from 'react'
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  CheckBox,
  Linking,
  Arert,
  TextInput,
  Alert,
  StatusBar,
  Dimensions,
  Image,
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
class Alerts extends Component {
    constructor(props) {
        super(props)
        this.state = {
			additional: 0,
			secure: true,
			process: false,
			cannang: '',

			enegy: 0,
			change : 0,
			phone: this.props.user_login.phone,
        }
		 Alert.alert(
						'Thông báo',
						'Lưu ý: Bạn cần nhập ít nhất 2 kết quả xét nghiệm trở lên để theo dõi trên biểu đồ',
					)
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
	 _saveHDL = () => {
		  Actions.alertinfotow({type_: 5, title: 'HDL-Cholesterol', don_vi_1: 'mmol/L', don_vi_2: 'mg/dL', heso_1: '1', heso_2: '38.7', max: '1.6', min: '0.9', mota:'Vai trò của HDL-Cholesterol (Cholesterol tỷ trọng cao) trong chuyển hóa mỡ (lipid) là vận chuyển và hấp thu Cholesterol từ các mô ngoại biên về gan thông qua quá trình vận chuyển Cholesterol ngược (Cơ chế bảo vệ tim mạch). Việc xác định nồng độ HDL-Cholesterol là công cụ hữu ích để xác định bệnh nhân có nguy cơ cao bệnh mạch vành' })
	 }
	 _saveGlu = () => {
		 Actions.alertinfotow({type_: 6, title: 'Glucose', don_vi_1: 'mmol/L', don_vi_2: 'mg/dL', heso_1: '1', heso_2: '18', max: '6.0', min: '3.9', mota: 'Xét nghiệm Glucose máu thông thường được sử dụng trong hỗ trợ chẩn đoán và điều trị Đái tháo đường (ĐTĐ). Việc theo dõi sự thay đổi nồng độ glucose máu trên biểu đồ giúp bạn đánh giá xu hướng và đưa ra chế độ ăn phù hợp để phòng và điều trị ĐTĐ.Các nồng độ cần chú ý theo dõi: 6.0 – 6.9 mmol/L (theo dõi tình trạng rối loạn dung nạp đường); >7.0 mmol/L (theo dõi bệnh Đái tháo đường). Hiệp hội Đái tháo đường Hoa Kỳ khuyến cáo sử dụng nồng độ Glucose máu khi đói là 5.5 mmol/L làm giới hạn trên của mức "bình thường"'})
	 }
	 _saveTri = () => {
		  Actions.alertinfotow({type_: 7, title: 'Triglycerid', don_vi_1: 'mmol/L', don_vi_2: 'mg/dL', heso_1: '1', heso_2: '88.5', max: '2.3', min: '0.46', mota: 'Xét nghiệm Triglyceride máu rất quan trọng trong chẩn đoán và điều trị bệnh mỡ máu cao. Chương trình giáo dục quốc gia về Cholesterol của Hoa Kỳ trích dẫn dữ liệu cho thấy Triglyceride là một yếu tố độc lập cảnh báo nguy cơ cho bệnh xơ vữa động mạch'})
	 }
	 _saveLDL = () => {
		  Actions.alertinfotow({type_: 8, title: 'LDL-Cholesterol', don_vi_1: 'mmol/L', don_vi_2: 'mg/dL', heso_1: '1', heso_2: '38.7', max: '3.4', min: '2.2', mota:'Các nghiên cứu đều chỉ ra rằng LDL-Cholesterol (Cholesterol tỷ trọng thấp) là yếu tố chính trong việc khởi phát bệnh xơ vữa động mạch và bệnh mạch vành, còn HDL-Cholesterol được đánh giá có tác dụng bảo vệ. Thậm chí khi nồng độ Cholesterol toàn phần nằm trong giới hạn bình thường nhưng LDL-Cholesterol tăng vẫn có thể dẫn đến nguy cơ bệnh mạch vành.'})
	 }
	 _saveCho = () => {
		  Actions.alertinfotow({type_: 9, title: 'Cholesterol', don_vi_1: 'mmol/L', don_vi_2: 'mg/dL', heso_1: '1', heso_2: '38.7', max: '5.2', min: '3.9', mota: 'Nồng độ Cholesterol quan trọng trong chẩn đoán và phân loại bệnh tăng mỡ (lipid) máu. Chương trình quốc gia về Cholesterol của Hoa Kỳ (NCEP) khuyến cáo người trưởng thành từ 20 tuổi trở lên nên làm xét nghiệm Cholesterol ít nhất 5 năm một lần để kiểm tra sàng lọc nguy cơ bệnh mạch vành.'})
	 }
	 _saveHb = () => {
		  Actions.alertinfotow({type_: 10, title: 'HbA1c', don_vi_1: '%', don_vi_2: '%', heso_1: '1', heso_2: '1', max: '6.2', min: '4.0', mota:'HbA1c là một loại Hemoglobin đặc biệt kết hợp giữa hemoglobin và đường glucose. Nó đại diện cho tình trạng gắn kết của đường trên Hemoglobin (Hb) hồng cầu . Bình thường Hb chiếm 4-6 % trong toàn bộ hemoglobin. Chỉ số HbA1c phản ánh tình trạng kiểm soát đường của bệnh nhân trong vòng 3 tháng, giúp bác sĩ đưa ra phác đồ điều trị.'})
	 }
	 _save = () => {
		
		
		 Actions.alertinfo({type_: 1, title: 'Cân nặng', don_vi: 'Kg'})
	 }
	 _saveVm = () => {
		
		
		 Actions.alertinfo({type_: 2, title: 'Tỷ lệ mỡ toàn thân', don_vi: '%'})
	 }
	  _saveHa = () => {
		
		
		 Actions.alertinfo({type_: 3, title: 'Huyết Áp tối đa', don_vi: 'mmHg'})
	 }
	 _saveHatt = () => {
		
		
		 Actions.alertinfo({type_: 12, title: 'Huyết Áp tối thiểu', don_vi: 'mmHg'})
	 }
	 _saveNt = () => {
		
		
		 Actions.alertinfo({type_: 4, title: 'Nhịp Tim', don_vi: 'nhịp/phút'})
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
		  const { secure, process, cannang } = this.state
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
				    Sức khỏe
			</Text>
			
			</View>
			
			<View style={[{width: width, height: height - 85 - 80}]} >
			<ScrollView style={[{width: width, height: height - 85 - 80}]}>
			
			
			
			<TouchableOpacity style={{position: 'relative', marginTop: 0,width: width, height: 100*(width)/1000,marginLeft:0, backgroundColor:'#000'}}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/tk2.jpg') }
                    style={{width: width, height: 100*(width)/1000}}

                />
				
			</View>	
			</TouchableOpacity>
			<View>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={this._save}>
					
					<ScrollView style={[{width: width - 40, height: 40}]} horizontal={true}>
					
					
					<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 0}]}>
						
						Cân nặng
					</Text>
					</ScrollView>
					<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropright'} size={20} color='#757F8C' />
					</Text>
					</TouchableOpacity>
					
					
					
					
					
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={this._saveVm}>
					
					<ScrollView style={[{width: width - 40, height: 40}]} horizontal={true}>
					
					
					<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 0}]}>
						Tỷ lệ mỡ toàn thân
					</Text>
					</ScrollView>
					<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropright'} size={20} color='#757F8C' />
					</Text>
					</TouchableOpacity>
					
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }}  onPress={this._saveHa}>
					
					<ScrollView style={[{width: width - 40, height: 40}]} horizontal={true}>
					
					
					<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 0}]}>
						
						Huyết áp tối đa
					</Text>
					</ScrollView>
					<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropright'} size={20} color='#757F8C' />
					</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }}  onPress={this._saveHatt}>
					
					<ScrollView style={[{width: width - 40, height: 40}]} horizontal={true}>
					
					
					<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 0}]}>
						
						Huyết áp tối thiểu
					</Text>
					</ScrollView>
					<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropright'} size={20} color='#757F8C' />
					</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }}   onPress={this._saveNt}>
					
					<ScrollView style={[{width: width - 40, height: 40}]} horizontal={true}>
					
					
					<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 0}]}>
						
						Nhịp Tim
					</Text>
					</ScrollView>
					<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropright'} size={20} color='#757F8C' />
					</Text>
					</TouchableOpacity>
			</View>
			<TouchableOpacity style={{position: 'relative', marginTop: 0,width: width, height: 100*(width)/1000,marginLeft:0, backgroundColor:'#000'}}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/tk3.jpg') }
                    style={{width: width, height: 100*(width)/1000}}

                />
				
			</View>	
			</TouchableOpacity>
			
			<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={this._saveGlu}>
					
					<ScrollView style={[{width: width - 40, height: 40}]} horizontal={true}>
					
					
					<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 0}]}>
						
						Đường máu(Glucose)
					</Text>
					</ScrollView>
					<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropright'} size={20} color='#757F8C' />
					</Text>
					</TouchableOpacity>
					
			<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={this._saveTri}>
					
					<ScrollView style={[{width: width - 40, height: 40}]} horizontal={true}>
					
					
					<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 0}]}>
						
						Triglycerid
					</Text>
					</ScrollView>
					<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropright'} size={20} color='#757F8C' />
					</Text>
					</TouchableOpacity>

				<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={this._saveCho}>
					
					<ScrollView style={[{width: width - 40, height: 40}]} horizontal={true}>
					
					
					<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 0}]}>
						
						Cholesterol
					</Text>
					</ScrollView>
					<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropright'} size={20} color='#757F8C' />
					</Text>
					</TouchableOpacity>
							
							
							<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={this._saveLDL}>
					
					<ScrollView style={[{width: width - 40, height: 40}]} horizontal={true}>
					
					
					<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 0}]}>
						
						LDL-Cholesterol
					</Text>
					</ScrollView>
					<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropright'} size={20} color='#757F8C' />
					</Text>
					</TouchableOpacity>
					
					
					
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={this._saveHDL}>
					
					<ScrollView style={[{width: width - 40, height: 40}]} horizontal={true}>
					
					
					<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 0}]}>
						
						HDL-Cholesterol
					</Text>
					</ScrollView>
					<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropright'} size={20} color='#757F8C' />
					</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={this._saveHb}>
					
					<ScrollView style={[{width: width - 40, height: 40}]} horizontal={true}>
					
					
					<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 0}]}>
						
						HbA1c
					</Text>
					</ScrollView>
					<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropright'} size={20} color='#757F8C' />
					</Text>
					</TouchableOpacity>
					
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
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', color: '#757F8C', fontSize: 12}}>
				    Sức khỏe
				</Text>
				
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
        fontSize: 13
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
		position: 'relative',
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
  itemListText_: {
		color: '#757F8C',
		fontSize: 16,
		minWidth: width - 10,
		marginLeft: 10,
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
export default connect(mapStateToProps)(Alerts)