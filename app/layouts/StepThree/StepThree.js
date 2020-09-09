
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
import {Actions} from 'react-native-router-flux';
const width = Dimensions.get('window').width
import { connect } from 'react-redux'
import MultiSelect from 'react-native-multiple-select';
const mapStateToProps = (state) => ({
	
})
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
class StepThree extends Component {
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
			expanded: false,
			timkiem: '',
			_w: '',
			playItem: [
			
			],
			playId: -1,
			level: -1,
			levelText: -1,
			t: 0,
			opacity: 0,
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
		
		if(radioSelected == 3 && _w == ''){
			return Alert.alert('Thông báo',  'Bạn chưa nhập cân nặng mong muốn' )
		}
		
		if(this.state.playId != -1){
		level = this.state.playItem[this.state.playId].he_so
		}
		else{
			if(this.state.level == -1){
				level = play
			}else{
				level = this.state.level
			}
			
		}
		sports = data
		this.setState({ process: true }, () => {
            apis.stepthree(job, sick, sports, level, hour, phone, radioSelected, _w)
                .then(res => {
					this.setState({ process: false })
					if(this.state.age > 19){
					Actions.stepfive({phone: phone,  password: this.state.password, age: this.state.age})
					}else{
					Actions.stepfour({phone: phone,  password: this.state.password})
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
		 if(id == 1){
			 Alert.alert('Thông báo',  'Chế độ ăn dành cho người tiểu đường type 2, có đường máu lúc đói từ 6,1 đến 6,9 mmol/L.' )
		 }
		 if(id == 2){
			 Alert.alert('Thông báo',  'Chế độ ăn dành cho người tiểu đường type 2, có đường máu lúc đói từ 7,0 đến 11,0 mmol/L. Đối với người tiểu đường type khác để xây dựng chế độ ăn thì liên hệ với chúng tôi hoặc hỏi ý kiến bác sỹ' )
		 }
		 if(id == 3){
			 Alert.alert('Thông báo',  'Chế độ ăn dành cho người có cholesterol > 5,2mmol/L hoặc triglycerid > 2,3mmol/L' )
		 }
		 this.setState({
		  sick: id
		})
	 }
	 radioClick(id) {
		if(id == 3){
		Alert.alert('Thông báo',  'Chế độ ăn này sẽ giúp bạn tăng hoặc giảm khoảng 2kg / tháng' )
		this.setState({
		  radioSelected: id,
		  expanded: true
		})
		}else{
			
		this.setState({
		  radioSelected: id,
		  expanded: false
		})
		}
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
			<View style={[{width: width,  marginBottom: 7, height: 40, backgroundColor: '#ddd', position: 'relative'}]} >
				<Text maxFontSizeMultiplier={1} style={styles.icon}>
				    <Icon style={{top:10, marginTop:10}} name={'ios-help-circle-outline'} size={15} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40, fontWeight:'bold'}]}>
				    Cân nặng mong muốn của bạn
				</Text>
			</View>
			<View style={[{width: width}]} >
				
			
			{
			products.map((val) => {
				return (
					<View style={ [styles.formGroup, {height: 40}] }>
                    
                    
				  <TouchableOpacity  style={ [styles.itemInput, {position: 'relative', marginTop: 10,height: 30, width: width}] } key={val.id} onPress={this.radioClick.bind(this, val.id)}>
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
						val.id == this.state.radioSelected ?
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
			<View style={ [styles.formGroup, {height: this.state.expanded ? 40 : 0}] }>                   
                    <View style={[ styles.itemInput, {height: this.state.expanded ? 40 : 0} ]}>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Nhập cân nặng mong muốn"
							placeholderTextColor="#757F8C"
							onChangeText={(_w) => this.setState({ _w })}
							value={_w}
						/>
						
						
					</View>
                </View>
			</View>
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
				
			<View style={[{width: width,  marginBottom: 5, marginTop: -4, height: 40, backgroundColor: '#ddd', position: 'relative'}]} >
				<Text maxFontSizeMultiplier={1} style={styles.icon}>
				    <Icon style={{top:10, marginTop:10}} name={'ios-help-circle-outline'} size={15} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40, fontWeight:'bold'}]}>
				    Hiện tại bạn đang chơi môn thể thao gì?
				</Text>
			</View>	
			
			<View style={[{width: width,  marginBottom: 5, marginTop: -4, height: 40, backgroundColor: '#ddd', position: 'relative'}]} >
					<TouchableOpacity style={[{width: width,  marginBottom: 5, marginTop: -4, height: 40, backgroundColor: '#fff', position: 'relative'}]} onPress={this._showSport}>
					<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40}]}>
						Chọn các môn thể thao bạn hay chơi
					</Text>
					<Text maxFontSizeMultiplier={1} style={styles.icon}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={15} color='#757F8C' />
					</Text>
					</TouchableOpacity>
					
					
					
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
export default connect(mapStateToProps)(StepThree)