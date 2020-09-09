
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
import {
  PieChart,
} from "react-native-chart-kit";
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons'
const height = Dimensions.get('window').height
import { WebView } from 'react-native-webview';
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
class MenuGroupTow extends Component {
    constructor(props) {
        super(props)
        this.state = {
			phone: this.props.user_login.phone,
			phone: this.props.user_login.phone,
			disease: this.props.user_login.disease,
			name: this.props.user_login.name,
			process: false,
			webViewHeight: 0,
			expanded: false,
			isShowP: false,
			isShow: false,
			age: this.props.user_login.age,
			timkiem: '',
			gender: this.props.user_login.gender,
			dataTemplate: [],
			showData: [
				
			],
			charC: [
				{
					name: "Chưa chọn",
					population: 100,
					color: "rgba(131, 167, 234, 1)",
					legendFontColor: "#7F7F7F",
					legendFontSize: 15
				},
			],
			chartM: [
				{
					name: "Chưa chọn",
					population: 100,
					color: "rgba(131, 167, 234, 1)",
					legendFontColor: "#7F7F7F",
					legendFontSize: 15
				},
			],
			check: 0,
			stt: [],
			type: 0,
			item_group: [],
			items: [],
			items_: [],
			data_: [],
			key_one: 0,
			key_group: 0,
			groups: [],
			data: [],
			heso: 0,
			charM: [],
			hesocom: 0,
			hesoman: 0,
			hesotee: 0,
			key_: 1,
			key: 0,
			keyData: -1,
			test: 0,
			tee: 0,
			tee: 0,
			colorChart: [
				'#faebd7','#8a2be2','#a52a2a','#deb887','#5f9ea0','#7fff00','#d2691e'
			],
			datas_: [
			  
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
		apis.getPostById(23)
                .then(res => {
					
					this.setState({ item: res.data.item })

					
                })
                .catch(err => {
					
					this.setState({ process: false })
					return showMessage({ message: err.data.message, type: "error" })
                })
        apis.getMenuGroup(this.state.phone, 1)
                .then(res => {
					
					this.setState({ process: false, groups: res.data.group,item_group:res.data.group[this.state.key_].items,type: res.data.type, isShowP: true, items: res.data.items,items_: res.data.items, data_:res.data.items[0].data, data:res.data.items[0].data, stt:res.data.items[0].stt, tee: ((res.data.tee * res.data.hesotee)/100)})
					this.setState({hesocom: res.data.hesocom,hesoman: res.data.hesoman,hesotee: res.data.hesotee})
					
					if(res.data.type == 0){
						this.setState({heso: 0.25})

						
					}
					if(res.data.type == 1){
						if(this.state.disease == 2){
							this.setState({heso: 0.4})
						}else{
							this.setState({heso: 0.45})
						}
						
						
	
					}
					if(res.data.type == 2){

						if(this.state.disease == 2){
							this.setState({heso: 0.25})
						}else{
							this.setState({heso: 0.3})
						}
						
					}
					
                })
                .catch(err => {
					
					this.setState({ process: false })
					return showMessage({ message: err.data.message, type: "error" })
                })
				
				
				Alert.alert(
		  'Thông báo',
		  'Bạn Lên Thực Đơn Cho',
		  [
			{
			  text: 'Bữa Sáng',
			  onPress: () => {
				  this.setState({
					  process: true,
				  })
				  apis.getMenuTypeCategory(this.state.phone, 0, 1)
                .then(res => {
					
					this.setState({ process: false, menus: res.data.menus,type: res.data.type, isShowP: true, items: res.data.items, data:res.data.items[0].data, stt:res.data.items[0].stt, tee: ((res.data.tee * res.data.hesotee)/100)})
					this.setState({hesocom: res.data.hesocom,hesoman: res.data.hesoman,hesotee: res.data.hesotee})
					
					if(res.data.type == 0){
						this.setState({heso: 0.25})

						
					}
					if(res.data.type == 1){
						if(this.state.disease == 2){
							this.setState({heso: 0.4})
						}else{
							this.setState({heso: 0.45})
						}
						
						
	
					}
					if(res.data.type == 2){

						if(this.state.disease == 2){
							this.setState({heso: 0.25})
						}else{
							this.setState({heso: 0.3})
						}
						
					}
					
                })
                .catch(err => {
					
					this.setState({ process: false })
					return showMessage({ message: err.data.message, type: "error" })
                })
			  }
			},
			{
			  text: 'Bữa trưa',
			  onPress: () => {
				  this.setState({
					  process: true
				  })
				  apis.getMenuTypeCategory(this.state.phone, 1, 1)
                .then(res => {
					
					this.setState({ process: false, menus: res.data.menus,type: res.data.type, isShowP: true, items: res.data.items, data:res.data.items[0].data, stt:res.data.items[0].stt, tee: ((res.data.tee * res.data.hesotee)/100)})
					this.setState({hesocom: res.data.hesocom,hesoman: res.data.hesoman,hesotee: res.data.hesotee})
					
					if(res.data.type == 0){
						this.setState({heso: 0.25})

						
					}
					if(res.data.type == 1){
						if(this.state.disease == 2){
							this.setState({heso: 0.4})
						}else{
							this.setState({heso: 0.45})
						}	
					}
					if(res.data.type == 2){

						if(this.state.disease == 2){
							this.setState({heso: 0.25})
						}else{
							this.setState({heso: 0.3})
						}
						
					}
					
                })
                .catch(err => {
					
					this.setState({ process: false })
					return showMessage({ message: err.data.message, type: "error" })
                })
			  },
			  
			},
			{ 
				text: 'Bữa Tối', 
				onPress: () => {
				  this.setState({
					  process: true
				  })
				  apis.getMenuTypeCategory(this.state.phone, 2, 1)
                .then(res => {
					
					this.setState({ process: false, menus: res.data.menus,type: res.data.type, isShowP: true, items: res.data.items, data:res.data.items[0].data, stt:res.data.items[0].stt, tee: ((res.data.tee * res.data.hesotee)/100)})
					this.setState({hesocom: res.data.hesocom,hesoman: res.data.hesoman,hesotee: res.data.hesotee})
					
					if(res.data.type == 0){
						this.setState({heso: 0.25})

						
					}
					if(res.data.type == 1){
						if(this.state.disease == 2){
							this.setState({heso: 0.4})
						}else{
							this.setState({heso: 0.45})
						}
						
						
	
					}
					if(res.data.type == 2){

						if(this.state.disease == 2){
							this.setState({heso: 0.25})
						}else{
							this.setState({heso: 0.3})
						}
						
					}
					
                })
                .catch(err => {
					
					this.setState({ process: false })
					return showMessage({ message: err.data.message, type: "error" })
                })
			  } 
			},
			
		  ],
		  { cancelable: false }
		);
       
    }
	onWebViewMessage = (event: WebViewMessageEvent) => {
		this.setState({webViewHeight: Number(event.nativeEvent.data)})
	  }
	_showMathTow(id, val) {
		let items = this.state.items[this.state.key].items[id].items
		let pageY = this.state.pageY
		let data = this.state.data
		let y
		if(this.state.first == 1){
		let key = []
		for(let a = 0; a < data['m2'].length; a++){
			key.push(data['m2'][a].key);
		}
		for(let i = 0; i < items.length; i++){
			if(key.indexOf(items[i].id) != -1){
				items[i].status = !items[i].status;
			}
		}
		}
		this.setState({
		  isShowTow: !this.state.isShowTow,
		  items_: items, 
		  keyData: id, 
		  keyDataTow: val, 
		  first: 0, 
		  tinkiem: '', 
		})

		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({t: height*.5}) 
	 }
	 _offBreakfastTow = () => {
		let items = this.state.items
		let items_ = this.state.items_
		items[this.state.key].items[this.state.keyData].items = items_;
		this.setState({
		  isShowTow: !this.state.isShowTow,
		  items: items,

		})
		
		this.setState({
		  height: height,

		})
	 }
	
	pickClickTow(id, val) {
										let array_ = this.state.items_
										array_[id].status = !array_[id].status;
										let items = this.state.items
										if(typeof items[this.state.key].items[this.state.keyData].chose != 'undefined' && items[this.state.key].items[this.state.keyData].chose != id && items[this.state.key].items[this.state.keyData].chose != -1){
											array_[items[this.state.key].items[this.state.keyData].chose].status = !array_[items[this.state.key].items[this.state.keyData].chose].status;
										}
										if(typeof items[this.state.key].items[this.state.keyData].chose != 'undefined' && items[this.state.key].items[this.state.keyData].chose == id){
											items[this.state.key].items[this.state.keyData].chose = -1
											
										}else{
											items[this.state.key].items[this.state.keyData].chose = id;
										}
										this.setState({
												items_: array_,
											})	
										let data = this.state.data;
										let stt = this.state.stt
										this.setState({
											stt: [],
										})
										let itemValue = items[this.state.key].items[this.state.keyData].chose
										
										
										let hesoman
										
										
										data[val.key] = {key: 0, he_so: 0, item: {}};
										data[val.key].key = itemValue;
										data[val.key].math = val.math;
										data[val.key].don_vi = val.don_vi;
										data[val.key].show = true;
										if(this.state.type == 0){
						
						hesoman = 0.25
						
					}
					if(this.state.type == 1){
						if(this.state.disease == 2){
							hesoman = 0.4
							
						}else{
							hesoman = 0.45
							
						}
						
						
	
					}
					if(this.state.type == 2){

						if(this.state.disease == 2){
							hesoman = 0.25
							
						}else{
							hesoman = 0.3
							
						}
						
					}
										if(itemValue != -1){
										if(this.state.disease == 3 && val.math == 1){
											data[val.key].he_so = parseFloat(this.state.tee*hesoman*0.6*0.9*(this.state.hesocom/100))/(4*val.items[itemValue].Glucid);
										}
										if(this.state.disease == null && val.math == 1){
										
											data[val.key].he_so = parseFloat(this.state.tee*hesoman*0.6*0.9*(this.state.hesocom/100))/(4*val.items[itemValue].Glucid);
										}
										if(this.state.disease == 0 && val.math == 1){
											data[val.key].he_so = parseFloat(this.state.tee*hesoman*0.6*0.9*(this.state.hesocom/100))/(4*val.items[itemValue].Glucid);
										}
										if(this.state.disease == 1 && val.math == 1){
											data[val.key].he_so = parseFloat(this.state.tee*hesoman*0.55*0.9*(this.state.hesocom/100))/(4*val.items[itemValue].Glucid);
										}
										if(this.state.disease == 2 && val.math == 1){
											data[val.key].he_so = parseFloat(this.state.tee*hesoman*0.55*0.9*(this.state.hesocom/100))/(4*val.items[itemValue].Glucid);
										}
										if(this.state.disease == 3 && val.math == 1){
											data[val.key].he_so = parseFloat(this.state.tee*hesoman*0.6*0.9*(this.state.hesocom/100))/(4*val.items[itemValue].Glucid);
										}
										let charC = []
										
										if(val.math == 1){
											
										let hs_ = parseFloat(parseFloat(data[val.key].he_so).toFixed(1))
										charC.push({
											name: this.state.name,
											population: hs_,
											color: this.state.colorChart[0],
											legendFontColor: "#7F7F7F",
											legendFontSize: 13
										  })
										}
										
										let kg = 0;
										if(val.math == 3){
											if(this.state.age < 8){
												kg = 75;
											}else if(this.state.age < 16){
												kg = 100;
											}else{
												if(this.state.disease == null || this.state.disease == 0){
													kg = 150;
													
												}else{
													kg = 180;
												
												}
											}
											data[val.key].he_so = parseFloat(kg/(val.items[itemValue].amount1));
										}
										if(val.math == 4){
											
											data[val.key].he_so = (this.state.tee*hesoman*0.18*0.2)/(4*val.items[itemValue].Protein);
										}
										if(val.math == 5){
											
											data[val.key].he_so = 1;
										}
										data[val.key].item = val.items[itemValue];
										if(this.state.gender == 0){
											
										}else{
											
										}
										if(this.state.key_ == 0){
										for(let b = 0; b < this.state.groups[this.state.key_].tee.length; b++){	
										if(b == this.state.key_one){
											if(this.state.type == 0){
						

						hesoman = 0.25
					}
					if(this.state.type == 1){
						if(this.state.groups[this.state.key_].users[b].disease == 2){
							
							hesoman = 0.45
						}else{
							
							hesoman = 0.45
						}
						
						
	
					}
					if(this.state.type == 2){

						if(this.state.groups[this.state.key_].users[b].disease == 2){
							
							hesoman = 0.25
						}else{
						
							hesoman = 0.3
						}
						
					}
										let name_ = this.state.groups[this.state.key_].items[b].name
										let heso_
										if(this.state.groups[this.state.key_].users[b].disease == 3 && val.math == 1){
											heso_ = parseFloat(this.state.groups[this.state.key_].tee[b]*hesoman*0.6*0.9*(this.state.groups[this.state.key_].users[b].heso/100))/(4*val.items[itemValue].Glucid)
											data[val.key].he_so = parseFloat(data[val.key].he_so) + parseFloat(this.state.groups[this.state.key_].tee[b]*hesoman*0.6*0.9*(this.state.groups[this.state.key_].users[b].heso/100))/(4*val.items[itemValue].Glucid);
										}
										if(this.state.groups[this.state.key_].users[b].disease == null && val.math == 1){
											heso_ = parseFloat(this.state.groups[this.state.key_].tee[b]*hesoman*0.6*0.9*(this.state.groups[this.state.key_].users[b].heso/100))/(4*val.items[itemValue].Glucid)
											data[val.key].he_so = parseFloat(data[val.key].he_so) + parseFloat(this.state.groups[this.state.key_].tee[b]*hesoman*0.6*0.9*(this.state.groups[this.state.key_].users[b].heso/100))/(4*val.items[itemValue].Glucid);
										}
										if(this.state.groups[this.state.key_].users[b].disease == 0 && val.math == 1){
											heso_ = parseFloat(this.state.groups[this.state.key_].tee[b]*hesoman*0.6*0.9*(this.state.groups[this.state.key_].users[b].heso/100))/(4*val.items[itemValue].Glucid)
											data[val.key].he_so = parseFloat(data[val.key].he_so) + parseFloat(this.state.groups[this.state.key_].tee[b]*hesoman*0.6*0.9*(this.state.groups[this.state.key_].users[b].heso/100))/(4*val.items[itemValue].Glucid);
										}
										if(this.state.groups[this.state.key_].users[b].disease == 1 && val.math == 1){
											heso_ = parseFloat(this.state.groups[this.state.key_].tee[b]*hesoman*0.55*0.9*(this.state.groups[this.state.key_].users[b].heso/100))/(4*val.items[itemValue].Glucid)
											data[val.key].he_so = parseFloat(data[val.key].he_so) + parseFloat(this.state.groups[this.state.key_].tee[b]*hesoman*0.55*0.9*(this.state.groups[this.state.key_].users[b].heso/100))/(4*val.items[itemValue].Glucid);
										}
										if(this.state.groups[this.state.key_].users[b].disease == 2 && val.math == 1){
											heso_ = parseFloat(data[val.key].he_so) + parseFloat(this.state.groups[this.state.key_].tee[b]*hesoman*0.55*0.9*(this.state.groups[this.state.key_].users[b].heso/100))/(4*val.items[itemValue].Glucid)
											data[val.key].he_so = parseFloat(data[val.key].he_so) + parseFloat(this.state.groups[this.state.key_].tee[b]*hesoman*0.55*0.9*(this.state.groups[this.state.key_].users[b].heso/100))/(4*val.items[itemValue].Glucid);
										}
										if(this.state.groups[this.state.key_].users[b].disease == 3 && val.math == 1){
											heso_ = parseFloat(this.state.groups[this.state.key_].tee[b]*hesoman*0.6*0.9*(this.state.groups[this.state.key_].users[b].heso/100))/(4*val.items[itemValue].Glucid)
											data[val.key].he_so = parseFloat(data[val.key].he_so) + parseFloat(this.state.groups[this.state.key_].tee[b]*hesoman*0.6*0.9*(this.state.groups[this.state.key_].users[b].heso/100))/(4*val.items[itemValue].Glucid);
										}
										 
										if(val.math == 1){
											
										let hs_ = parseFloat(parseFloat(heso_).toFixed(1))
										let lengthC = charC.length
										charC.push({
											name: name_,
											population: hs_,
											color: this.state.colorChart[lengthC],
											legendFontColor: "#7F7F7F",
											legendFontSize: 13
										  })
										  this.setState({
											charC: charC
										})
										}
									
										
										let kg = 0;
										if(val.math == 3){
											if(this.state.age < 8){
												kg = 75;
											}else if(this.state.age < 16){
												kg = 100;
											}else{
												if(this.state.groups[this.state.key_].users[b].disease == null || this.state.groups[this.state.key_].users[b].disease == 0){
													kg = 150;
													
												}else{
													kg = 180;
												
												}
											}
											data[val.key].he_so = parseFloat(data[val.key].he_so) + parseFloat(kg/(val.items[itemValue].amount1));
										}
										if(val.math == 4){
											
											data[val.key].he_so = parseFloat(data[val.key].he_so) + (this.state.groups[this.state.key_].tee[b]*hesoman*0.18*0.2)/(4*val.items[itemValue].Protein);
										}
										if(val.math == 5){
											
											data[val.key].he_so = parseFloat(data[val.key].he_so) + 1;
										}
										data[val.key].item = val.items[itemValue];
										if(this.state.gender == 0){
											
										}else{
											
										}
										}
										}
										}else{
										
										for(let b = 0; b < this.state.groups[this.state.key_][this.state.key_group].tee.length; b++){	
											if(this.state.type == 0){
						
						hesoman = 0.25
						
					}
					if(this.state.type == 1){
						if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 2){
							
							hesoman = 0.4
						}else{
							
							hesoman = 0.45
						}
						
						
	
					}
					if(this.state.type == 2){

						if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 2){
						
							hesoman = 0.25
						}else{
							
							hesoman = 0.3
						}
						
					}
											let name_ = this.state.groups[this.state.key_][this.state.key_group].users[b].name
											let heso_
										if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 3 && val.math == 1){
											
											heso_ = parseFloat(this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesoman*0.6*0.9*(this.state.groups[this.state.key_][this.state.key_group].users[b].heso/100))/(4*val.items[itemValue].Glucid)
											data[val.key].he_so = parseFloat(data[val.key].he_so) + parseFloat(this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesoman*0.6*0.9*(this.state.groups[this.state.key_][this.state.key_group].users[b].heso/100))/(4*val.items[itemValue].Glucid);
										}
										if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == null && val.math == 1){
											
											heso_ = parseFloat(this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesoman*0.6*0.9*(this.state.groups[this.state.key_][this.state.key_group].users[b].heso/100))/(4*val.items[itemValue].Glucid)
											data[val.key].he_so = parseFloat(data[val.key].he_so) + parseFloat(this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesoman*0.6*0.9*(this.state.groups[this.state.key_][this.state.key_group].users[b].heso/100))/(4*val.items[itemValue].Glucid);
										}
										if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 0 && val.math == 1){
											
											heso_ = parseFloat(this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesoman*0.6*0.9*(this.state.groups[this.state.key_][this.state.key_group].users[b].heso/100))/(4*val.items[itemValue].Glucid)
											data[val.key].he_so = parseFloat(data[val.key].he_so) + parseFloat(this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesoman*0.6*0.9*(this.state.groups[this.state.key_][this.state.key_group].users[b].heso/100))/(4*val.items[itemValue].Glucid);
										}
										if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 1 && val.math == 1){
											
											heso_ =  parseFloat(this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesoman*0.55*0.9*(this.state.groups[this.state.key_][this.state.key_group].users[b].heso/100))/(4*val.items[itemValue].Glucid)
											data[val.key].he_so = parseFloat(data[val.key].he_so) + parseFloat(this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesoman*0.55*0.9*(this.state.groups[this.state.key_][this.state.key_group].users[b].heso/100))/(4*val.items[itemValue].Glucid);
										}
										
										if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 2 && val.math == 1){
											heso_ = parseFloat(this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesoman*0.55*0.9*(this.state.groups[this.state.key_][this.state.key_group].users[b].heso/100))/(4*val.items[itemValue].Glucid)
											data[val.key].he_so = parseFloat(data[val.key].he_so) + parseFloat(this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesoman*0.55*0.9*(this.state.groups[this.state.key_][this.state.key_group].users[b].heso/100))/(4*val.items[itemValue].Glucid);
										}
										
										
										
										if(val.math == 1){
										
										let hs_ = parseFloat(parseFloat(heso_).toFixed(1))
										let lengthC = charC.length
										charC.push({
											name: name_,
											population: hs_,
											color: this.state.colorChart[lengthC],
											legendFontColor: "#7F7F7F",
											legendFontSize: 13
										  })
										  this.setState({
											charC: charC
										})
										}
										
										let kg = 0;
										if(val.math == 3){
											if(this.state.groups[this.state.key_][this.state.key_group].users[b] < 8){
												kg = 75;
											}else if(this.state.groups[this.state.key_][this.state.key_group].users[b] < 16){
												kg = 100;
											}else{
												if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == null || this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 0){
													kg = 150;
													
												}else{
													kg = 180;
												
												}
											}
											data[val.key].he_so = parseFloat(data[val.key].he_so) + parseFloat(kg/(val.items[itemValue].amount1));
										}
										if(val.math == 4){
											
											data[val.key].he_so = parseFloat(data[val.key].he_so) + (this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesoman*0.18*0.2)/(4*val.items[itemValue].Protein);
										}
										if(val.math == 5){
											
											data[val.key].he_so = parseFloat(data[val.key].he_so) + 1;
										}
										
										data[val.key].item = val.items[itemValue];
										if(this.state.gender == 0){
											
										}else{
											
										}
										}
										
										}
										
									}
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
		
										for(let c = 0; c < stt.length; c++){
											if(stt[c] == 'm2'){
												for(let b = 0; b < data['m2'].length; b++){
													a[0].total_ = a[0].total_ + data['m2'][b].he_so * data['m2'][b].value.energy 
													a[1].total_ = a[1].total_ + data['m2'][b].he_so * data['m2'][b].value.Protein 
													a[2].total_ = a[2].total_ + data['m2'][b].he_so * data['m2'][b].value.Lipid 
													a[3].total_ = a[3].total_ + data['m2'][b].he_so * data['m2'][b].value.Glucid 
													a[4].total_ = a[4].total_ + data['m2'][b].he_so * data['m2'][b].value.Vitamin_A 
													a[5].total_ = a[5].total_ + data['m2'][b].he_so * data['m2'][b].value.Celluloza 
													a[6].total_ = a[6].total_ + data['m2'][b].he_so * data['m2'][b].value.Vitamin_C 
													a[7].total_ = a[7].total_ + data['m2'][b].he_so * data['m2'][b].value.Calci 
													a[8].total_ = a[8].total_ + data['m2'][b].he_so * data['m2'][b].value.Fe 
													a[9].total_ = a[9].total_ + data['m2'][b].he_so * data['m2'][b].value.Natri 
													a[10].total_ = a[10].total_ + data['m2'][b].he_so * data['m2'][b].value.Kali 
													a[11].total_ = a[11].total_ + data['m2'][b].he_so * data['m2'][b].value.Zn 
													a[12].total_ = a[12].total_ + data['m2'][b].he_so * data['m2'][b].value.Cholesterol 
													a[13].total_ = a[13].total_ + data['m2'][b].he_so * data['m2'][b].value.Beta_caroten 
												}
											}else if(stt[c] == 'hs'){
												for(let b = 0; b < data['hs'].length; b++){
													a[0].total_ = a[0].total_ + data['hs'][b].he_so * data['hs'][b].value.energy 
													a[1].total_ = a[1].total_ + data['hs'][b].he_so * data['hs'][b].value.Protein 
													a[2].total_ = a[2].total_ + data['hs'][b].he_so * data['hs'][b].value.Lipid 
													a[3].total_ = a[3].total_ + data['hs'][b].he_so * data['hs'][b].value.Glucid 
													a[4].total_ = a[4].total_ + data['hs'][b].he_so * data['hs'][b].value.Vitamin_A 
													a[5].total_ = a[5].total_ + data['hs'][b].he_so * data['hs'][b].value.Celluloza 
													a[6].total_ = a[6].total_ + data['hs'][b].he_so * data['hs'][b].value.Vitamin_C 
													a[7].total_ = a[7].total_ + data['hs'][b].he_so * data['hs'][b].value.Calci 
													a[8].total_ = a[8].total_ + data['hs'][b].he_so * data['hs'][b].value.Fe 
													a[9].total_ = a[9].total_ + data['hs'][b].he_so * data['hs'][b].value.Natri 
													a[10].total_ = a[10].total_ + data['hs'][b].he_so * data['hs'][b].value.Kali 
													a[11].total_ = a[11].total_ + data['hs'][b].he_so * data['hs'][b].value.Zn 
													a[12].total_ = a[12].total_ + data['hs'][b].he_so * data['hs'][b].value.Cholesterol 
													a[13].total_ = a[13].total_ + data['hs'][b].he_so * data['hs'][b].value.Beta_caroten 
												}
											}else if(stt[c] == 'm'){
												for(let b = 0; b < data['m'].length; b++){
													a[0].total_ = a[0].total_ + data['m'][b].he_so * data['m'][b].value.energy 
													a[1].total_ = a[1].total_ + data['m'][b].he_so * data['m'][b].value.Protein 
													a[2].total_ = a[2].total_ + data['m'][b].he_so * data['m'][b].value.Lipid 
													a[3].total_ = a[3].total_ + data['m'][b].he_so * data['m'][b].value.Glucid 
													a[4].total_ = a[4].total_ + data['m'][b].he_so * data['m'][b].value.Vitamin_A 
													a[5].total_ = a[5].total_ + data['m'][b].he_so * data['m'][b].value.Celluloza 
													a[6].total_ = a[6].total_ + data['m'][b].he_so * data['m'][b].value.Vitamin_C 
													a[7].total_ = a[7].total_ + data['m'][b].he_so * data['m'][b].value.Calci 
													a[8].total_ = a[8].total_ + data['m'][b].he_so * data['m'][b].value.Fe 
													a[9].total_ = a[9].total_ + data['m'][b].he_so * data['m'][b].value.Natri 
													a[10].total_ = a[10].total_ + data['m'][b].he_so * data['m'][b].value.Kali 
													a[11].total_ = a[11].total_ + data['m'][b].he_so * data['m'][b].value.Zn 
													a[12].total_ = a[12].total_ + data['m'][b].he_so * data['m'][b].value.Cholesterol 
													a[13].total_ = a[13].total_ + data['m'][b].he_so * data['m'][b].value.Beta_caroten 
												}
											}else if(stt[c] == 'r'){
												let hs = 3/this.state.data['r'].length 
												if(this.state.key_ == 1){
													hs = (this.state.item_group[this.state.key_group].array_user.length + 1) * 1.5/(this.state.data['r'].length*10)
												}
												for(let b = 0; b < data['r'].length; b++){
													a[0].total_ = a[0].total_ + hs * data['r'][b].value.energy 
													a[1].total_ = a[1].total_ + hs * data['r'][b].value.Protein 
													a[2].total_ = a[2].total_ + hs * data['r'][b].value.Lipid 
													a[3].total_ = a[3].total_ + hs * data['r'][b].value.Glucid 
													a[4].total_ = a[4].total_ + hs * data['r'][b].value.Vitamin_A 
													a[5].total_ = a[5].total_ + hs * data['r'][b].value.Celluloza 
													a[6].total_ = a[6].total_ + hs * data['r'][b].value.Vitamin_C 
													a[7].total_ = a[7].total_ + hs * data['r'][b].value.Calci 
													a[8].total_ = a[8].total_ + hs * data['r'][b].value.Fe 
													a[9].total_ = a[9].total_ + hs * data['r'][b].value.Natri 
													a[10].total_ = a[10].total_ + hs * data['r'][b].value.Kali 
													a[11].total_ = a[11].total_ + hs * data['r'][b].value.Zn 
													a[12].total_ = a[12].total_ + hs * data['r'][b].value.Cholesterol 
													a[13].total_ = a[13].total_ + hs * data['r'][b].value.Beta_caroten 
												}
											}else{
												if(typeof data[stt[c]].item == 'undefined' || data[stt[c]].key == -1)continue;
												if(this.state.key == 0){
												a[0].total_ = a[0].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.energy 
												}else{
													a[0].total_ = a[0].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.energy 
												}
												a[1].total_ = a[1].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Protein 
												a[2].total_ = a[2].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Lipid 
												a[3].total_ = a[3].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Glucid 
												a[4].total_ = a[4].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Vitamin_A 
												a[5].total_ = a[5].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Celluloza 
												a[6].total_ = a[6].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Vitamin_C 
												a[7].total_ = a[7].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Calci 
												a[8].total_ = a[8].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Fe 
												a[9].total_ = a[9].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Natri 
												a[10].total_ = a[10].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Kali 
												a[11].total_ = a[11].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Zn 
												a[12].total_ = a[12].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Cholesterol 
												a[13].total_ = a[13].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Beta_caroten
											}
										}
										
										if(itemValue != -1){
											data[val.key].status = true;
										}else{
											data[val.key].status = false;
										}
										
										this.setState({data: data, stt: stt, array_: a, items: items})		
	}
	_createFood = () => {
		Actions.createfood()
	}
	_showTabGroup(id) {
		if(id == this.state.key_)return;
		if(id){
		Actions.menugrouptow({key_ : id})
		}else{
			Actions.menugroup({key_ : id})
		}
		/*let data = this.state.groups[id].items;
		this.setState({ key_: id, item_group: data})
		let data_ = this.state.items[this.state.key];
		
		this.setState({ items: [], data: this.state.data_, stt: data_.stt})
		this.setState({ items:this.state.items_})
		this.setState({ charC: [
				{
					name: "Chưa chọn",
					population: 100,
					color: "rgba(131, 167, 234, 1)",
					legendFontColor: "#7F7F7F",
					legendFontSize: 15
				},
			],
			chartM: [
				{
					name: "Chưa chọn",
					population: 100,
					color: "rgba(131, 167, 234, 1)",
					legendFontColor: "#7F7F7F",
					legendFontSize: 15
				},
			]})*/

	}
	_showTab(id) {
		let data = this.state.items[id];
		this.setState({ key: id, items: [], data: data.data, stt: data.stt})
		this.setState({ items:this.state.items})
	}
	_save = () => {
		let data = {
			data: this.state.data,
			stt: this.state.stt,
			array_: this.state.array_,
		}
		
		let send_ = JSON.stringify(data)
		let id
	
		if(this.state.key_ == 0){id = this.state.groups[0].items[this.state.key_one].id}else{
			id = this.state.groups[1].items[this.state.key_group].id
		}
		
		apis.saveMenuGroup(send_, this.state.phone, this.state.type, this.state.key_, id, this.state.key)
                .then(res => {
					Alert.alert('Thông báo',  res.data.message )
                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					return Alert.alert('Thông báo',  'Có lỗi trong quá trình kết nối' )
                })
	}
	_menuList = () => {
		Actions.mymenu()
	}
	_stepfour = () => {
		Actions.stepfour()
	}
	changeLayoutOne = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded }); 
  }
	_chose = () => {
		Alert.alert(
		  'Thông báo',
		  'Bạn Lên Thực Đơn Cho',
		  [
			{
			  text: 'Bữa Sáng',
			  onPress: () => {
				  this.setState({
					  process: true,
				  })
				  apis.getMenuTypeCategory(this.state.phone, 0, 1)
                .then(res => {
					
					this.setState({ process: false, menus: res.data.menus,type: res.data.type, isShowP: true, items: res.data.items, data:res.data.items[0].data, stt:res.data.items[0].stt, tee: ((res.data.tee * res.data.hesotee)/100)})
					this.setState({hesocom: res.data.hesocom,hesoman: res.data.hesoman,hesotee: res.data.hesotee})
					
					if(res.data.type == 0){
						this.setState({heso: 0.25})

						
					}
					if(res.data.type == 1){
						if(this.state.disease == 2){
							this.setState({heso: 0.4})
						}else{
							this.setState({heso: 0.45})
						}
						
						
	
					}
					if(res.data.type == 2){

						if(this.state.disease == 2){
							this.setState({heso: 0.25})
						}else{
							this.setState({heso: 0.3})
						}
						
					}
					
                })
                .catch(err => {
					
					this.setState({ process: false })
					return showMessage({ message: err.data.message, type: "error" })
                })
			  }
			},
			{
			  text: 'Bữa trưa',
			  onPress: () => {
				  this.setState({
					  process: true
				  })
				  apis.getMenuTypeCategory(this.state.phone, 1, 1)
                .then(res => {
					
					this.setState({ process: false, menus: res.data.menus,type: res.data.type, isShowP: true, items: res.data.items, data:res.data.items[0].data, stt:res.data.items[0].stt, tee: ((res.data.tee * res.data.hesotee)/100)})
					this.setState({hesocom: res.data.hesocom,hesoman: res.data.hesoman,hesotee: res.data.hesotee})
					
					if(res.data.type == 0){
						this.setState({heso: 0.25})

						
					}
					if(res.data.type == 1){
						if(this.state.disease == 2){
							this.setState({heso: 0.4})
						}else{
							this.setState({heso: 0.45})
						}	
					}
					if(res.data.type == 2){

						if(this.state.disease == 2){
							this.setState({heso: 0.25})
						}else{
							this.setState({heso: 0.3})
						}
						
					}
					
                })
                .catch(err => {
					
					this.setState({ process: false })
					return showMessage({ message: err.data.message, type: "error" })
                })
			  },
			  
			},
			{ 
				text: 'Bữa Tối', 
				onPress: () => {
				  this.setState({
					  process: true
				  })
				  apis.getMenuTypeCategory(this.state.phone, 2, 1)
                .then(res => {
					
					this.setState({ process: false, menus: res.data.menus,type: res.data.type, isShowP: true, items: res.data.items, data:res.data.items[0].data, stt:res.data.items[0].stt, tee: ((res.data.tee * res.data.hesotee)/100)})
					this.setState({hesocom: res.data.hesocom,hesoman: res.data.hesoman,hesotee: res.data.hesotee})
					
					if(res.data.type == 0){
						this.setState({heso: 0.25})

						
					}
					if(res.data.type == 1){
						if(this.state.disease == 2){
							this.setState({heso: 0.4})
						}else{
							this.setState({heso: 0.45})
						}
						
						
	
					}
					if(res.data.type == 2){

						if(this.state.disease == 2){
							this.setState({heso: 0.25})
						}else{
							this.setState({heso: 0.3})
						}
						
					}
					
                })
                .catch(err => {
					this.setState({ process: false })
					return showMessage({ message: err.data.message, type: "error" })
                })
			  } 
			},
			
		  ],
		  { cancelable: false }
		);
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
	_home = () => {
		Actions.home({tess_: '1111'})
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
	 _checkGroup(id) {
		 if(this.state.key_ == 0){
			this.setState({
				key_one: id
			})
		 }else{
			 this.setState({
				key_group: id
			})
		 }
		 let data_ = this.state.items[this.state.key];
		this.setState({ items: [], data: data_.data, stt: data_.stt})
		this.setState({ items:this.state.items})
		this.setState({ charC: [
				{
					name: "Chưa chọn",
					population: 100,
					color: "rgba(131, 167, 234, 1)",
					legendFontColor: "#7F7F7F",
					legendFontSize: 15
				},
			],
			chartM: [
				{
					name: "Chưa chọn",
					population: 100,
					color: "rgba(131, 167, 234, 1)",
					legendFontColor: "#7F7F7F",
					legendFontSize: 15
				},
			]})
	 }
	 _showMath(id) {
		let items = this.state.items[this.state.key].items[id].items
		let pageY = this.state.pageY
		let y
		
		this.setState({
		  isShow: !this.state.isShow,
		  items_: items, 
		  keyData: id, 
		  l: 10,
		})

		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({t: height*.5, l: 0})
	}
	_offBreakfast = () => {
		
		
		let items = this.state.items
		let items_ = this.state.items_
		items[this.state.key].items[this.state.keyData].items = items_;
		this.setState({
		  isShow: !this.state.isShow,
		  items: items,
		})
		
		this.setState({
		  height: height,

		})
	 }
	_showValue(val) {
		let data = this.state.data
		data[val].show = (data[val].show) ? false : true; 
		this.setState({data: data})
		let stt = this.state.stt
		this.setState({stt: []})
		this.setState({stt: stt})
	}
	_showValueM(id) {
		let data = this.state.data
		data['m2'][id].show = (data['m2'][id].show) ? false : true; 
		this.setState({data: data})
		let stt = this.state.stt
		this.setState({stt: []})
		this.setState({stt: stt})
	}
	pickClick(id) {
		let array_ = this.state.items_
		let data = this.state.data
		let stt = this.state.stt
		this.setState({
		  stt: [],

		})
		let hesobua
		let dataShow = []
		if(this.state.key == 0){
		let dataShow = [];
		dataShow['m2'] = [];
		
		if(array_[id].status){
			for(let i = 0; i < data['m2'].length; i++){
				if(data['m2'][i].key == array_[id].id){
					data['m2'].splice(i, 1);
				}
			}
		}else{
			data['m2'].push({id: id, value: array_[id], key: array_[id].id, datas: [], show: true });
			
			
		}
		let charts = []
		let lenth = parseInt(data['m2'].length)*4;
		if(this.state.type == 0){
						
						hesobua = 0.25
						
					}
					if(this.state.type == 1){
						if(this.state.disease == 2){
							hesobua = 0.4
							
						}else{
							hesobua = 0.45
							
						}
						
						
	
					}
					if(this.state.type == 2){

						if(this.state.disease == 2){
							hesobua = 0.25
							
						}else{
							hesobua = 0.3
							
						}
						
					}
		for(let i = 0; i < data['m2'].length; i++){
			data['m2'][i].datas = []
			
			
			if(this.state.age <  16){
				if(this.state.age >=  3 && this.state.age <=  8){
					heso = ((this.state.tee*hesobua*0.18*0.65*(this.state.hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}else{
					heso = ((this.state.tee*hesobua*0.18*0.55*(this.state.hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}
				
			}else{
				
				if(this.state.disease == 3){
					heso = ((this.state.tee*hesobua*0.18*0.45*(this.state.hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}
				if(this.state.disease == 2){
					heso = ((this.state.tee*hesobua*0.18*0.45*(this.state.hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}
				if(this.state.disease == 1){
					heso = ((this.state.tee*hesobua*0.18*0.45*(this.state.hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}	
				if(this.state.disease == null){
					heso = ((this.state.tee*hesobua*0.18*0.45*(this.state.hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}
				if(this.state.disease == 0){
					heso = ((this.state.tee*hesobua*0.18*0.45*(this.state.hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}
			}
			data['m2'][i].he_so = heso
			data['m2'][i].datas.push({
				name: this.state.name,
				population: heso,
				color: this.state.colorChart[0],
				legendFontColor: "#7F7F7F",
				legendFontSize: 13
			  })
			
			
		}
		let chart = []
		for(let i = 0; i < data['m2'].length; i++){
			
			let heso = 0;
			let name_ = '';
			let heso_ = '';
			if(this.state.key_ == 0){
				
			for(let b = 0; b < this.state.groups[this.state.key_].tee.length; b++){ 
			if(b == this.state.key_one){
				if(this.state.type == 0){
						
						hesobua = 0.25
						
					}
					if(this.state.type == 1){
						if(this.state.groups[this.state.key_].users[b].disease == 2){
							
							hesobua = 0.4
						}else{
							
							hesobua = 0.45
						}
						
						
	
					}
					if(this.state.type == 2){

						if(this.state.groups[this.state.key_].users[b].disease == 2){
							
							hesobua = 0.25
						}else{
							
							hesobua = 0.3
						}
						
					}
				name_ = this.state.groups[this.state.key_].items[b].name
			if(this.state.groups[this.state.key_].users[b].age <  16){

				if(this.state.groups[this.state.key_].users[b].age >=  3 && this.state.groups[this.state.key_].users[b].age <=  8){
					heso_ = ((this.state.groups[this.state.key_].tee[b]*hesobua*0.18*0.65*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein;
					heso = heso  + ((this.state.groups[this.state.key_].tee[b]*hesobua*0.18*0.65*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}else{
					heso_ = ((this.state.groups[this.state.key_].tee[b]*hesobua*0.18*0.55*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein
					heso = heso  + ((this.state.groups[this.state.key_].tee[b]*hesobua*0.18*0.55*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}
				
			}else{
				
				if(this.state.groups[this.state.key_].users[b].disease == 3){
					heso_ = ((this.state.groups[this.state.key_].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein
					heso = heso  + ((this.state.groups[this.state.key_].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}
				if(this.state.groups[this.state.key_].users[b].disease == 2){
					heso_ = ((this.state.groups[this.state.key_].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein
					heso = heso  + ((this.state.groups[this.state.key_].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}
				if(this.state.groups[this.state.key_].users[b].disease == 1){
					heso_ = ((this.state.groups[this.state.key_].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein
					heso = heso  + ((this.state.groups[this.state.key_].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}	
				if(this.state.groups[this.state.key_].users[b].disease == null){
					heso_ = ((this.state.groups[this.state.key_].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein
					heso = heso  + ((this.state.groups[this.state.key_].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}
				if(this.state.groups[this.state.key_].users[b].disease == 0){
					heso_ = ((this.state.groups[this.state.key_].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein
					heso = heso  + ((this.state.groups[this.state.key_].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}
			}
			let lengthc = data['m2'][i].datas.length
			data['m2'][i].datas.push({
				name: name_,
				population: heso_,
				color: this.state.colorChart[lengthc],
				legendFontColor: "#7F7F7F",
				legendFontSize: 13
			  })
			}
			}
			
			
			
			}else{
				for(let b = 0; b < this.state.groups[this.state.key_][this.state.key_group].tee.length; b++){ 
				name_ = this.state.groups[this.state.key_][this.state.key_group].users[b].name
				let heso_
				if(this.state.type == 0){

						hesobua = 0.25
						
					}
					if(this.state.type == 1){
						if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 2){

							hesobua = 0.4
						}else{
				
							hesobua = 0.45
						}
						
						
	
					}
					if(this.state.type == 2){

						if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 2){
						
							hesobua = 0.25
						}else{
						
							hesobua = 0.3
						}
						
					}
				if(this.state.groups[this.state.key_][this.state.key_group].users[b].age <  16){
					if(this.state.groups[this.state.key_].users[b].age >=  3 && this.state.groups[this.state.key_][this.state.key_group].users[b].age <=  8){
						heso_ = ((this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.65*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein
						heso = heso  + ((this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.65*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein;
					}else{
						heso_ = ((this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.55*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein
						heso = heso  + ((this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.55*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein;
					}
					
				}else{
					
					if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 3){
						heso_ = ((this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein
						heso = heso  + ((this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein;
					}
					if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 2){
						
						heso_ = ((this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein
						heso = heso  + ((this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein;
					}
					if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 1){
						heso_ = ((this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein
						heso = heso  + ((this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein;
					}	
					if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == null){
						heso_ = ((this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein
						heso = heso  + ((this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein;
					}
					if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 0){
						heso_ = ((this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein
						heso = heso  + ((this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.45*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data['m2'][i].value.Protein;
					}
				}
				
					let lengthc = data['m2'][i].datas.length
					data['m2'][i].datas.push({
					name: name_,
					population: heso_,
					color: this.state.colorChart[lengthc],
					legendFontColor: "#7F7F7F",
					legendFontSize: 13
				  })
				}
				
			}
			
			data['m2'][i].he_so = data['m2'][i].he_so + heso;
			data['m2'].math = 2;
		
		}
		let chartM = []
		if(data['m2'].length > 0 ){
			
			for( var i = 0; i < data['m2'][0].datas.length; i++){
				
				chartM[i] = data['m2'][0].datas[i]
				let percen = parseInt(data['m2'][0].datas[i].population * 100/ data['m2'][0].he_so);
				chartM[i].population = percen
				chartM[i].name = '% ' + data['m2'][0].datas[i].name
			}
		}
		
		this.setState({
			chartM: chartM
		})
		}else{
			if(this.state.type == 0){
						
						hesobua = 0.25
						
					}
					if(this.state.type == 1){
						if(this.state.disease == 2){
							hesobua = 0.4
							
						}else{
							hesobua = 0.45
							
						}
						
						
	
					}
					if(this.state.type == 2){

						if(this.state.disease == 2){
							hesobua = 0.25
							
						}else{
							hesobua = 0.3
							
						}
						
					}
			let index_ = ''
			let protein = this.state.tee*hesobua*0.18*0.8
		if(this.state.items[this.state.key].items[this.state.keyData].math == 12 ){
			index_ = 'hs'
			protein = this.state.tee*hesobua*0.18*0.8*1/3
			
		}
		if(this.state.items[this.state.key].items[this.state.keyData].math == 11){
			index_ = 'm'
			protein = this.state.tee*hesobua*0.18*0.8
		}
		if(this.state.items[this.state.key].items[this.state.keyData].math == 10){
			index_ = 'r'
			protein = 3/2
			
		}
		
		dataShow[index_] = [];
		
		if(array_[id].status){
			for(let i = 0; i < data[index_].length; i++){
				if(data[index_][i].key == array_[id].id){
					data[index_].splice(i, 1);
				}
			}
		}else{
			data[index_].push({id: id, value: array_[id], key: array_[id].id, show:true});
			
			
		}
		
		let heso = 0;
		let lenth = parseInt(data[index_].length)*4;
		let lenth_ = data[index_].length;
		if(this.state.type == 0){
						
						hesobua = 0.25
						
					}
					if(this.state.type == 1){
						if(this.state.disease == 2){
							hesobua = 0.4
						}else{
							hesobua = 0.45
							
						}
						
						
	
					}
					if(this.state.type == 2){

						if(this.state.disease == 2){
							hesobua = 0.25
							
						}else{
							hesobua = 0.3

						}
						
					}
		for(let i = 0; i < data[index_].length; i++){
			let heso = 0;
			if(this.state.age <  16){
				if(this.state.age >=  3 && this.state.age <=  8){
					heso = ((protein*(this.state.hesoman/100))/lenth)/data[index_][i].value.Protein;
				}else{
					heso = ((protein*(this.state.hesoman/100))/lenth)/data[index_][i].value.Protein;
				}
				
			}else{
				
				if(this.state.disease == 3){
					heso = ((protein*(this.state.hesoman/100))/lenth)/data[index_][i].value.Protein;
				}
				if(this.state.disease == 2){
					heso = ((protein*(this.state.hesoman/100))/lenth)/data[index_][i].value.Protein;
				}
				if(this.state.disease == 1){
					heso = ((protein*(this.state.hesoman/100))/lenth)/data[index_][i].value.Protein;
				}	
				if(this.state.disease == null){
					heso = ((protein*(this.state.hesoman/100))/lenth)/data[index_][i].value.Protein;
				}
				if(this.state.disease == 0){
					heso = ((protein*(this.state.hesoman/100))/lenth)/data[index_][i].value.Protein;
				}
			}
			data[index_][i].he_so = heso;
			if(this.state.items[this.state.key].items[this.state.keyData].math == 10){
				
				data[index_][i].he_so = 1.5/parseInt(data[index_].length);
				
			}
		}
		
		for(let i = 0; i < data[index_].length; i++){
			let heso = 0;
			if(this.state.key_ == 0){
				
			
			if(i == this.state.key_one){
				if(this.state.type == 0){
						
						hesoman = 0.25
						
					}
					if(this.state.type == 1){
						if(this.state.groups[this.state.key_].users[i].disease == 2){
							
							hesoman = 0.4
						}else{
							
							hesoman = 0.45
						}
						
						
	
					}
					if(this.state.type == 2){

						if(this.state.groups[this.state.key_].users[i].disease == 2){
							hesoman = 0.25
						}else{
							hesoman = 0.3
						}
						
					}
					if(this.state.items[this.state.key].items[this.state.keyData].math == 12){
				protein = this.state.groups[this.state.key_].tee[i]*hesoman*0.18*0.8*2/3
			}
			if(this.state.items[this.state.key].items[this.state.keyData].math == 11){
				protein = this.state.groups[this.state.key_].tee[i]*hesoman*0.18*0.8
			}
			if(this.state.items[this.state.key].items[this.state.keyData].math == 10){
				protein = 100
			}
					for(let b = 0; b < this.state.groups[this.state.key_].tee.length; b++){ 
			
			if(this.state.groups[this.state.key_].users[b].age <  16){
				if(this.state.groups[this.state.key_].users[b].age >=  3 && this.state.groups[this.state.key_].users[b].age <=  8){
					heso = heso  + ((protein*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data[index_][i].value.Protein;
				}else{
					heso = heso  + ((protein*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data[index_][i].value.Protein;
				}
				
			}else{
				
			
				if(this.state.groups[this.state.key_].users[b].disease == 3){
					heso = heso  + ((protein*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data[index_][i].value.Protein;
				}
				if(this.state.groups[this.state.key_].users[b].disease == 2){
					heso = heso  + ((protein*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data[index_][i].value.Protein;
				}
				if(this.state.groups[this.state.key_].users[b].disease == 1){
					heso = heso  + ((protein*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data[index_][i].value.Protein;
				}	
				if(this.state.groups[this.state.key_].users[b].disease == null){
					heso = heso  + ((protein*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data[index_][i].value.Protein;
				}
				if(this.state.groups[this.state.key_].users[b].disease == 0){
					heso = heso  + ((protein*(this.state.groups[this.state.key_].users[b].hesoman/100))/lenth)/data[index_][i].value.Protein;
				}
				
			}
			if(this.state.items[this.state.key].items[this.state.keyData].math == 10){
				heso = heso + 1.5 * 4/lenth;
			}
			}
			}
			
			}else{
				heso = 0;
				for(let b = 0; b < this.state.groups[this.state.key_][this.state.key_group].tee.length; b++){ 
				if(this.state.type == 0){
						this.setState({heso: 0.25})

						
					}
					if(this.state.type == 1){
						if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 2){
							this.setState({heso: 0.4})
						}else{
							this.setState({heso: 0.45})
						}
						
						
	
					}
					if(this.state.type == 2){

						if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 2){
							this.setState({heso: 0.25})
						}else{
							this.setState({heso: 0.3})
						}
						
					}
				if(this.state.items[this.state.key].items[this.state.keyData].math == 12){
				protein = this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.8*2/3
				}
				if(this.state.items[this.state.key].items[this.state.keyData].math == 11){
					protein = this.state.groups[this.state.key_][this.state.key_group].tee[b]*hesobua*0.18*0.8
				}
				if(this.state.items[this.state.key].items[this.state.keyData].math == 10){
					protein = 100
				}
				if(this.state.groups[this.state.key_][this.state.key_group].users[b].age <  16){
					if(this.state.groups[this.state.key_].users[b].age >=  3 && this.state.groups[this.state.key_][this.state.key_group].users[b].age <=  8){
						heso = heso  + ((protein*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data[index_][i].value.Protein;
					}else{
						heso = heso  + ((protein*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data[index_][i].value.Protein;
					}
					
				}else{
					
					if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 3){
						heso = heso  + ((protein*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data[index_][i].value.Protein;
					}
					if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 2){
						heso = heso  + ((protein*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data[index_][i].value.Protein;
					}
					if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 1){
						heso = heso  + ((protein*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data[index_][i].value.Protein;
					}	
					if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == null){
						heso = heso  + ((protein*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data[index_][i].value.Protein;
					}
					if(this.state.groups[this.state.key_][this.state.key_group].users[b].disease == 0){
						heso = heso  + ((protein*(this.state.groups[this.state.key_][this.state.key_group].users[b].hesoman/100))/lenth)/data[index_][i].value.Protein;
					}
				}
				}
				
			}
			data[index_][i].he_so = data[index_][i].he_so + heso;

			data[index_].math = array_[id].math;
			
		}
		}
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
		
		for(let c = 0; c < stt.length; c++){
											if(stt[c] == 'm2'){
												for(let b = 0; b < data['m2'].length; b++){
													a[0].total_ = a[0].total_ + data['m2'][b].he_so * data['m2'][b].value.energy 
													a[1].total_ = a[1].total_ + data['m2'][b].he_so * data['m2'][b].value.Protein 
													a[2].total_ = a[2].total_ + data['m2'][b].he_so * data['m2'][b].value.Lipid 
													a[3].total_ = a[3].total_ + data['m2'][b].he_so * data['m2'][b].value.Glucid 
													a[4].total_ = a[4].total_ + data['m2'][b].he_so * data['m2'][b].value.Vitamin_A 
													a[5].total_ = a[5].total_ + data['m2'][b].he_so * data['m2'][b].value.Celluloza 
													a[6].total_ = a[6].total_ + data['m2'][b].he_so * data['m2'][b].value.Vitamin_C 
													a[7].total_ = a[7].total_ + data['m2'][b].he_so * data['m2'][b].value.Calci 
													a[8].total_ = a[8].total_ + data['m2'][b].he_so * data['m2'][b].value.Fe 
													a[9].total_ = a[9].total_ + data['m2'][b].he_so * data['m2'][b].value.Natri 
													a[10].total_ = a[10].total_ + data['m2'][b].he_so * data['m2'][b].value.Kali 
													a[11].total_ = a[11].total_ + data['m2'][b].he_so * data['m2'][b].value.Zn 
													a[12].total_ = a[12].total_ + data['m2'][b].he_so * data['m2'][b].value.Cholesterol 
													a[13].total_ = a[13].total_ + data['m2'][b].he_so * data['m2'][b].value.Beta_caroten 
												}
											}else if(stt[c] == 'hs'){
												for(let b = 0; b < data['hs'].length; b++){
													a[0].total_ = a[0].total_ + data['hs'][b].he_so * data['hs'][b].value.energy 
													a[1].total_ = a[1].total_ + data['hs'][b].he_so * data['hs'][b].value.Protein 
													a[2].total_ = a[2].total_ + data['hs'][b].he_so * data['hs'][b].value.Lipid 
													a[3].total_ = a[3].total_ + data['hs'][b].he_so * data['hs'][b].value.Glucid 
													a[4].total_ = a[4].total_ + data['hs'][b].he_so * data['hs'][b].value.Vitamin_A 
													a[5].total_ = a[5].total_ + data['hs'][b].he_so * data['hs'][b].value.Celluloza 
													a[6].total_ = a[6].total_ + data['hs'][b].he_so * data['hs'][b].value.Vitamin_C 
													a[7].total_ = a[7].total_ + data['hs'][b].he_so * data['hs'][b].value.Calci 
													a[8].total_ = a[8].total_ + data['hs'][b].he_so * data['hs'][b].value.Fe 
													a[9].total_ = a[9].total_ + data['hs'][b].he_so * data['hs'][b].value.Natri 
													a[10].total_ = a[10].total_ + data['hs'][b].he_so * data['hs'][b].value.Kali 
													a[11].total_ = a[11].total_ + data['hs'][b].he_so * data['hs'][b].value.Zn 
													a[12].total_ = a[12].total_ + data['hs'][b].he_so * data['hs'][b].value.Cholesterol 
													a[13].total_ = a[13].total_ + data['hs'][b].he_so * data['hs'][b].value.Beta_caroten 
												}
											}else if(stt[c] == 'm'){
												for(let b = 0; b < data['m'].length; b++){
													a[0].total_ = a[0].total_ + data['m'][b].he_so * data['m'][b].value.energy 
													a[1].total_ = a[1].total_ + data['m'][b].he_so * data['m'][b].value.Protein 
													a[2].total_ = a[2].total_ + data['m'][b].he_so * data['m'][b].value.Lipid 
													a[3].total_ = a[3].total_ + data['m'][b].he_so * data['m'][b].value.Glucid 
													a[4].total_ = a[4].total_ + data['m'][b].he_so * data['m'][b].value.Vitamin_A 
													a[5].total_ = a[5].total_ + data['m'][b].he_so * data['m'][b].value.Celluloza 
													a[6].total_ = a[6].total_ + data['m'][b].he_so * data['m'][b].value.Vitamin_C 
													a[7].total_ = a[7].total_ + data['m'][b].he_so * data['m'][b].value.Calci 
													a[8].total_ = a[8].total_ + data['m'][b].he_so * data['m'][b].value.Fe 
													a[9].total_ = a[9].total_ + data['m'][b].he_so * data['m'][b].value.Natri 
													a[10].total_ = a[10].total_ + data['m'][b].he_so * data['m'][b].value.Kali 
													a[11].total_ = a[11].total_ + data['m'][b].he_so * data['m'][b].value.Zn 
													a[12].total_ = a[12].total_ + data['m'][b].he_so * data['m'][b].value.Cholesterol 
													a[13].total_ = a[13].total_ + data['m'][b].he_so * data['m'][b].value.Beta_caroten 
												}
											}else if(stt[c] == 'r'){
												let hs = 3/this.state.data['r'].length 
												if(this.state.key_ == 1){
													
													hs = (this.state.item_group[this.state.key_group].array_user.length + 1) * 1.5/(this.state.data['r'].length*10)
												}
												for(let b = 0; b < data['r'].length; b++){
													a[0].total_ = a[0].total_ + hs * data['r'][b].value.energy 
													a[1].total_ = a[1].total_ + hs * data['r'][b].value.Protein 
													a[2].total_ = a[2].total_ + hs * data['r'][b].value.Lipid 
													a[3].total_ = a[3].total_ + hs * data['r'][b].value.Glucid 
													a[4].total_ = a[4].total_ + hs * data['r'][b].value.Vitamin_A 
													a[5].total_ = a[5].total_ + hs * data['r'][b].value.Celluloza 
													a[6].total_ = a[6].total_ + hs * data['r'][b].value.Vitamin_C 
													a[7].total_ = a[7].total_ + hs * data['r'][b].value.Calci 
													a[8].total_ = a[8].total_ + hs * data['r'][b].value.Fe 
													a[9].total_ = a[9].total_ + hs * data['r'][b].value.Natri 
													a[10].total_ = a[10].total_ + hs * data['r'][b].value.Kali 
													a[11].total_ = a[11].total_ + hs * data['r'][b].value.Zn 
													a[12].total_ = a[12].total_ + hs * data['r'][b].value.Cholesterol 
													a[13].total_ = a[13].total_ + hs * data['r'][b].value.Beta_caroten 
												}
											}else{
												if(typeof data[stt[c]].item == 'undefined' || data[stt[c]].key == -1)continue;
												if(this.state.key == 0){
												a[0].total_ = a[0].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.energy 
												}else{
													a[0].total_ = a[0].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.energy 
												}
												a[1].total_ = a[1].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Protein 
												a[2].total_ = a[2].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Lipid 
												a[3].total_ = a[3].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Glucid 
												a[4].total_ = a[4].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Vitamin_A 
												a[5].total_ = a[5].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Celluloza 
												a[6].total_ = a[6].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Vitamin_C 
												a[7].total_ = a[7].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Calci 
												a[8].total_ = a[8].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Fe 
												a[9].total_ = a[9].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Natri 
												a[10].total_ = a[10].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Kali 
												a[11].total_ = a[11].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Zn 
												a[12].total_ = a[12].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Cholesterol 
												a[13].total_ = a[13].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.Beta_caroten
											}
										}
		array_[id].status = !array_[id].status;
		 this.setState({
		  items_: array_,
		  array_: a,
		  showData: dataShow,
		  stt: stt
		})
	}
	  render() {
		  const { process, isShow, data, timkiem, isShowTow } = this.state
		  
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.4
};
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
			<Text maxFontSizeMultiplier={1} style={[styles.buttonText, styles.title,{color:'#000'}]}>
				    Casfood
			</Text>
			<TouchableOpacity   style={styles.button} onPress={this._save}>
					
				  <View>
				<Text maxFontSizeMultiplier={1} style={[styles.buttonText, {color:'#000'}]}>
						Lưu
				</Text>
				</View>
			
				
		
			</TouchableOpacity>
			</View>
			<View style={[{width: width, height: height - 85 - 80}]} >
			<ScrollView>
			<TouchableOpacity style={{position: 'relative', marginTop: 0,width: width, height: 300*(width)/1000,marginLeft:0, backgroundColor:'#FFA800'}}  onPress={this._chose}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/m2.png') }
                    style={{width: width, height: 300*(width)/1000,borderRadius:20}}

                />
				
			</View>	
			</TouchableOpacity>
			
			
			
			<View style={[{width: width,  marginBottom: 10, marginTop: -4, height: 50, backgroundColor: '#ddd', position: 'relative'}]} >
				<Text maxFontSizeMultiplier={1} style={styles.icon}>
				    <Icon style={{top:10, marginTop:10}} name={'ios-help-circle-outline'} size={15} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 16, bottom: 7, left: 40, fontWeight: 'bold'}]}>
				    Bạn đang lên thực đơn cho {(!this.state.type) ? 'bữa sáng' : (this.state.type == 1) ? 'bữa trưa' : 'bữa tối'}
				</Text>
			</View>
			<View style={{backgroundColor: '#fff', paddingBottom: 10, position:'relative', height: 50, flex: 1, justifyContent: 'center', alignItems: 'center',}}>
				{
					this.state.groups.map((val, index) => {
						if(index == this.state.key_){
						return (
							<TouchableOpacity   key={index} onPress={this._showTabGroup.bind(this, index)} style={{height: 50,width:width*.333333333, position: 'absolute', left:(index*width*.333333333)}} >	
							<View style={{width:width*.333333333,height: 50,backgroundColor:'#90D077', height: 30, paddingTop: 10 }} >
								<Text maxFontSizeMultiplier={1} style={{width:width*.333333333,height: 50, textAlign: 'center', fontSize: 13, justifyContent:'center', backgroundColor:'#90D077', color: '#fff'}}>
									{val.tieu_de}
								</Text>
							</View>
							</TouchableOpacity>	
						)
						}else{
							return (
								<TouchableOpacity key={index} onPress={this._showTabGroup.bind(this, index)} style={{height: 50,width:width*.333333333, position: 'absolute', left:(index*width*.333333333)}} >		
								<View style={{width:width*.333333333, height: 30, paddingTop: 10}}>
									<Text maxFontSizeMultiplier={1} style={{width:width*.333333333, height: 50,textAlign: 'center', justifyContent:'center', fontSize: 13}}>
										{val.tieu_de}
									</Text>
								</View>
								</TouchableOpacity>	
							)
						}
					})
				}
			</View>	
			<View style={{backgroundColor: '#ddd', paddingTop: 10, paddingBottom: 5}}>
			{
				this.state.item_group.map((val, index) => {
					
			return (
							<View>
							<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5}]}>
								<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }}  key={index} onPress={this._checkGroup.bind(this, index)}>
								<Text maxFontSizeMultiplier={1} style={[styles.itemListText]}>
									{val.name}
								</Text>
								
									{
										((index == this.state.key_one && this.state.key_ == 0) || (index == this.state.key_group && this.state.key_ == 1)) ?
										<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:4, marginTop:10}} name={'ios-checkmark'} size={32} color='#90D077' />
									</Text>
									: null
									}
								
								</TouchableOpacity>
							</View>
							</View>
							)
			
				})
			}
			
			
			
			
			</View>
			
			
			<View style={{backgroundColor: '#fff', paddingBottom: 10, position:'relative', height: 50, flex: 1, justifyContent: 'center', alignItems: 'center',}}>
				{
					this.state.items.map((val, index) => {
						if(index == this.state.key){
						return (
							<TouchableOpacity   key={index} onPress={this._showTab.bind(this, index)} style={{height: 50,width:width*.333333333, position: 'absolute', left:(index*width*.333333333)}} >	
							<View style={{width:width*.333333333,height: 50,backgroundColor:'#90D077', height: 30, paddingTop: 10 }} >
								<Text maxFontSizeMultiplier={1} style={{width:width*.333333333,height: 50, textAlign: 'center', fontSize: 13, justifyContent:'center', backgroundColor:'#90D077', color: '#fff'}}>
									{val.tieu_de}
								</Text>
							</View>
							</TouchableOpacity>	
						)
						}else{
							return (
								<TouchableOpacity key={index} onPress={this._showTab.bind(this, index)} style={{height: 50,width:width*.333333333, position: 'absolute', left:(index*width*.333333333)}} >		
								<View style={{width:width*.333333333, height: 30, paddingTop: 10}}>
									<Text maxFontSizeMultiplier={1} style={{width:width*.333333333, height: 50,textAlign: 'center', justifyContent:'center', fontSize: 13}}>
										{val.tieu_de}
									</Text>
								</View>
								</TouchableOpacity>	
							)
						}
					})
				}
			</View>	
			{ this.state.isShowP ?
			<View style={{backgroundColor: '#ddd', paddingTop: 10, paddingBottom: 5}}>
				{
					this.state.items[this.state.key].items.map((val, index) => {
						if(val.items.length)
						if(val.math != 12 && val.math != 11 && val.math != 10 && val.math != 2){
							return (
								<View>
							<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5}]}>
								<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }}  key={index} onPress={this._showMathTow.bind(this, index, val)}>
								<Image 
								source={{uri: 'http://casfood.vn/' + val.img,width: 30, height: 30}} style={{position: 'absolute', top: -2, left: 0}}/>
								
								<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 35}]}>
									{
										(typeof val.chose != 'undefined' && val.chose !=  -1) ? val.items[val.chose].title :  val.name
										
										
									}
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
							</View>
							</View>
							)
						}else{
							return (
							<View>
							<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5}]}>
								<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }}  key={index} onPress={this._showMath.bind(this, index)}>
								<Image 
					source={{uri: 'http://casfood.vn/' + val.img,width: 30, height: 30}}  style={{position: 'absolute', top: 3, left: 0}}/>
								<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 35}]}>
									{val.name}
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
							</View>
							</View>
							)
						}
					})
				}
				
						
				
			</View>	
			: null
			}
			<View style={[{width: width,  borderColor: '#fff', borderTopWidth: 5,marginBottom: 10, marginTop: -4, height: 50, backgroundColor: '#ddd', position: 'relative'}]} >
				
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 10}]}>
				    THÀNH PHẦN
				</Text>
			</View>	
			{ this.state.isShowP ?
			<View>
			{
					this.state.stt.map((val, index) => {
						
						if(val == 'm2'){
							if(typeof this.state.data['m2'] != 'undefined' && this.state.data['m2'].length > 0)
								
							return (
								<View>
								{
								this.state.data['m2'].map((val_, index_) => {
									return(
									<View>
									<View style={[styles.itemList, {backgroundColor: '#fff'}]}>
										<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width, borderColor: '#757F8C',borderBottomWidth: 1 }}  key={index_} onPress={this._showValueM.bind(this, index_)}>
		
										<Text maxFontSizeMultiplier={1} style={[styles.itemListText_]}>
										<Text maxFontSizeMultiplier={1} style={{fontWeight: 'bold'}}>{val_.value.title}</Text>
										</Text>
										<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
											<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
										</Text>
										</TouchableOpacity>
									</View>
									{ 
										(val_.show && val_.value.gradient1 != null)
										?
										<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4', position: 'relative'}]} >
												<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
													{val_.value.gradient1 + ': ' + parseInt(val_.value.amount1*this.state.data['m2'][index_].he_so) + 'g'}{(val_.value.quy_doi1 != null) ? ' => ' + parseFloat(val_.value.quy_doi1*this.state.data['m2'][index_].he_so).toFixed(1) + ' ' + val_.value.don_vi1 : ''}
												</Text>
										</View>
										:
										null
									}
									{ 
										(val_.show && val_.value.gradient2 != null)
										?
										<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4', position: 'relative'}]} >
												<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
													{val_.value.gradient2 + ': ' + parseInt(val_.value.amount2*this.state.data['m2'][index_].he_so) + 'g'}{(val_.value.quy_doi2 != null) ? ' => ' + parseFloat(val_.value.quy_doi2*this.state.data['m2'][index_].he_so).toFixed(1) + ' ' + val_.value.don_vi2 : ''}
												</Text>
										</View>
										:
										null
									}
									{ 
										(val_.show && val_.value.gradient3 != null)
										?
										<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4', position: 'relative'}]} >
												<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
													{val_.value.gradient3 + ': ' + parseInt(val_.value.amount3*this.state.data['m2'][index_].he_so) + 'g'}{(val_.value.quy_doi3 != null) ? ' => ' + parseFloat(val_.value.quy_doi3*this.state.data['m2'][index_].he_so).toFixed(1) + ' ' + val_.value.don_vi3 : ''}
												</Text>
										</View>
										:
										null
									}
									{ 
										(val_.show && val_.value.gradient4 != null)
										?
										<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4', position: 'relative'}]} >
												<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
													{val_.value.gradient4 + ': ' + parseInt(val_.value.amount4*this.state.data['m2'][index_].he_so) + 'g'}{(val_.value.quy_doi4 != null) ? ' => ' + parseFloat(val_.value.quy_doi4*this.state.data['m2'][index_].he_so).toFixed(1) + ' ' + val_.value.don_vi4 : ''}
												</Text>
										</View>
										:
										null
									}
									{ 
										(val_.show && val_.value.gradient5 != null)
										?
										<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4', position: 'relative'}]} >
												<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
													{val_.value.gradient5 + ': ' + parseInt(val_.value.amount5*this.state.data['m2'][index_].he_so) + 'g'}{(val_.value.quy_doi5 != null) ? ' => ' + parseFloat(val_.value.quy_doi5*this.state.data['m2'][index_].he_so).toFixed(1) + ' ' + val_.value.don_vi5 : ''}
												</Text>
										</View>
										:
										null
									}
									{ 
										(val_.show && val_.value.nguyenlieuphu != null)
										?
									<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4'}]} >
							<ScrollView style={[{width: width, height: 40}]} horizontal={true}>
							<Text maxFontSizeMultiplier={1} style={[{color: '#757F8C', color: '#757F8C', fontSize: 15,position:'relative', marginLeft: 20, marginTop: 10}]}>
								Nguyên liệu phụ: {val_.value.nguyenlieuphu}
							</Text>
							</ScrollView>
							</View>
									: null
									}
									{ 
										(val_.show && val_.value.lydo != null)
										?
									<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4'}]} >
							<ScrollView style={[{width: width, height: 40}]} horizontal={true}>
							<Text maxFontSizeMultiplier={1} style={[{color: '#757F8C', color: '#757F8C', fontSize: 15,position:'relative', marginLeft: 20, marginTop: 10}]}>
								{val_.value.lydo}
							</Text>
							</ScrollView>
							</View>
									: null
									}

									
									</View>
								)
								})
								}
								</View>
							)
						}else if(val == 'hs'){
							let hs = 1
							if(this.state.data['m'].length == 0) hs = hs*3
							if(typeof this.state.data['hs'] != 'undefined' && this.state.data['hs'].length > 0)
								
							return (
								<View>
								{
								this.state.data['hs'].map((val_, index_) => {
								
									return(
									<View>
									<View style={[styles.itemList, {backgroundColor: '#fff'}]}>
										<View style={{ marginTop: 10, height: 30, position: 'relative', width: width, borderColor: '#757F8C',borderBottomWidth: 1 }}  key={index_} onPress={this._showValueM.bind(this, index_)}>
		
										<Text maxFontSizeMultiplier={1} style={[styles.itemListText_]}>
										<Text maxFontSizeMultiplier={1} style={{fontWeight: 'bold'}}>{val_.value.title}: khối lượng {parseInt(100*this.state.data['hs'][index_].he_so / (100 - val_.value.drop_)*100*hs)}g</Text>
										</Text>
										<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
											<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
										</Text>
										</View>
									</View>
									
									</View>
								)
								})
								}
								</View>
							)
						}else if(val == 'm'){
							let hs = 1
							
							if(typeof this.state.data['m'] != 'undefined' && this.state.data['m'].length > 0)
								
							return (
								<View>
								{
								this.state.data['m'].map((val_, index_) => {
								
									return(
									<View>
									<View style={[styles.itemList, {backgroundColor: '#fff'}]}>
										<View style={{ marginTop: 10, height: 30, position: 'relative', width: width, borderColor: '#757F8C',borderBottomWidth: 1 }}  key={index_} onPress={this._showValueM.bind(this, index_)}>
		
										<Text maxFontSizeMultiplier={1} style={[styles.itemListText_]}>
										<Text maxFontSizeMultiplier={1} style={{fontWeight: 'bold'}}>{val_.value.title}: khối lượng {parseInt(100*this.state.data['m'][index_].he_so / (100 - val_.value.drop_)*100*hs)}g</Text>
										</Text>
										<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
											<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
										</Text>
										</View>
									</View>
									
									</View>
								)
								})
								}
								</View>
							)
						}else if(val == 'r'){
							
							let hs = 3/this.state.data['r'].length 
							if(this.state.key_ == 1){
								hs = (this.state.item_group[this.state.key_group].array_user.length + 1) * 1.5/(this.state.data['r'].length*10)
							}
							if(typeof this.state.data['r'] != 'undefined' && this.state.data['r'].length > 0)
								
							return (
								<View>
								{
								this.state.data['r'].map((val_, index_) => {
								
									return(
									<View>
									<View style={[styles.itemList, {backgroundColor: '#fff'}]}>
										<View style={{ marginTop: 10, height: 30, position: 'relative', width: width, borderColor: '#757F8C',borderBottomWidth: 1 }}  key={index_} onPress={this._showValueM.bind(this, index_)}>
		
										<Text maxFontSizeMultiplier={1} style={[styles.itemListText_]}>
										<Text maxFontSizeMultiplier={1} style={{fontWeight: 'bold'}}>{val_.value.title}: khối lượng {parseInt(100*this.state.data['r'][index_].he_so)}g</Text>
										</Text>
										<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
											<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
										</Text>
										</View>
									</View>
									
									</View>
								)
								})
								}
								</View>
							)
						}else{
							if(this.state.data[val].status){
								let  don_vi = ''
								if(this.state.data[val].don_vi != 0)don_vi = this.state.data[val].don_vi
								if(this.state.data[val].don_vi == null)don_vi = 'gói'
							return (
							<View>
							<View style={[styles.itemList, {backgroundColor: '#fff'}]}>
								
								<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width, borderColor: '#757F8C',borderBottomWidth: 1 }}  key={index} onPress={this._showValue.bind(this, val)}>
								<Text maxFontSizeMultiplier={1} style={[styles.itemListText_]}>
									<Text maxFontSizeMultiplier={1} style={{fontWeight: 'bold'}}>{this.state.data[val].item.title} {(this.state.key == 1 ) ? parseFloat(this.state.data[val].he_so * 60).toFixed(1)+'g' : ''}</Text>
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
							</View>
							{ 
								(this.state.data[val].show && this.state.data[val].item.gradient1 != null)
								?
								<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4', position: 'relative'}]} >
										<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
											{this.state.data[val].item.gradient1 + ': ' + parseInt(this.state.data[val].item.amount1*this.state.data[val].he_so) + 'g'}{(this.state.data[val].item.quy_doi1 != null) ? ' => ' + parseFloat(this.state.data[val].item.quy_doi1*this.state.data[val].he_so).toFixed(1) + ' ' + this.state.data[val].item.don_vi1 : ''}
										</Text>
								</View>
								:
								null
							}
							{ 
								(this.state.data[val].show && this.state.data[val].item.gradient2 != null)
								?
								<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4', position: 'relative'}]} >
										<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
											{this.state.data[val].item.gradient2 + ': ' + parseInt(this.state.data[val].item.amount2*this.state.data[val].he_so) + 'g'}{(this.state.data[val].item.quy_doi2 != null) ? ' => ' + parseFloat(this.state.data[val].item.quy_doi2*this.state.data[val].he_so).toFixed(1) + ' ' + this.state.data[val].item.don_vi2 : ''}
										</Text>
								</View>
								:
								null
							}
							{ 
								(this.state.data[val].show && this.state.data[val].item.gradient3 != null)
								?
								<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4', position: 'relative'}]} >
										<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
											{this.state.data[val].item.gradient3 + ': ' + parseInt(this.state.data[val].item.amount3*this.state.data[val].he_so) + 'g'}{(this.state.data[val].item.quy_doi3 != null) ? ' => ' + parseFloat(this.state.data[val].item.quy_doi3*this.state.data[val].he_so).toFixed(1) + ' ' + this.state.data[val].item.don_vi3 : ''}
										</Text>
								</View>
								:
								null
							}
							{ 
								(this.state.data[val].show && this.state.data[val].item.gradient4 != null)
								?
								<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4', position: 'relative'}]} >
										<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
											{this.state.data[val].item.gradient4 + ': ' + parseInt(this.state.data[val].item.amount4*this.state.data[val].he_so) + 'g'}{(this.state.data[val].item.quy_doi4 != null) ? ' => ' + parseFloat(this.state.data[val].item.quy_doi4*this.state.data[val].he_so).toFixed(1) + ' ' + this.state.data[val].item.don_vi4 : ''}
										</Text>
								</View>
								:
								null
							}
							{ 
								(this.state.data[val].show && this.state.data[val].item.gradient5 != null)
								?
								<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4', position: 'relative'}]} >
										<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
											{this.state.data[val].item.gradient5 + ': ' + parseInt(this.state.data[val].item.amount5*this.state.data[val].he_so) + 'g'}{(this.state.data[val].item.quy_doi5 != null) ? ' => ' + parseFloat(this.state.data[val].item.quy_doi5*this.state.data[val].he_so).toFixed(1) + ' ' + this.state.data[val].item.don_vi5 : ''}
										</Text>
								</View>
								:
								null
							}
							
							{ 
										(this.state.data[val].show && this.state.data[val].item.nguyenlieuphu != null)
										?
									<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4'}]} >
							<ScrollView style={[{width: width, height: 40}]} horizontal={true}>
							<Text maxFontSizeMultiplier={1} style={[{color: '#757F8C', color: '#757F8C', fontSize: 15,position:'relative', marginLeft: 20, marginTop: 10}]}>
								Nguyên liệu phụ: {this.state.data[val].item.nguyenlieuphu}
							</Text>
							</ScrollView>
							</View>
									: null
									}
							</View>
							)
							}
						}
					})
				}
				</View> : null
			}
			{
				(this.state.key == 0) ?
				<View>
			<View style={[{width: width,  marginBottom: 10, marginTop: -4, height: 50, backgroundColor: '#ddd', position: 'relative'}]} >
				
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 10}]}>
				    Khẩu phần ăn từng người
				</Text>
				
			</View>
			{
				this.state.charM.map((val, index) => {
						
				
				return(
				<View style={[{width: width,  marginBottom: 10, marginTop: -4, height: 50, backgroundColor: '#fff', position: 'relative'}]} >
				<Text maxFontSizeMultiplier={1} style={[styles.title, {left: 0, marginLeft: 10, color: '#757F8C', fontSize: 15, width: width,fontWeight: 'bold'}]}>
				    val.name
					</Text>
				<Text maxFontSizeMultiplier={1} style={[{width: 20, height: 20, population: 'absolute', right: 10, backgroundColor: val.color}]}>
				    
				</Text>
				</View>
				)
				})
				}
				
			
			<View style={[{width: width,  marginBottom: 10, marginTop: -4, height: 50, backgroundColor: '#fff', position: 'relative'}]} >
				<Text maxFontSizeMultiplier={1} style={[styles.title, {left: 0, marginLeft: 0, color: '#757F8C', fontSize: 15, width: width, textAlign: 'center', fontWeight: 'bold'}]}>
				    Cơm(Đơn vị: bát)
				</Text>
			</View>
			<View>
			<PieChart
			  data={this.state.charC}
			  width={width}
			  height={220}
			  chartConfig={chartConfig}
			  accessor="population"
			  backgroundColor="transparent"
			  paddingLeft="5"
			  absolute
			/>
		</View>	
			<View style={[{width: width,  marginBottom: 10, marginTop: -4, height: 50, backgroundColor: '#fff', position: 'relative'}]} >
				<Text maxFontSizeMultiplier={1} style={[styles.title, {left: 0, marginLeft: 0, color: '#757F8C', fontSize: 15, width: width, textAlign: 'center', fontWeight: 'bold'}]}>
				    Món mặn(Đơn vị:%)
				</Text>
			</View>
			<View>
			<PieChart
  data={this.state.chartM}
  width={width}
  height={220}
  chartConfig={chartConfig}
  accessor="population"
  backgroundColor="transparent"
  paddingLeft="5"
  absolute
/>
		</View>	
		</View> : null
			}
			<TouchableOpacity onPress={this.changeLayoutOne} style={[{width: width,  marginBottom: 10, marginTop: -4, height: 50, backgroundColor: '#ddd', position: 'relative'}]} >
				
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 10}]}>
				    HƯỚNG DẪN SỬ DỤNG
				</Text>
				<Icon style={{top:0, marginTop:10, right: 20, position:'absolute'}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
			</TouchableOpacity>
			{
				(this.state.expanded) ?
				<View style={{ height: this.state.expanded ? null : 0, overflow: 'hidden', }}>
					<WebView
		style={{ height: this.state.webViewHeight }}
		onMessage={this.onWebViewMessage}
          
          injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'

         source={{html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div style="width: 100% overflow-y: scroll"><h3 style="margin-top: 30px; margin-left: 20px; textAlign: center; color: #90D077;  font-size: 20px; font-weight: bold">'+this.state.item.title+'</h3><div>'+this.state.item.content+'</div></div><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script>$(document).ready(function(){ $("img").attr("height", "auto");$("img").attr("width", "100%");});</script></body></html>'}} />
				
				</View> : null
			}
			<View style={[{width: width,  marginBottom: 10, marginTop: -4, height: 50, backgroundColor: '#ddd', position: 'relative'}]} >
				
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 10}]}>
				    GIÁ TRỊ DINH DƯỠNG
				</Text>
				
			</View>
			<View style={{width:width, marginTop: -10}}>	
				
				{
				this.state.array_.map((val, index) => {
						
				
				return(
				<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4', position: 'relative'}]} >
						<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
							{val.title}: {parseFloat(val.total_).toFixed(0)}{val.don_vi}
						</Text>
				</View>
				)
				})
				}
					
				</View>	
				
			</ScrollView>
				
			</View>
			<View style={[{width: width, height: 80, position: 'absolute', bottom: 0, backgroundColor: '#fff', shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 2,  elevation: 5,}]} >
			<TouchableOpacity style={{position: 'absolute', width: width*.2, height:80, top:0, left:0}}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', marginTop: 10}}>
				    <Icon style={{top:10, marginTop:7}} name={'ios-restaurant'} size={41} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', color: '#90D077', fontSize: 12}}>
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
			<TouchableOpacity   style={{position: 'absolute', width: width*.2, height:80, top:0, left:width*.6}} onPress={this._home}>
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
						this.state.items_.map((val, index) => {
							if(val.title.toUpperCase().includes(this.state.timkiem.toUpperCase()))
							return (
								<View style={{height: 50, position: 'relative', zIndex: 1}}>
								<TouchableOpacity style={{height: 30, marginTop: 10, position: 'relative', zIndex: 1}} key={index} onPress={this.pickClick.bind(this, index)}>
									{ 
										(val.lydo == null)
										?
									<ScrollView style={[{width: width - 10, height: 40}]} horizontal={true}>
									
									<Text maxFontSizeMultiplier={1} style={[styles.itemOption, {marginLeft: 15, width: width - 40, fontSize: 14}]}>
										{val.title} <Text maxFontSizeMultiplier={1} style={{color: '#90D077'}}>{val.nenan}</Text>
									</Text>
									</ScrollView>
									:
									<ScrollView style={[{width: width - 10, height: 40}]} horizontal={true}>
									
									<Text maxFontSizeMultiplier={1} style={[styles.itemOption, {marginLeft: 15, width: width - 40, fontSize: 14}]}>
										{val.title} <Text maxFontSizeMultiplier={1} style={{color: 'red', fontSize: 12}}>{val.lydo}</Text><Text maxFontSizeMultiplier={1} style={{color: '#90D077'}}>{val.nenan}</Text>
									</Text>
									
									</ScrollView>
									}
									{val.status ? 
										<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
											<Icon style={{top:-4, marginTop:10}} name={'ios-checkmark'} size={32} color='#90D077' />
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
				<View style={[styles.wrapOption, {height: height, width: width, top: 0, backgroundColor: '#000', opacity: 0.5,left: 0, zIndex: 2}]}>
					<TouchableOpacity style={{height: height, width: width}} onPress={this._offBreakfast}>
					</TouchableOpacity>
					</View>
					: null
				}
				{
				isShowTow ? 
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
							<TouchableOpacity style={{height: 30, top: 10, right:10, position: 'absolute', zIndex: 10}} onPress={this._offBreakfastTow}>
							<Text>Xong</Text>
							</TouchableOpacity>
						</View>
					</View>
						{
						this.state.items_.map((val, index) => {
							if(val.title.toUpperCase().includes(this.state.timkiem.toUpperCase()))
							return (
								<View style={{height: 50, position: 'relative', zIndex: 1}}>
								<TouchableOpacity style={{height: 30, marginTop: 10, position: 'relative', zIndex: 1}} key={index} onPress={this.pickClickTow.bind(this, index, this.state.keyDataTow)}>
									{ 
										(val.lydo == null)
										?
									<ScrollView style={[{width: width - 10, height: 40}]} horizontal={true}>
									
									<Text maxFontSizeMultiplier={1} style={[styles.itemOption, {marginLeft: 15, width: width - 40, fontSize: 14}]}>
										{val.title} <Text maxFontSizeMultiplier={1} style={{color: '#90D077'}}>{val.nenan}</Text>
									</Text>
									</ScrollView>
									:
									<ScrollView style={[{width: width - 10, height: 40}]} horizontal={true}>
									
									<Text maxFontSizeMultiplier={1} style={[styles.itemOption, {marginLeft: 15, width: width - 40, fontSize: 14}]}>
										{val.title} <Text maxFontSizeMultiplier={1} style={{color: 'red', fontSize: 12}}>{val.lydo}</Text><Text maxFontSizeMultiplier={1} style={{color: '#90D077'}}>{val.nenan}</Text>
									</Text>
									
									</ScrollView>
									}
									{val.status ? 
										<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
											<Icon style={{top:-4, marginTop:10}} name={'ios-checkmark'} size={32} color='#90D077' />
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
				isShowTow ?
				<View style={[styles.wrapOption, {height: height, width: width, top: 0, backgroundColor: '#000', opacity: 0.5,left: 0, zIndex: 2}]}>
					<TouchableOpacity style={{height: height, width: width}} onPress={this._offBreakfastTow}>
					</TouchableOpacity>
					</View>
					: null
				}
		  </View>
		);
	  }
}
const styles_ = {
	test: StyleSheet.create({
		home: {
			shadowColor: '#000',
		}
	})
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
        height: 50, 
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
export default connect(mapStateToProps)(MenuGroupTow)