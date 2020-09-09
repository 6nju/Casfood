

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
  Linking,
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

import Axios from 'axios';
import { ActionCreators } from '../../redux/ActionCreators';

const mapStateToProps = (state) => ({
	user_login: state.user_login
})
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
class Setting extends Component {
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
			sick: (this.props.user_login) ? this.props.user_login.dinhduong : 0,
			jobId: -1,
			timkiem: '',
			alert_: 'Bạn hơi thừa cân theo đánh giá của IDI&WPRO',
			body: '0',
			bmi: '0',
			weight_: '0',
			mangthai: (this.props.user_login.mangthai) ? this.props.user_login.mangthai : 0,
			tee: 0,
			t: 0,
			l: 0,
			items: [],

			process: false,
			playItem: [
				{muc_do: 'Thụ động', he_so: '1.2'},
				{muc_do: 'Nhẹ', he_so: '1.375'}, 
				{muc_do: 'Trung bình', he_so: '1.55'},
				{muc_do: 'Năng động', he_so: '1.725'}, 
				{muc_do: 'Tích cực', he_so: '1.9'},
			],
			
			playId: this.props.user_login.activity,
			isShow: false,
			job: '',
			sports:  [],
			jobItem: [
				{value: 'Bác sĩ', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}]},
				{value: 'Bán hàng tại chợ và quầy hàng', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}]},
				{value: 'Bảo vệ, nghỉ hưu', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}]},
				{value: 'Biên đạo múa', items: [{muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}]},
				{value: 'Bộ đội', items: [{muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}]},
				{value: 'Bộ đội tập luyện', items: [{muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Ca sĩ', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}]},
				{value: 'Cắt tóc, gội đầu', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}]},
				{value: 'Chăn nuôi, nghề nông', items: [{muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Công an', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}]},
				{value: 'Công nhân là việc trong các nhà máy',items: [{muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Đặc công', items: [{muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Ngư dân đánh bắt hải sản', items: [{muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Đạo diễn', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}]},
				{value: 'Đầu bếp', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}]},
				{value: 'Diễn viên', items: [{muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}]},
				{value: 'Điều dưỡng, Y tá', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}]},
				{value: 'Giáo viên', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}]},
				{value: 'Giáo viên mầm non, trông giữ trẻ', items: [{muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}]},
				{value: 'Hộ lý', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}]},
				{value: 'Họa sĩ, nhạc sĩ', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}]},
				{value: 'Hướng dẫn viên du lịch', items: [{muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}]},
				{value: 'Kỹ sư công nghệ thông tin', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}]},
				{value: 'Lính tinh nhuệ đặc biệt', items: [{muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Luật sư', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}]},
				{value: 'Massage', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}]},
				{value: 'MC', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}]},
				{value: 'Nghề mộc', items: [{muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Nghề thêu', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}]},
				{value: 'Người mẫu', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}]},
				{value: 'Nhà báo, nhiếp ảnh', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}]},
				{value: 'Nhà nghiên cứu', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}]},
				{value: 'Nhà tâm lý học', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}]},
				{value: 'Nhà văn', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}]},
				{value: 'Nhạc công', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}]},
				{value: 'Nhân viên đánh máy', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}]},
				{value: 'Nhân viên xét nghiệm, thí nghiệm', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}]},
				{value: 'Nhân viên văn phòng', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}]},
				{value: 'Nhân viên vệ sinh', items: [{muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}]},
				{value: 'Nuôi trồng thủy hải sản', items: [{muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Phát thanh viên', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}]},
				{value: 'Phu bốc xếp hàng hóa', items: [{muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Phụ hồ', items: [{muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Phục vụ nhà hàng', items: [{muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}]},
				{value: 'Sinh viên', items: [{muc_do: 'Nhẹ', he_so: '1.375'}, {muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}]},
				{value: 'Tài xế', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}]},
				{value: 'Thợ may', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}]},
				{value: 'Thợ xây', items: [{muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Thợ sẻ đá, cắt đá', items: [{muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Thợ điện', items: [{muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Thợ sơn', items: [{muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Thợ hàn', items: [{muc_do: 'Trung bình', he_so: '1.55'}, {muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				
				{value: 'Thợ rèn', items: [{muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Thợ làm khuôn đúc kim loại', items: [{muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Thợ lắp đặt dây cáp', items: [{muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Thợ lắp đặt kim loại xây dựng', items: [{muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Thợ lặn', items: [{muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Thu ngân, kế toán', items: [{muc_do: 'Thụ động', he_so: '1.2'}, {muc_do: 'Nhẹ', he_so: '1.375'}]},
				{value: 'Vận động viên', items: [{muc_do: 'Năng động', he_so: '1.725'}, {muc_do: 'Tích cực', he_so: '1.9'}]},
				{value: 'Khác', items: [
				{muc_do: 'Thụ động', he_so: '1.2'},
				{muc_do: 'Nhẹ', he_so: '1.375'}, 
				{muc_do: 'Trung bình', he_so: '1.55'},
				{muc_do: 'Năng động', he_so: '1.725'}, 
				{muc_do: 'Tích cực', he_so: '1.9'},
			]},
			],
        }
		
		apis.steptow(this.state.phone)
		
                .then(res => {
				
					this.setState({ process: false, bmi: res.data.bmi,tee: parseFloat(res.data.tee).toFixed(1),body: parseFloat(res.data.body).toFixed(1), alert_: res.data.alert_, weight_: parseFloat(res.data.wish_).toFixed(1) })
                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					Alert.alert('Thông báo',  'Có lỗi trong quá trình đăng ký' )
					
                })
			
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
            apis.editDinhduong(phone, sick)
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
					Alert.alert('Thông báo',  err.data.message )
					
                    this.setState({ process: false })
                    console.log(err.response)
             
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
		Actions.home({tess_: '1111'})
	}
	_next = () => {
		Actions.stepthree()
	 }
	_back = () => {
		Actions.pop()
	 }
	 
	sickClick(id) {
		if(id == 3){
			 Alert.alert('Thông báo',  'Chế độ ăn này vẫn đảm bảo tổng năng lượng tuy nhiên tỷ lệ các chất sinh năng lượng sẽ có sự thay đổi: protein(20% - 25%), glucid(40%- 50%), lipid(30% - 35%). Tỷ lệ này không còn chính xác với những món ăn "Hạn chế người bị mỡ máu" trong thực đơn tổng' )
		 }
		if(id == 2){
			 Alert.alert('Thông báo',  'Chế độ ăn này vẫn đảm bảo tổng năng lượng tuy nhiên tỷ lệ các chất sinh năng lượng sẽ có sự thay đổi: protein(15% - 20%), glucid(50%- 55%), lipid(25% - 30%). Tỷ lệ này không còn chính xác với những món ăn "Hạn chế người bị mỡ máu" trong thực đơn tổng' )
		 }
		 if(id == 0){
			 Alert.alert('Thông báo',  'Chế độ này theo nhu cầu kiến nghị của Bộ Y Tế về năng lượng và các chất dinh dưỡng dành cho người Việt Nam. Tỷ lệ các chất dinh dưỡng protein(12% - 15%), glucid(60%- 65%), lipid(20% - 30%)' )
		 }
		 if(id == 4){
			 Alert.alert('Thông báo',  'Chế độ ăn này vẫn đảm bảo tổng năng lượng tuy nhiên tỷ lệ các chất sinh năng lượng sẽ có sự thay đổi protein(15% - 18%), glucid(55%- 60%), lipid(20% - 25%). Tỷ lệ này không còn chính xác với những món ăn "Hạn chế người bị mỡ máu" trong thực đơn tổng' )
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
	_account = () => {
		Actions.account()
	}		
	_alert_ = () => {
		
		Actions.heavy()
	 }
	changeExpandedC = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ expandedC: !this.state.expandedC }); 
	  }
	changeExpandedD = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ expandedD: !this.state.expandedD }); 
	  }
	  _facebook_ = () => {
	  	Linking.openURL("fb-messenger://user-thread/449529225233733");
		
	 }
	  render() {
		  const { process, isShow,current_job, name, job,  phone, gender, height_, weight, cannang, age, timkiem, mangthai} = this.state
		  const sicks = [{
			  id: 0,
			  text: 'Bình thường'
			},
			{
			  id: 4,
			  text: 'Tăng protein giảm tinh bột - mức 1'
			},
			{
			  id: 2,
			  text: 'Tăng protein giảm tinh bột - mức 2'
			},
			{
			  id: 3,
			  text: 'Tăng protein giảm tinh bột - mức 3'
			},
			
			];
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
			</View>
			<View style={[{width: width, height: height - 85 - 80}]} >
			<ScrollView style={[{width: width, height: height - 85 - 80,marginTop:20,}]}>	
			
			<View style={[{width: width}]} >
				
			
			
			<TouchableOpacity  style={[styles.image_box]}>
				
				<Image
					style={styles.image}
                    source={ require('./imgs/thongtin.jpg') }
                    

                />
				
			
			</TouchableOpacity>
			<View style={[{width: width}]} >
				<Text maxFontSizeMultiplier={1} style={{marginLeft: 20,marginTop: 20, width: width, textAlign: 'left', color: '#90D077',  fontSize: 16,}}>
				    BMI của bạn là {this.state.bmi}
				</Text>
				<Text maxFontSizeMultiplier={1} style={[{marginLeft: 20,marginTop: 25, color: '#757F8C', width: width - 40, textAlign: 'left', fontSize: 16, }]}>
				    {this.state.alert_}
				</Text>
				
				
				<Text maxFontSizeMultiplier={1} style={{marginLeft: 20,marginTop: 20, width: width, textAlign: 'left', color: '#90D077',  fontSize: 16, }}>
				    Tỷ lệ mỡ toàn thân của bạn là {this.state.body}% ± 2.4%
				</Text>
				
				<Text maxFontSizeMultiplier={1} style={{marginLeft: 20,marginTop: 20, width: width, textAlign: 'left', color: '#90D077',  fontSize: 16,}}>
				    Tổng năng lượng bạn cần 1 ngày là {this.state.tee} Kcal
				</Text>
			</View>
			</View>
			
				
				
			<View style={{ height: this.state.expandedC ? null : 0, overflow: 'hidden'}}>
				<View style={ [styles.formGroup,{height: 40, marginTop: 10}] }>                    
                    <View style={ styles.itemInput }>
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
				<View  style={ [styles.formGroup, {borderColor: '#757F8C',borderBottomWidth: 1, height: 40}] }>
				 <Picker 
				  selectedValue={this.state.sex}
				  style={[styles.itemInput, {marginTop: 0}]}
				  onValueChange={(itemValue, itemIndex) =>
					this.setState({sex: itemValue})
				  }>
				  <Picker.Item label="Nam" value="0" />
				  <Picker.Item label="Nữ" value="1" />
				</Picker>
				
				</View>
				{
				(this.state.sex == 1) ? 
				<View  style={ [styles.formGroup, {borderColor: '#757F8C',borderBottomWidth: 1, height: 40}] }>
				 <Picker 
				  selectedValue={this.state.mangthai}
				  style={[styles.itemInput, {marginTop: 0}]}
				  onValueChange={(itemValue, itemIndex) =>
					this.setState({mangthai: itemValue})
				  }>
				  <Picker.Item label="Không mang thai" value="0" />
				  <Picker.Item label="Mang thai 3 tháng đầu" value="1" />
				  <Picker.Item label="Mang thai 3 tháng giữa" value="2" />
				  <Picker.Item label="Mang thai 3 tháng cuối" value="3" />
				  <Picker.Item label="Đang cho con bú" value="4" />
				</Picker>
				
				</View>
				:null
				}
				<View style={ [styles.formGroup,{height: 40}] }>
                    
                    <View style={ styles.itemInput }>
						
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
				
				
				<View style={ [styles.formGroup, {borderColor: '#757F8C',borderBottomWidth: 1, height: 45}] }>
				 <Picker 
				  selectedValue={this.state.current_job}
				  style={[styles.itemInput, {marginTop: 0}]}
				  onValueChange={(itemValue, itemIndex) => {
					let key_ = parseInt(itemIndex) - 1
					this.setState({current_job: itemValue, jobId: itemIndex, playItem: this.state.jobItem[key_].items})
					}
				  }>
				  
				  <Picker.Item value='' label='Công việc hiện tại của bạn?' />
				  {
						this.state.jobItem.map((val, index) => {
							return (
								<Picker.Item label={val.value} value={val.value} />
							
							
							)
						  })
					}
				  
				</Picker>
				
				</View>	
				
				<View style={ [styles.formGroup, {borderColor: '#757F8C',borderBottomWidth: 1, height: 45}] }>
				 <Picker 
				  selectedValue={this.state.playId}
				  style={[styles.itemInput, {marginTop: 0}]}
				  onValueChange={(itemValue, itemIndex) =>
					this.setState({playId: itemValue, play: itemValue})
				  }>
				  <Picker.Item value='' label='Mức độ hoạt động?' />
				  {
						this.state.playItem.map((val, index) => {
							return (
								<Picker.Item label={val.muc_do} value={val.he_so} />
							)
						  })
					}
				</Picker>
				
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
				
				
				
				<View style={ [styles.formGroup,{height: 300}] }>
				<TouchableOpacity style={{width: width - 72, shadowColor:'#000', height: 50,position: 'relative', shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,  elevation: 5,marginLeft: 36,paddingVertical: 15,marginTop: 15,backgroundColor: '#90D077'}} onPress={this._register}>
				<View style={{}}>
					<View style={{ height: '100%', position: 'absolute', top: 0, left: 12, alignItems: 'center', justifyContent: 'center' }}>
                        {process ? <ActivityIndicator color={'white'} /> : null}
                    </View>
					<Text maxFontSizeMultiplier={1} style={{width: width - 72, color: '#fff',  textAlign: 'center',}}>
						Cập nhật
					</Text>
					
				  </View>
				</TouchableOpacity>
				<TouchableOpacity  style={{ height: 50,position: 'relative',width: width - 72, shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,  elevation: 5,marginLeft: 36,paddingVertical: 15,marginTop: 10,backgroundColor: '#4267b2'}} onPress={this._logout}>
				<View style={{}}>
					<View style={{ height: '100%', position: 'absolute', top: 0, left: 12, alignItems: 'center', justifyContent: 'center' }}>
                        {process ? <ActivityIndicator color={'white'} /> : null}
                    </View>
					<Text maxFontSizeMultiplier={1} style={{width: width - 72, color: '#fff',  textAlign: 'center',}}>
						Đăng xuất
					</Text>
					
				  </View>
				</TouchableOpacity>
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
  image:{
	width: width,
  	height: 100*(width)/996,

	borderWidth:1,
  	borderColor:'#8dc339',
  },
  image_box:{
  	marginTop:30,
	width:width,


  	
  	
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
export default connect(mapStateToProps)(Setting)