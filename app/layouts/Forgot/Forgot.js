
import React, { Component } from 'react'
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  Picker,
  StyleSheet,
  Alert,
  View,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { apis } from '../../configs'
import Axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'
const height = Dimensions.get('window').height
import RNPickerSelect from 'react-native-picker-select';
import {Actions} from 'react-native-router-flux';
const width = Dimensions.get('window').width
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
	
})
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
class Forgot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
			secure: true,
			process: false,
			rePassword: '',
			playItem: '',
			current_job: 0,
			height: '',
			jobId: -1,
			password: '',
						jobItem: [
				{label: 'Bác sĩ', value: 'Bác sĩ', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}]},
				{label: 'Bán hàng tại chợ và quầy hàng', value: 'Bán hàng tại chợ và quầy hàng', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}]},
				{label: 'Bảo vệ, nghỉ hưu', value: 'Bảo vệ, nghỉ hưu', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}]},
				{label: 'Biên đạo múa', value: 'Biên đạo múa', items: [{label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}]},
				{label: 'Bộ đội', value: 'Bộ đội', items: [{label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}]},
				{label: 'Bộ đội tập luyện', value: 'Bộ đội tập luyện', items: [{label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Ca sĩ', value: 'Ca sĩ', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}]},
				{label: 'Cắt tóc, gội đầu', value: 'Cắt tóc, gội đầu', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}]},
				{label: 'Chăn nuôi, nghề nông', value: 'Chăn nuôi, nghề nông', items: [{label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Công an', value: 'Công an', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}]},
				{label: 'Công nhân là việc trong các nhà máy', value: 'Công nhân là việc trong các nhà máy',items: [{label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Đặc công', value: 'Đặc công', items: [{label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Ngư dân đánh bắt hải sản', value: 'Ngư dân đánh bắt hải sản', items: [{label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Đạo diễn', value: 'Đạo diễn', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}]},
				{label: 'Đầu bếp', value: 'Đầu bếp', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}]},
				{label: 'Diễn viên', value: 'Diễn viên', items: [{label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}]},
				{label: 'Điều dưỡng, Y tá', value: 'Điều dưỡng, Y tá', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}]},
				{label: 'Giáo viên', value: 'Giáo viên', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}]},
				{label: 'Giáo viên mầm non, trông giữ trẻ', value: 'Giáo viên mầm non, trông giữ trẻ', items: [{label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}]},
				{label: 'Hộ lý', value: 'Hộ lý', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}]},
				{label: 'Họa sĩ, nhạc sĩ', value: 'Họa sĩ, nhạc sĩ', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}]},
				{label: 'Hướng dẫn viên du lịch', value: 'Hướng dẫn viên du lịch', items: [{label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}]},
				{label: 'Kỹ sư công nghệ thông tin', value: 'Kỹ sư công nghệ thông tin', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}]},
				{label: 'Lính tinh nhuệ đặc biệt', value: 'Lính tinh nhuệ đặc biệt', items: [{label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Luật sư', value: 'Luật sư', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}]},
				{label: 'Massage', value: 'Massage', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}]},
				{label: 'MC', value: 'MC', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}]},
				{label: 'Nghề mộc', value: 'Nghề mộc', items: [{label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Nghề thêu', value: 'Nghề thêu', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}]},
				{label: 'Người mẫu', value: 'Người mẫu', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}]},
				{label: 'Nhà báo, nhiếp ảnh', value: 'Nhà báo, nhiếp ảnh', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}]},
				{label: 'Nhà nghiên cứu', value: 'Nhà nghiên cứu', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}]},
				{label: 'Nhà tâm lý học', value: 'Nhà tâm lý học', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}]},
				{label: 'Nhà văn', value: 'Nhà văn', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}]},
				{label: 'Nhạc công', value: 'Nhạc công', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}]},
				{label: 'Nhân viên đánh máy', value: 'Nhân viên đánh máy', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}]},
				{label: 'Nhân viên xét nghiệm, thí nghiệm', value: 'Nhân viên xét nghiệm, thí nghiệm', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}]},
				{label: 'Nhân viên văn phòng', value: 'Nhân viên văn phòng', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}]},
				{label: 'Nhân viên vệ sinh', value: 'Nhân viên vệ sinh', items: [{label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}]},
				{label: 'Nuôi trồng thủy hải sản', value: 'Nuôi trồng thủy hải sản', items: [{label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Phát thanh viên', value: 'Phát thanh viên', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}]},
				{label: 'Phu bốc xếp hàng hóa', value: 'Phu bốc xếp hàng hóa', items: [{label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Phụ hồ', value: 'Phụ hồ', items: [{label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Phục vụ nhà hàng', value: 'Phục vụ nhà hàng', items: [{label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}]},
				{label: 'Sinh viên', value: 'Sinh viên', items: [{label: 'Nhẹ', value: '1.375'}, {label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}]},
				{label: 'Tài xế', value: 'Tài xế', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}]},
				{label: 'Thợ may', value: 'Thợ may', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}]},
				{label: 'Thợ xây', value: 'Thợ xây', items: [{label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Thợ sẻ đá, cắt đá', value: 'Thợ sẻ đá, cắt đá', items: [{label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Thợ điện', value: 'Thợ điện', items: [{label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Thợ sơn', value: 'Thợ sơn', items: [{label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Thợ hàn', value: 'Thợ hàn', items: [{label: 'Trung bình', value: '1.55'}, {label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				
				{label: 'Thợ rèn', value: 'Thợ rèn', items: [{label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Thợ làm khuôn đúc kim loại', value: 'Thợ làm khuôn đúc kim loại', items: [{label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Thợ lắp đặt dây cáp', value: 'Thợ lắp đặt dây cáp', items: [{label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Thợ lắp đặt kim loại xây dựng', value: 'Thợ lắp đặt kim loại xây dựng', items: [{label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Thợ lặn', value: 'Thợ lặn', items: [{label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Thu ngân, kế toán', value: 'Thu ngân, kế toán', items: [{label: 'Thụ động', value: '1.2'}, {label: 'Nhẹ', value: '1.375'}]},
				{label: 'Vận động viên', value: 'Vận động viên', items: [{label: 'Năng động', value: '1.725'}, {label: 'Tích cực', value: '1.9'}]},
				{label: 'Khác', value: 'Khác', items: [
				{label: 'Thụ động', value: '1.2'},
				{label: 'Nhẹ', value: '1.375'}, 
				{label: 'Trung bình', value: '1.55'},
				{label: 'Năng động', value: '1.725'}, 
				{label: 'Tích cực', value: '1.9'},
			]},
			],
        }
    }
	 
	_register = () => {
		const { username, password, rePassword, current_job, height } = this.state
		if (rePassword != password)return Alert.alert('Thông báo',  'Xác nhận mật khẩu không đúng' )
        if (!username.trim()) return Alert.alert('Thông báo',  'Chưa nhập số điện thoại' )
        if (!height.trim()) return Alert.alert('Thông báo',  'Chưa nhập chiều cao' )
        if (!current_job.trim())return Alert.alert('Thông báo',  'Chưa chọn nghề nghiệp' )
        if (!password.trim())return Alert.alert('Thông báo',  'chưa nhập mật khẩu' )

       
            apis.forgot(username, password, height, current_job)
                .then(res => {
				
						
						Alert.alert('Thông báo',  res.data.message )
						

                })
                .catch(err => {
			
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					Alert.alert('Thông báo',  'Có lỗi trong quá trình đăng ký' )
					
                })
     
		//Actions.stepone()
	 }
	_back = () => {
		Actions.pop()
	 }
	 

	  render() {
		  const { username, password, secure, rePassword, process, height, current_job } = this.state
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
			<Text maxFontSizeMultiplier={1} style={[styles.buttonText, styles.title]}>
				    Đổi mật khẩu
			</Text>
			</View>
			<View style={{width: width, height: (height - 85), marginTop: 0}} >
				<View style={ styles.formGroup }>
                    
                    <View style={ styles.itemInput }>
						<TouchableOpacity onPress={() => this.setState({ secure: !secure })}>
                            <Icon name={'ios-person'} size={24} color='#757F8C' />
                        </TouchableOpacity>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Số điện thoại"
							placeholderTextColor="#757F8C"
							onChangeText={(username) => this.setState({ username })}
							value={username}
						/>
						
						
					</View>
                </View>
				
				<View style={ [styles.formGroup] }>
				<View style={[ styles.itemInput,{marginTop: 5} ]}>
						<TouchableOpacity style={{position:'absolute',top:-5,left:1,}} onPress={() => this.setState({ secure: !secure })}>
                            <Icon name={'ios-journal'} size={24} color='#757F8C' />
                        </TouchableOpacity>
				 
				<RNPickerSelect
					onValueChange={(value, index)  => {
						let key_ = index - 1				
							this.setState({current_job: value, job: value, jobId: key_, playItem: this.state.jobItem[key_].items, playId: -1})
					}}
					
					value={this.state.current_job}
					style={{
						placeholder: {
 							fontSize:16,
 							color: '#757F8C',
 							textAlign:'left',
              				},
              			inputIOS: {
              			marginBottom:8,
				    	color: '#757F8C',
				    	fontSize:16,
				    	marginLeft:27,
				    	
					},
					}}
					placeholder={{
                        label: 'Chọn nghề nghiệp',
                        color: '#757F8C',
                        value: -1,
                    }}
					items={this.state.jobItem}
				/>
				</View>	
				</View>	
				
				<View style={ styles.formGroup }>
                    
                    <View style={[ styles.itemInput,{marginTop: 5} ]}>
						<TouchableOpacity onPress={() => this.setState({ secure: !secure })}>
                            <Icon name={'ios-man'} size={24} color='#757F8C' />
                        </TouchableOpacity>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{marginLeft: 5}, styles.input ]}
							
							placeholder="Chiều cao(cm)"
							placeholderTextColor="#757F8C"
							onChangeText={(height) => this.setState({ height })}
							value={height}
						/>
						
					</View>
                </View>
				<View style={ styles.formGroup }>
                    
                    <View style={[ styles.itemInput,{marginTop: 5} ]}>
						<TouchableOpacity onPress={() => this.setState({ secure: !secure })}>
                            <Icon name={'ios-lock'} size={24} color='#757F8C' />
                        </TouchableOpacity>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{marginLeft: 5}, styles.input ]}
							secureTextEntry={secure}
							placeholder="Mật khẩu mới"
							placeholderTextColor="#757F8C"
							onChangeText={(password) => this.setState({ password })}
							value={password}
						/>
						
					</View>
                </View>
				<View style={ styles.formGroup }>
                    
                    <View style={[ styles.itemInput,{marginTop: 5} ]}>
						<TouchableOpacity onPress={() => this.setState({ secure: !secure })}>
                            <Icon name={'ios-lock'} size={24} color='#757F8C' />
                        </TouchableOpacity>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{marginLeft: 5}, styles.input ]}
							secureTextEntry={secure}
							placeholder="Nhập lại mật khẩu mới"
							placeholderTextColor="#757F8C"
							onChangeText={(rePassword) => this.setState({ rePassword })}
							value={rePassword}
						/>
						
					</View>
                </View>
				
				
				<TouchableOpacity   style={{width: width - 72, shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,  elevation: 5,marginLeft: 36,paddingVertical: 15,marginTop: 15,backgroundColor: '#90D077'}} onPress={this._register}>
				<View style={{}}>
					<View style={{ height: '100%', position: 'absolute', top: 0, left: 12, alignItems: 'center', justifyContent: 'center' }}>
                        {process ? <ActivityIndicator color={'white'} /> : null}
                    </View>
					<Text maxFontSizeMultiplier={1} style={{width: width - 72, color: '#fff',  textAlign: 'center',}}>
						Đổi mật khẩu
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
        flexDirection: 'column', 
        marginBottom: 16, 
        paddingHorizontal: 16
    },
	itemInput: {
        flexDirection: 'row', 
		width: width - 72,
		marginLeft: 20,
		marginTop: 20,
        borderColor: '#757F8C',
        borderBottomWidth: 1, 
        
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
  
  back: {
	zIndex: 1,
	left:0,
	bottom:-0,
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
    fontWeight: 'bold',
	fontSize: 15,
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
export default connect(mapStateToProps)(Forgot)