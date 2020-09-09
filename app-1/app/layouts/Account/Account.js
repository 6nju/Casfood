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
  ActivityIndicator,
  Image,
  ScrollView,
  Picker,
  Alert
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons'
const height = Dimensions.get('window').height
import {Actions, ActionConst} from 'react-native-router-flux';
const width = Dimensions.get('window').width
import { connect } from 'react-redux'
import MultiSelect from 'react-native-multiple-select';
import RNPickerSelect from 'react-native-picker-select';

import Axios from 'axios';
import { ActionCreators } from '../../redux/ActionCreators';

const mapStateToProps = (state) => ({
	user_login: state.user_login
})
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
			phone: this.props.user_login.phone,
			name: this.props.user_login.name,
			age: this.props.user_login.age,
			sex: this.props.user_login.gender,
			height_: this.props.user_login.height,
			weight: this.props.user_login.weight,
			cannang: this.props.user_login.cannang,
			current_job: this.props.user_login.current_job,
			current_sport: (this.props.user_login) ? this.props.user_login.current_sport : [],
			data: [],
			sick: (this.props.user_login.disease) ? this.props.user_login.disease : 0,
			jobId: -1,
			timkiem: '',
			mangthai: (this.props.user_login.mangthai) ? this.props.user_login.mangthai : 0,
			t: 0,
			l: 0,
			items: [],
			process: false,
			playItem: [
				{label: 'Thụ động', value: '1.2',muc_do: 'Thụ động', he_so: '1.2'},
				{label: 'Nhẹ', value: '1.375',muc_do: 'Nhẹ', he_so: '1.375'}, 
				{label: 'Trung bình', value: '1.55',muc_do: 'Trung bình', he_so: '1.55'},
				{label: 'Năng động', value: '1.725',muc_do: 'Năng động', he_so: '1.725'}, 
				{label: 'Tích cực', value: '1.9',muc_do: 'Tích cực', he_so: '1.9'},
			],
			playId: this.props.user_login.activity,
			isShow: false,
			job: '',
			sports:  [],

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
		
		
		
			
            apis.getSport()
                .then(res => {
					
					let current_sport = this.state.current_sport;
					let data = []
					if(current_sport != 'null' && current_sport != '[]')
					data = JSON.parse(current_sport)
					
					this.setState({
						data: data
					})
					
					for(let i = 0; i < res.data.items.length; i++){
						
						if(data.indexOf(res.data.items[i].id) != -1){
							res.data.items[i].status = !res.data.items[i].status;
						}
					}
					this.setState({ process: false, sports: res.data.items })
                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					
					return showMessage({ message: 'Lỗi', description:  'Có lỗi trong quá trình đăng ký', type: "warning" })
                })
		
    }
	
	_showSport = () => {
		let items = this.state.sports

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
	
	_logout = () => {
		this.props.dispatch(ActionCreators.set_user_login(null))
        Actions.frontpage({ type: ActionConst.REPLACE })
	}
	_register = () => {
	
			const {name, age, height_,job, sick, playId, cannang,weight, sex, phone, current_job, timkiem, data, mangthai, current_sport } = this.state
			sports = JSON.stringify(data)
			
		this.setState({ process: true }, () => {
            apis.edit(name, age, height_, weight, sex, phone, current_job, sick, sports, playId, mangthai, cannang)
                .then(res => {
					this.setState({ process: false })

					let user_login = res.data.data
                        Axios.defaults.headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + user_login.token
                        }
						Alert.alert('Thông báo',  res.data.message )
						
                        this.props.dispatch(ActionCreators.set_user_login(user_login))
					
					
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
	_alert = () => {
		Actions.alerts()
	}
	_facebook = () => {
		Actions.facebook()
	}
	
	_menu = () => {
		Actions.list()
	}
	_home = () => {
		Actions.home({process: false})
	}
	_next = () => {
		Actions.stepthree()
	 }
	_back = () => {
		Actions.pop()
	 }
	 
	sickClick(id) {
		if(id == 1){
			Alert.alert('Thông báo',  'Chế độ ăn dành cho người tiểu đường type 2, có đường máu lúc đói từ 6,1 đến 6,9 mmol/L.' )
		 }
		if(id == 2){
			Alert.alert('Thông báo',  'Chế độ ăn dành cho người tiểu đường type 2, có đường máu lúc đói từ 7,0 đến 11,0 mmol/L. Đối với người tiểu đường type khác để xây dựng chế độ ăn thì liên hệ với chúng tôi hoặc hỏi ý kiến bác sỹ' )
		 }
		 if(id == 3){
			Alert.alert('Thông báo',  'Chế độ ăn dành cho người có cholesterol > 5,2mmol/L hoặc triglycerid > 2,3mmol/L và chưa phải dùng thuốc điều trị' )
		 }
		 this.setState({
		  sick: id
		})
	 }
	 _offBreakfast = () => {
		this.setState({
		  timkiem: '',
		})
		
		this.setState({
		  isShow: !this.state.isShow,
		})
		
		this.setState({
		  height: height,

		})
	 }	
	pickClick(id) {
		let array_ = this.state.items
		let data = this.state.data
		
		if(array_[id].status){
			for(let i = 0; i < data.length; i++){
				if(data[i] == array_[id].id){
					data.splice(i, 1);
				}
			}
		}else{
			
			data.push(array_[id].id);
		}
		
		array_[id].status = !array_[id].status;
		this.setState({
		  data: data,
		  items: array_
		})
	}
	changeExpandedC = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ expandedC: !this.state.expandedC }); 
	  }
	changeExpandedD = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ expandedD: !this.state.expandedD }); 
	  }
	  render() {
		  const { process, isShow,current_job, name, job,  phone, gender, height_, weight, cannang, age, timkiem, mangthai} = this.state
		  const sicks = [{
			  id: 0,
			  text: 'Không'
			},
			{
			  id: 1,
			  text: 'Rối loạn chuyển hóa đường'
			},
			{
			  id: 2,
			  text: 'Tiểu đường'
			},
			{
			  id: 3,
			  text: 'Rối loạn chuyển hóa máu mỡ'
			}];
		return (
		  <View style={styles.container}>
		  <StatusBar backgroundColor="#90D077"/>
			<View style={[styles.box, {width: width, height: 85}]}>
			
			
			<TouchableOpacity   style={styles.back} onPress={this._back}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={styles.buttonText}>
				    <Icon style={{top:10, marginTop:10}} name={'md-arrow-back'} size={20} color='#fff' />
				</Text>
			  </View>
			</TouchableOpacity>
			<Text maxFontSizeMultiplier={1} style={[styles.buttonText, styles.title]}>
				    Tài khoản
			</Text>
			<TouchableOpacity   style={styles.button} onPress={this._register}>
					
				  <View>
				<Text maxFontSizeMultiplier={1} style={[styles.buttonText, {color: '#fff'}]}>
						Lưu
				</Text>
				</View>
			
				
		
			</TouchableOpacity>
			</View>
			<View style={[{width: width, height: height - 85 - 80}]} >
			<ScrollView style={[{width: width, height: height - 85 - 80}]}>	
				
			<View>
				<View style={ [styles.formGroup,{height: 40, marginTop: 10}] }>                    
                    <View style={ styles.itemInput }>
						<Text style={{marginLeft: 10, fontWeight: 'bold', width: 170}}>
							Họ và tên: 
						</Text>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Tên"
							placeholderTextColor="#757F8C"
							onChangeText={(name) => this.setState({ name })}
							value={name}
						/>
						
						
					</View>
                </View>
				<View style={ [styles.formGroup,{height: 40}] }>
                    
                    <View style={ styles.itemInput }>
						<Text style={{marginLeft: 10, fontWeight: 'bold', width: 170}}>
							Số điện thoại: 
						</Text>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Số điện thoại"
							placeholderTextColor="#757F8C"
							onChangeText={(phone) => this.setState({ phone })}
							value={phone}
						/>
						
						
					</View>
                </View>
						
				<View  style={ [styles.formGroup, {borderColor: '#757F8C',borderBottomWidth: 1, height: 40,flexDirection:'row',flexWrap:'wrap',marginTop:16,}] }>
				<View style={{width:170}}>
						<Text style={{marginLeft: 10, fontWeight: 'bold',marginTop:5,}}>
							Giới tính: 
						</Text>
				</View>
				<View style={{width:width-170}}>
						<RNPickerSelect
						placeholder={{
												label: 'Chọn giới tính',
												value: '',
											}}
											style={{
												
								placeholder: {
		 							fontSize:16,
									color: '#757F8C',
		              				},
		              			inputIOS: {
		              				fontSize:16,
									color: '#757F8C',
									marginTop:5,
									marginLeft:20,
						    		
						    
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
				</View>
				
				{
				(this.state.sex == 1) ? 
				<View>
				
				<View  style={ [styles.formGroup, {borderColor: '#757F8C',borderBottomWidth: 1, height: 40,flexDirection:'row',flexWrap:'wrap',marginTop:16,}] }>
				<View style={{width:170,}}>
					<Text style={{marginLeft: 10, fontWeight: 'bold',marginTop:5,}}>
							Thai nghén: 
						</Text>
				</View>
				<View style={{width:width-170,}}>	
				<RNPickerSelect
				placeholder={{
										label: 'Nếu bạn có thai ?',
										value: -1,
									}}
									style={{
										
						placeholder: {
 							fontSize:16,
							color: '#757F8C',
              				},
              			inputIOS: {
              				fontSize:16,
							color: '#757F8C',
							marginTop:5,
							marginLeft:20,
				    		
				    
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
				</View>
				</View>
				:null
				}
				<View style={ [styles.formGroup,{height: 40,}] }>
                    
                    <View style={ styles.itemInput }>
						<Text style={{marginLeft: 10, fontWeight: 'bold', width: 170}}>
							Tuổi: 
						</Text>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder='Tuổi'
							placeholderTextColor="#757F8C"
							onChangeText={(age) => this.setState({ age })}
							value={age}
						/>
						
						
					</View>
                </View>
				<View style={ [styles.formGroup,{height: 40}] }>
                    
                    <View style={ styles.itemInput }>
						<Text style={{marginLeft: 10, fontWeight: 'bold', width: 170}}>
							Chiều cao(m): 
						</Text>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder='m'
							placeholderTextColor="#757F8C"
							onChangeText={(height_) => this.setState({ height_ })}
							value={ height_ }
						/>
						
						
					</View>
                </View>
				<View style={ [styles.formGroup,{height: 40}] }>
                    
                    <View style={ styles.itemInput }>
						<Text style={{marginLeft: 10, fontWeight: 'bold', width: 170}}>
							Cân nặng(kg): 
						</Text>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder='kg'
							placeholderTextColor="#757F8C"
							onChangeText={(weight) => this.setState({ weight })}
							value={ weight }
						/>
						
						
					</View>
                </View>
				
				<View style={ [styles.formGroup,{height: 40}] }>
                    
                    <View style={ styles.itemInput }>
						<Text style={{marginLeft: 10, fontWeight: 'bold', width: 170}}>
							CN mong muốn(kg): 
						</Text>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder='Cân nặng mong muốn'
							placeholderTextColor="#757F8C"
							onChangeText={(cannang) => this.setState({ cannang })}
							value={ cannang }
						/>
						
						
					</View>
                </View>
				
				
				<View style={ [styles.formGroup, {borderColor: '#757F8C',borderBottomWidth: 1, height: 45,flexDirection:'row',flexWrap:'wrap',marginTop:16,}] }>
				<View style={{width:170,}}>
					<Text style={{marginLeft: 10, fontWeight: 'bold',marginTop:5,}}>
							Nghề nghiệp: 
						</Text>
				</View>
				<View style={{width:width-170}}>	
				<RNPickerSelect
					onValueChange={(value, index)  => {
						let key_ = index - 1
						if(value != -1){
							this.setState({current_job: value, job: value, jobId: key_, playItem: [
								{label: 'Thụ động', value: '1.2',muc_do: 'Thụ động', he_so: '1.2'},
								{label: 'Nhẹ', value: '1.375',muc_do: 'Nhẹ', he_so: '1.375'}, 
								{label: 'Trung bình', value: '1.55',muc_do: 'Trung bình', he_so: '1.55'},
								{label: 'Năng động', value: '1.725',muc_do: 'Năng động', he_so: '1.725'}, 
								{label: 'Tích cực', value: '1.9',muc_do: 'Tích cực', he_so: '1.9'},
							]})
						}else{
							this.setState({current_job: value, job: value, jobId: key_, playItem: [
				{label: 'Thụ động', value: '1.2',muc_do: 'Thụ động', he_so: '1.2'},
				{label: 'Nhẹ', value: '1.375',muc_do: 'Nhẹ', he_so: '1.375'}, 
				{label: 'Trung bình', value: '1.55',muc_do: 'Trung bình', he_so: '1.55'},
				{label: 'Năng động', value: '1.725',muc_do: 'Năng động', he_so: '1.725'}, 
				{label: 'Tích cực', value: '1.9',muc_do: 'Tích cực', he_so: '1.9'},
			]})
						}
					}}
					
					value={this.state.current_job}
					style={{
						placeholder: {
 							fontSize:16,
 							color: '#757F8C',
              				},
              			inputIOS: {
              			fontSize:16,
						color: '#757F8C',
						marginLeft:20,
						marginTop:5,
				    
					},
					}}
					placeholder={{
                        label: 'chọn nghề nghiệp',
                        value: -1,
                    }}
					items={this.state.jobItem}
				/>
				</View>
				</View>	
					
				
				<View style={ [styles.formGroup, {borderColor: '#757F8C',borderBottomWidth: 1, height: 45,flexDirection:'row',flexWrap:'wrap',marginTop:16,}] }>
					<View style={{width:170}}>
						<Text style={{marginLeft: 10, fontWeight: 'bold', marginTop:5,}}>
							Mức độ hoạt động: 
						</Text>
					</View>
					<View style={{width:width-170}}>
				<RNPickerSelect
				 
					onValueChange={(value, index)  => {
						if(value == '1.2'){
							 Alert.alert('Thông báo',  'Thụ động: Công việc chỉ ngồi hay đứng một chỗ trong thời gian dài' )
						}
						if(value == '1.375'){
							 Alert.alert('Thông báo',  'Nhẹ: Công việc đòi hỏi thường xuyên đi lại nhẹ nhàng không mang vác đồ trong thời gian dài' )
						}
						if(value == '1.55'){
							 Alert.alert('Thông báo',  'Trung bình: Công việc đòi hỏi vận động chân tay nhiều hoặc bê vác đồ nhẹ' )
						}
						if(value == '1.725'){
							 Alert.alert('Thông báo',  'Năng động: Công việc lao động chân tay thường xuyên mang vác đồ nặng' )
						}
						if(value == '1.9'){
							 Alert.alert('Thông báo',  'Tích cực: Công việc vận động nặng cường độ cao trong thời gian dài' )
						}
						this.setState({playId: value, play: value})
					}
					}
					value={this.state.playId}
					style={{
						placeholder: {
 							fontSize:16,
 							color: '#757F8C',
              				},
              			inputIOS: {
		              		fontSize:16,
							color: '#757F8C',
						    marginLeft:20,
						    marginTop:5,
				    
  				},
					}}
					placeholder={{
                        label: 'chọn mức độ hoạt động',
                        value: null,
                    }}
					items={this.state.playItem}
				/>
				</View>
				
				</View>
				
				
				
			
			<View style={[{width: width,  marginBottom: 5, marginTop: -4, height: 50, backgroundColor: '#fff', position: 'relative'}]} >
					<TouchableOpacity style={[{width: width,  marginBottom: 5, marginTop: -4, height:50, backgroundColor: '#fff', position: 'relative'}]} onPress={this._showSport}>
					<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40}]}>
						Chọn các môn thể thao bạn hay chơi
					</Text>
					<Text maxFontSizeMultiplier={1} style={styles.icon}>
						<Icon style={{top:13, marginTop:10}} name={'md-arrow-dropdown'} size={15} color='#757F8C' />
					</Text>
					</TouchableOpacity>
					
					
					
				</View>
				
				
				<View style={[{width: width,  marginBottom: 5, marginTop: -4, height: 60, backgroundColor: '#ddd', position: 'relative'}]} >
				<Text maxFontSizeMultiplier={1} style={styles.icon}>
				    <Icon style={{top:10, marginTop:10}} name={'ios-help-circle-outline'} size={15} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40, width: width - 40}]}>
				    Hiện tại bạn có mắc bệnh rối loạn chuyển hóa nào không?
				</Text>
			</View>	
			<View style={[{width: width}]} >
				
			
			{
			sicks.map((val) => {
				return (
					<View style={ [styles.formGroup, {height: 40}] }>
					<TouchableOpacity  style={ [styles.itemInput, {position: 'relative', marginTop: 10,height: 30, width: width}] } key={val.id} onPress={this.sickClick.bind(this, val.id)}>
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
						val.id == this.state.sick ?
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
				
				
				
				
				</View>
				
				
				
			</ScrollView>	
			</View>
			<View style={[{width: width, height: 80, position: 'absolute', bottom: 0, backgroundColor: '#fff', shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 2,  elevation: 5,}]} >
			<TouchableOpacity   style={{position: 'absolute', width: width*.2, height:80, top:0, left:0}} onPress={this._menu}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', marginTop: 10}}>
				    <Icon style={{top:10, marginTop:7}} name={'ios-restaurant'} size={41} color='#757F8C' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', color: '#757F8C', fontSize: 12}}>
				    Thực đơn
				</Text>
			  </View>
			</TouchableOpacity>
			<TouchableOpacity   style={{position: 'absolute', width: width*.2, height:80, top:0, left:width*.2}} onPress={this._facebook}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', marginTop: 10}}>
				    <Icon style={{top:10, marginTop:7}} name={'md-person-add'} size={41} color='#757F8C' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', color: '#757F8C', fontSize: 12}}>
				    Bạn bè
				</Text>
			  </View>
			</TouchableOpacity>
			<TouchableOpacity   style={{position: 'absolute', width: width*.2, height:80, top:0, left:width*.4}} onPress={this._alert}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', marginTop: 10}}>
				    <Icon style={{top:10, marginTop:7}} name={'ios-heart'} size={41} color='#757F8C' />
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
			<TouchableOpacity   style={{position: 'absolute', width: width*.2, height:80, top:0, left:width*.8}}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', marginTop: 10}}>
				    <Icon style={{top:10, marginTop:7}} name={'md-person'} size={41} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', color: '#90D077', fontSize: 12}}>
				    Tài khoản
				</Text>
			  </View>
			</TouchableOpacity>
			</View>
			{
				isShow			? 
					<View style={[styles.wrapOption, {width: width, height: height*.5, backgroundColor: '#fff', top: this.state.t, left: this.state.l, zIndex: 99}]}>
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
  container: {
    flex: 1,
    position: 'relative',
  },
  wrapOption: {
		shadowColor: '#000',
		
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 2,  
		elevation: 5,
		position: 'absolute',
		

	
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
		
  		flexWrap:'wrap',
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
  image:{
  	width:width - 30,
  	height: 100*(width - 30)/996,
  	borderRadius:30,
	borderWidth:1,
  	borderColor:'#8dc339',
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
  image_box:{
  	marginTop:30,
	width:width - 30,
	borderRadius:30,
	marginLeft: 15,
  	
  	
  	marginBottom: 20,
  	shadowColor: "#000",
	shadowOffset: {
	width: 0,
	height: 1,
	},
	shadowOpacity: 0.22,
	shadowRadius: 2.22,

	elevation: 3,
  },
});
export default connect(mapStateToProps)(Account)