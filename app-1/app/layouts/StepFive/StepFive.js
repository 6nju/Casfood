
import React, { Component } from 'react'
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  CheckBox,
  TextInput,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView,
  Picker
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
	
})
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
class StepFive extends Component {
    constructor(props) {
        super(props)
        this.state = {
			phone: this.props.phone,
			password: this.props.password,
			secure: true,
			items: [],
			age: this.props.age,
			hourDay: '',
			data: [],
			pageYJob: 0,
			sports: [],
			height: 0,
			jobId: -1,
			timkiem: '',
			_w: '',
			
			playId: -1,
			level: -1,
			levelText: -1,
			t: 0,
			opacity: 0,
			playItem: [
				{label: 'Thụ động', value: '1.2',muc_do: 'Thụ động', he_so: '1.2'},
				{label: 'Nhẹ', value: '1.375',muc_do: 'Nhẹ', he_so: '1.375'}, 
				{label: 'Trung bình', value: '1.55',muc_do: 'Trung bình', he_so: '1.55'},
				{label: 'Năng động', value: '1.725',muc_do: 'Năng động', he_so: '1.725'}, 
				{label: 'Tích cực', value: '1.9',muc_do: 'Tích cực', he_so: '1.9'},
			],
			playItem_: [
				{label: 'Thụ động', value: '1.2',muc_do: 'Thụ động', he_so: '1.2'},
				{label: 'Nhẹ', value: '1.375',muc_do: 'Nhẹ', he_so: '1.375'}, 
				{label: 'Trung bình', value: '1.55',muc_do: 'Trung bình', he_so: '1.55'},
				{label: 'Năng động', value: '1.725',muc_do: 'Năng động', he_so: '1.725'}, 
				{label: 'Tích cực', value: '1.9',muc_do: 'Tích cực', he_so: '1.9'},
			],
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
			isShow: false,
			process: false,
			job: 'Công việc hiện tại của bạn là gì',
			sick : '',
			sport : '',
			play : '',
			hour : '',
			radioSelected: 1
        }
		apis.getSport()
                .then(res => {
					this.setState({ process: false, sports: res.data.items })
                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					Alert.alert('Thông báo',  'Có lỗi trong quá trình đăng ký' )
					
                })
    }
	onSelectedItemsChange = selectedItems => {
		this.setState({ selectedItems });
	};
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
	_next = () => {
		const { job, sick, sport, play, hour, phone, radioSelected, _w, data } = this.state
		let level = 0
		if(this.state.playId != -1){
			level = this.state.playId
			
		}
		else{
			return Alert.alert('Thông báo',  'Bạn chưa chọn mức độ hoạt động' )
			if(this.state.level == -1){
				level = play
			}else{
				level = this.state.level
			}
			
		}
		sports = data
		if (job == 'Công việc hiện tại của bạn là gì') return Alert.alert('Thông báo',  'Bạn chưa nhập công việc' )
		
		this.setState({ process: true }, () => {
            apis.stepfive(job, sick, sports, level, hour, phone, radioSelected, _w)
                .then(res => {
					this.setState({ process: false })
					Actions.stepsix({phone: phone,  password: this.state.password, age: this.state.age})
					
					
					
					
					
					
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
	_showJob = () => {
		let pageY = this.state.pageYJob
		let y
		this.setState({
			  height: height*.4,
		})
		if(pageY > (height - 10) && pageY > height*.5){
			 this.setState({
			  t: pageY - height*.4,
			})
			y = pageY - height*.4 - 10
		}
		if(pageY < height*.5){
			this.setState({
			  t: pageY,
			})
			y = pageY + 10
		}
		
		LayoutAnimation.configureNext(
		  LayoutAnimation.create(
			200,
			LayoutAnimation.Types.easeInEaseOut,
			LayoutAnimation.Properties.opacity,
		  ),
		);
		this.setState({t: y, l: 0})
	}
	 sickClick(id) {
		 
		 if(id == 2){
			 Alert.alert('Thông báo',  'Chế độ ăn dành cho người tiểu đường type 2, có đường máu lúc đói từ 7,0 đến 11,0 mmol/L. Đối với người tiểu đường type khác để xây dựng chế độ ăn thì liên hệ với chúng tôi hoặc hỏi ý kiến bác sỹ' )
		 }
		 this.setState({
		  sick: id
		})
	 }
	 radioClick(id) {
		this.setState({
		  radioSelected: id
		})
	  }
	levelClick(id) {
		this.setState({
		  level: id
		})
	  }  
	
	  render() {
		  var times = [];

		for(let i = 0; i < 24; i++){

			times.push(
				<Picker.Item label={i + ":00"} value={i + ":00"} />

			)
			times.push(
				
				<Picker.Item label={i + ":30"} value={i + ":30"} />
			)
		}
		  const { secure, isShow, _w, timkiem } = this.state
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
		  const products = [{
			  id: 1,
			  text: 'Duy trì cân nặng hiện tại'
			},
			
			{
			  id: 3,
			  text: 'Tăng cân hoặc giảm cân'
			}];
		const levels = [{
			  id: 1,
			  text: 'Hoạt động thể lực nhẹ'
			},
			{
			  id: 2,
			  text: 'Hoạt động thể lực trung bình'
			},
			{
			  id: 3,
			  text: 'Hoạt động thể lực nặng'
			}];
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
		  <ScrollView style={[{width: width, height: height - 85}]}>	
			
			{ (this.state.age > 19) ?
			<View>
			
			
			<View style={[{width: width,  marginBottom: 10, marginTop: -4, height: 40, backgroundColor: '#ddd', position: 'relative'}]} >
				<Text maxFontSizeMultiplier={1} style={styles.icon}>
				    <Icon style={{top:10, marginTop:10}} name={'ios-help-circle-outline'} size={15} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40, fontWeight:'bold'}]}>
				    Công việc hiện tại của bạn là gì?
				</Text>
			</View>
			<View style={ [styles.formGroup, {borderColor: '#757F8C',borderBottomWidth: 1, height: 40}] }>
				<RNPickerSelect
					onValueChange={(value, index)  => {
						let key_ = index - 1
						if(value != -1){
							this.setState({current_job: value, job: value, jobId: key_, playItem: this.state.jobItem[key_].items, playId: -1})
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
						marginLeft:10,
						marginTop:7,
				    	color: '#757F8C',
				    	fontSize:16,
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
			<View style={[{width: width,  marginBottom: 10, marginTop: -4, paddingTop:24,paddingBottom:24, backgroundColor: '#ddd', position: 'relative'}]} >
				<Text maxFontSizeMultiplier={1} style={styles.icon}>
				    <Icon style={{top:7, marginTop:2}} name={'ios-help-circle-outline'} size={15} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40, fontWeight:'bold'}]}>
				    Dựa theo 5 mô tả dưới đây bạn hãy chọn mức độ hoạt động phù hợp với công việc
				</Text>
			</View>	
			
			
			
			
			<View style={[{width: width,  marginBottom: -5, marginTop: -4, backgroundColor: '#fff', position: 'relative'}]} >
				
				<Text maxFontSizeMultiplier={1} style={[styles.title, {width: width- 40,position: 'relative', color: '#757F8C', fontSize: 15, marginLeft: -20, marginTop: 15}]}>
				    <Text maxFontSizeMultiplier={1} style={{fontWeight: 'bold'}}>Thụ động</Text>: Công việc chỉ ngồi hay đứng một chỗ trong thời gian dài
				</Text>
			</View>	
			
			<View style={[{width: width,  marginBottom: -5, marginTop: -4, backgroundColor: '#fff', position: 'relative'}]} >
				
				<Text maxFontSizeMultiplier={1} style={[styles.title, {width: width- 40,position: 'relative', color: '#757F8C', fontSize: 15, marginLeft: -20, marginTop: 15}]}>
				    <Text maxFontSizeMultiplier={1} style={{fontWeight: 'bold'}}>Nhẹ</Text>: Công việc đòi hỏi thường xuyên đi lại nhẹ nhàng không mang vác đồ trong thời gian dài
				</Text>
			</View>	
			
			<View style={[{width: width,  marginBottom: -5, marginTop: -4, backgroundColor: '#fff', position: 'relative'}]} >
				
				<Text maxFontSizeMultiplier={1} style={[styles.title, {width: width- 40,position: 'relative', color: '#757F8C', fontSize: 15, marginLeft: -20, marginTop: 15}]}>
				    <Text maxFontSizeMultiplier={1} style={{fontWeight: 'bold'}}>Trung bình</Text>: Công việc đòi hỏi vận động chân tay nhiều hoặc bê vác đồ nhẹ
				</Text>
			</View>	
			
			<View style={[{width: width,  marginBottom: -5, marginTop: -4, backgroundColor: '#fff', position: 'relative'}]} >
				
				<Text maxFontSizeMultiplier={1} style={[styles.title, {width: width- 40,position: 'relative', color: '#757F8C', fontSize: 15, marginLeft: -20, marginTop: 15}]}>
				    <Text maxFontSizeMultiplier={1} style={{fontWeight: 'bold'}}>Năng động</Text>: Công việc lao động chân tay thường xuyên mang vác đồ nặng
				</Text>
			</View>	
			<View style={[{width: width,  marginBottom: -15, marginTop: -4, backgroundColor: '#fff', position: 'relative'}]} >
				
				<Text maxFontSizeMultiplier={1} style={[styles.title, {width: width- 40,position: 'relative', color: '#757F8C', fontSize: 15, marginLeft: -20, marginTop: 15}]}>
				    <Text maxFontSizeMultiplier={1} style={{fontWeight: 'bold'}}>Tích cực</Text>: Công việc vận động nặng cường độ cao trong thời gian dài
				</Text>
			</View>
			
			
			
			
			<View style={ [styles.formGroup, {borderColor: '#757F8C',borderBottomWidth: 1, height: 40}] }>
				 <RNPickerSelect
				 
					onValueChange={(value, index)  =>
						
						this.setState({playId: value, play: value})
					}
					
					value={this.state.playId}
					style={{
						placeholder: {
 							fontSize:16,
 							color: '#757F8C',
              				},
              			inputIOS: {
				    marginLeft:10,
				    marginTop:5,
				    color: '#757F8C',
				    fontSize:16,
  				},
					}}
					placeholder={{
                        label: 'Chọn mức độ hoạt động',
                        color: '#757F8C',
                        value: -1,
                    }}
					items={this.state.playItem}
				/>
				
				</View>	
				
			 
			</View> : 
			<View>
			<Text maxFontSizeMultiplier={1} style={[{marginLeft: 20, marginTop: 10, color: '#757F8C', width: width - 40, textAlign: 'left', fontSize: 15}]}>
				    Đối với trẻ không tham gia hoạt động thể thao thì lấy năng lượng theo hoạt động thể lực nhẹ 
			</Text>
				
			<Text maxFontSizeMultiplier={1} style={[{marginLeft: 20, marginTop: 10, color: '#757F8C', width: width - 40, textAlign: 'left', fontSize: 15}]}>
				   Hoạt động thể lực trung bình nếu trẻ tham gia chơi các môn thể thao: cầu lông, bóng rổ, bóng đá, bóng chuyền, chạy bộ, tennis, bơi lội tốc độ chậm trung bình 30-1 tiếng
			</Text>
			<Text maxFontSizeMultiplier={1} style={[{marginLeft: 20, marginTop: 10, marginBottom: 20, color: '#757F8C', width: width - 40, textAlign: 'left', fontSize: 15}]}>
				   Hoạt động thể lực trung bình nếu trẻ tham gia chơi các môn thể thao: cầu lông, bóng rổ, bóng đá, bóng chuyền, chạy bộ, tennis, bơi lội tốc độ chậm trung bình 30-1 tiếng
			</Text>
			
			<View style={[{width: width,  marginBottom: 7, height: 40, backgroundColor: '#ddd', position: 'relative'}]} >
				<Text maxFontSizeMultiplier={1} style={styles.icon}>
				    <Icon style={{top:10, marginTop:10}} name={'ios-help-circle-outline'} size={15} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40}]}>
				    Chọn mức độ hoạt động
				</Text>
			</View>
			<View style={[{width: width, marginBottom: 500}]} >
				
			
			{
			levels.map((val) => {
				return (
					<View style={ [styles.formGroup, {height: 40}] }>
                    
                    
				  <TouchableOpacity  style={ [styles.itemInput, {position: 'relative', marginTop: 10,height: 30, width: width}] } key={val.id} onPress={this.levelClick.bind(this, val.id)}>
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
						val.id == this.state.level ?
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
			}
		  </ScrollView>
		  
					
					
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
        height:30,
        marginBottom: 4, 
        paddingHorizontal: 0
    },
	itemInput: {
        flexDirection: 'row', 
		width: width,
		color: '#757F8C',

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
export default connect(mapStateToProps)(StepFive)