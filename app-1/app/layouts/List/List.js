
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
class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
			phone: this.props.user_login.phone,
			disease: this.props.user_login.disease,
			process: false,
			isShowP: false,
			isShow: false,
			expanded: false,
			first: 1,
			user: this.props.user_login,
			age: this.props.user_login.age,
			tong: 0,
			gender: this.props.user_login.gender,
			showData: [
				
			],
			check: 0,
			stt: [],
			friends: [],
			type: 0,
			items: [],
			items_: [],
			menus: [],
			data: [],
			heso: 0,
			hesocom: 0,
			person: -1,
			hesoman: 0,
			hesotee: 0,
			key: 0,
			keyData: -1,
			test: 0,
			tee: 0,
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
			apis.getAll(this.state.phone)
                .then(res => {
					if(res.data.status){
						this.setState({tong: res.data.status})
					}

					this.setState({friends: res.data.friends})	
					
                })
                .catch(err => {
					
					this.setState({ process: false })
					return showMessage({ message: err.data.message, type: "error" })
                })
				
            apis.getMenu(this.state.phone)
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
	_lisstFood = () => {
		Actions.listfood()
	}
	_search = () => {
		Actions.search({nguyenlieu: ''})
	}
	_createfoodtow = () => {
		Actions.createfoodtow()
	}
	_createFood = () => {
				Actions.createfood()
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
		apis.saveMenu(send_, this.state.phone, this.state.type)
                .then(res => {
					showMessage({ message: 'Thông báo', description: res.data.message, type: "warning" })
                })
                .catch(err => {
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					return showMessage({ message: 'Lỗi', description:  'Có lỗi trong quá trình kết nối', type: "warning" })
                })
	}
	_menuSport = () => {
		if(this.state.tong){
			Actions.menusport()
		}else{
			Alert.alert(
			'Thông báo',
			'Bạn cần lựa chọn các món ăn yêu thích trong thực đơn tổng',
		  [
			{
			  text: 'Thực đơn tổng',
			  onPress: () => {
				 Actions.stepfour() 
			  }
			},
			
			
		  { cancelable: false }
		  ]
		);
		}
		
	}
	_menuExtra = () => {
		if(this.state.tong){
			Actions.menuextra()
		}else{
			Alert.alert(
			'Thông báo',
			'Bạn cần lựa chọn các món ăn yêu thích trong thực đơn tổng',
		  [
			{
			  text: 'Thực đơn tổng',
			  onPress: () => {
				 Actions.stepfour() 
			  }
			},
			
			
		  { cancelable: false }
		  ]
		);
		}
		
	}
	_menuList = () => {
		Actions.mymenu()
	}
	_menuListGroup = () => {
		
		Actions.mymenugroup()
	}
	_stepfour = () => {
		Actions.stepfour()
	}
	_stepGroup = () => {
		if(this.state.tong && this.state.friends.length > 0){
			Actions.menugroup()
		}else if(this.state.friends.length > 0){
			Alert.alert(
			'Thông báo',
			'Bạn cần lựa chọn các món ăn yêu thích trong thực đơn tổng',
		  [
			{
			  text: 'Thực đơn tổng',
			  onPress: () => {
				 Actions.stepfour() 
			  }
			},
			
			
		  { cancelable: false }
		  ]
		);
		}else{
			Alert.alert(
			'Thông báo',
			'Để lên được thực đơn nhóm bạn cần kết bạn',
		  [
			{
			  text: 'Kết bạn',
			  onPress: () => {
				Actions.facebook()
			  }
			},
			
			
		  { cancelable: false }
		  ]
		);
		}
		
	}
	_facebook = () => {
		
		
		Actions.facebook()
	}
	_alert = () => {
		Actions.alerts()
	}
	_menu = () => {
		if(this.state.tong){
			Actions.menu()
		}else{
			Alert.alert(
			'Thông báo',
			'Bạn cần lựa chọn các món ăn yêu thích trong thực đơn tổng',
		  [
			{
			  text: 'Thực đơn tổng',
			  onPress: () => {
				 Actions.stepfour() 
			  }
			},
			
			
		  { cancelable: false }
		  ]
		);
		}
		
	}	
	_home = () => {
		Actions.home()
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
	
	 _showMath(id) {
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
		  isShow: !this.state.isShow,
		  items_: items, 
		  keyData: id, 
		  first: 0, 
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
	changeLayoutOne = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded }); 
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
		let dataShow = [];
		dataShow['m2'] = [];
		if(array_[id].status){
			for(let i = 0; i < data['m2'].length; i++){
				if(data['m2'][i].key == array_[id].id){
					data['m2'].splice(i, 1);
				}
				
			}
		}else{
			data['m2'].push({id: id, value: array_[id], key: array_[id].id, show: true });
			
			
		}
		let heso = 0;
		let lenth = parseInt(data['m2'].length)*4;
		
		for(let i = 0; i < data['m2'].length; i++){
			
			if(this.state.age <  16){
				if(this.state.age >=  3 && this.state.age <=  8){
					heso = ((this.state.tee*this.state.heso*0.18*0.65*(this.state.hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}else{
					heso = ((this.state.tee*this.state.heso*0.18*0.55*(this.state.hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}
				
			}else{
				
				if(this.state.disease == 3){
					heso = ((this.state.tee*this.state.heso*0.18*0.45*(this.state.hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}
				if(this.state.disease == 2){
					heso = ((this.state.tee*this.state.heso*0.18*0.45*(this.state.hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}
				if(this.state.disease == 1){
					heso = ((this.state.tee*this.state.heso*0.18*0.45*(this.state.hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}	
				if(this.state.disease == null){
					heso = ((this.state.tee*this.state.heso*0.18*0.45*(this.state.hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}
				if(this.state.disease == 0){
					heso = ((this.state.tee*this.state.heso*0.18*0.45*(this.state.hesoman/100))/lenth)/data['m2'][i].value.Protein;
				}
			}
			data['m2'][i].he_so = heso;
			data['m2'].math = 2;
			
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
			}else{
				if(typeof data[stt[c]].item == 'undefined')continue;
				a[0].total_ = a[0].total_ + parseFloat(data[stt[c]].he_so) * data[stt[c]].item.energy 
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
		a[1].percen = Math.floor(((a[1].total_ * 4)/ a[0].total_) * 100);
		a[3].percen = Math.floor(((a[3].total_ * 4)/ a[0].total_) * 100);
		a[2].percen= 100 - a[1].percen - a[3].percen;
		array_[id].status = !array_[id].status;
		 this.setState({
		  items_: array_,
		  array_: a,
		  showData: dataShow,
		  stt: stt
		})
	}
	  render() {
		  const { process, isShow, data } = this.state
		return (
			
		  <View style={styles.container}>
		  <StatusBar backgroundColor="#90D077"/>
			<View style={[styles.box, {width: width, height: 85}]} >
			
			
			<TouchableOpacity   style={styles.back} onPress={this._back}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={styles.buttonText}>
				    <Icon style={{top:10, marginTop:10}} name={'md-arrow-back'} size={20} color='#fff' />
				</Text>
			  </View>
			</TouchableOpacity>
			<Text maxFontSizeMultiplier={1} style={[styles.buttonText, styles.title]}>
				    Casfood
			</Text>
			
			</View>
			<View style={[{width: width, height: height - 85 - 80}]} >
			<ScrollView style={{marginBottom:20,}}>
			<TouchableOpacity style={{position: 'relative', marginTop: 20,width: width - 20, height: 300*(width - 20)/1000,marginLeft:10,borderRadius:10}} onPress={this._menu}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/m1.png') }
                    style={{width: width - 20, height: 300*(width - 20)/1000,borderRadius:20}}

                />
				
			</View>	
			</TouchableOpacity>
			<TouchableOpacity style={{position: 'relative', marginTop: 20,width: width - 20, height: 300*(width - 20)/1000,marginLeft:10,borderRadius:10}} onPress={this._stepGroup}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/m2.png') }
                    style={{width: width - 20, height: 300*(width - 20)/1000,borderRadius:20}}

                />
				
			</View>	
			</TouchableOpacity>
			{
				(this.state.user.current_sport != null && this.state.user.current_sport != 'null' && this.state.user.current_sport != '[]') ?
			
			<TouchableOpacity style={{position: 'relative', marginTop: 20, width: width - 20, height: 300*(width - 20)/1000,marginLeft:10,borderRadius:10}} onPress={this._menuSport}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/m3.png') }
                    style={{width: width - 20, height: 300*(width - 20)/1000,borderRadius:20}}

                />
				
			</View>	
			</TouchableOpacity>
				: <View>
				{
				(this.state.user.disease == 2 || this.state.user.disease == 3 || this.state.user.weight > this.state.user.cannang || this.state.user.weight < this.state.user.cannang) ?
					
					<TouchableOpacity style={{position: 'relative', marginTop: 20,width: width - 20, height: 300*(width - 20)/1000,marginLeft:10,borderRadius:10}} onPress={this._menuExtra}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/m4.png') }
                    style={{width: width - 20, height: 300*(width - 20)/1000,borderRadius:20}}

                />
				
			</View>	
			</TouchableOpacity>
						: null
				}
				</View>
			}
			
			
			<TouchableOpacity style={{position: 'relative', marginTop: 20,width: width - 20, height: 300*(width - 20)/1000,marginLeft:10,borderRadius:10}} onPress={this._stepfour}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/m5.png') }
                    style={{width: width - 20, height: 300*(width - 20)/1000,borderRadius:20}}

                />
				</View>
			</TouchableOpacity>
			
			<TouchableOpacity style={{position: 'relative', marginTop: 20,width: width - 20, height: 300*(width - 20)/1000,marginLeft:10,borderRadius:10}} onPress={this._search}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/tracuu.jpg') }
                    style={{width: width - 20, height: 300*(width - 20)/1000,borderRadius:20}}

                />
				</View>
			</TouchableOpacity>
			<TouchableOpacity style={{position: 'relative', marginTop: 20,width: width - 20, height: 300*(width - 20)/1000,marginLeft:10,borderRadius:10}} onPress={this._menuList}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/m6.jpg') }
                    style={{width: width - 20, height: 300*(width - 20)/1000,borderRadius:20}}

                />
				</View>
			</TouchableOpacity>
			<TouchableOpacity style={{position: 'relative', marginTop: 20,width: width - 20, height: 300*(width - 20)/1000,marginLeft:10,borderRadius:10}} onPress={this._menuListGroup}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/m8.jpg') }
                    style={{width: width - 20, height: 300*(width - 20)/1000,borderRadius:20}}

                />
				</View>
			</TouchableOpacity>
			<TouchableOpacity style={{position: 'relative', marginTop: 20,width: width - 20, height: 300*(width - 20)/1000,marginLeft:10,borderRadius:10}} onPress={this._createFood}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/m7.jpg') }
                    style={{width: width - 20, height: 300*(width - 20)/1000,borderRadius:20}}

                />
				</View>
			</TouchableOpacity>
			
			<TouchableOpacity style={{position: 'relative', marginTop: 20,width: width - 20, height: 300*(width - 20)/1000,marginLeft:10,borderRadius:10}} onPress={this._createfoodtow}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/nguyenlieu.jpg') }
                    style={{width: width - 20, height: 300*(width - 20)/1000,borderRadius:20}}

                />
				</View>
			</TouchableOpacity>
			<TouchableOpacity style={{position: 'relative', marginTop: 20,width: width - 20, height: 300*(width - 20)/1000,marginLeft:10,borderRadius:10}} onPress={this._lisstFood}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={ require('./imgs/menu.jpg') }
                    style={{width: width - 20, height: 300*(width - 20)/1000,borderRadius:20}}

                />
				</View>
			</TouchableOpacity>
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
						{
						this.state.items_.map((val, index) => {
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
				<View style={[styles.wrapOption, {height: height, width: width, top: 0, backgroundColor: '#000', opacity: 0.5,left: 0, zIndex: 2}]}>
					<TouchableOpacity style={{height: height, width: width}} onPress={this._offBreakfast}>
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
export default connect(mapStateToProps)(List)