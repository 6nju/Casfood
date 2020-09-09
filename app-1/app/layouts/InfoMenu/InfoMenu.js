
import React, { Component } from 'react'
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
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
	user_login: state.user_login
})
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
class InfoMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
			phone: this.props.user_login.phone,
			id: this.props.id,
			stt: [],
			data: [],
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
				{title: 'Beta caroten', total_: 0, don_vi: 'mcg', percen: ''},,
			],
        }
		
        apis.getInfoMenu(this.state.id)
                .then(res => {
					
					
					this.setState({ process: false, stt: res.data.stt, data: res.data.data, array_: res.data.array_})

					
					
					let data = res.data.data
		
			
			this.setState({
				data:data
			})
		
		let stt = res.data.stt
		this.setState({stt: []})
		this.setState({stt: stt})
		
		
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
												let count_value = 1
											if(typeof data[stt[c]].value_ != 'undefined')count_value = data[stt[c]].value_
												a[0].total_ = a[0].total_ + parseFloat(data[stt[c]].he_so) * count_value * data[stt[c]].item.energy 
												a[1].total_ = a[1].total_ + parseFloat(data[stt[c]].he_so) * count_value * data[stt[c]].item.Protein 
												a[2].total_ = a[2].total_ + parseFloat(data[stt[c]].he_so) * count_value * data[stt[c]].item.Lipid 
												a[3].total_ = a[3].total_ + parseFloat(data[stt[c]].he_so) * count_value * data[stt[c]].item.Glucid 
												a[4].total_ = a[4].total_ + parseFloat(data[stt[c]].he_so) * count_value * data[stt[c]].item.Vitamin_A 
												a[5].total_ = a[5].total_ + parseFloat(data[stt[c]].he_so) * count_value * data[stt[c]].item.Celluloza 
												a[6].total_ = a[6].total_ + parseFloat(data[stt[c]].he_so) * count_value * data[stt[c]].item.Vitamin_C 
												a[7].total_ = a[7].total_ + parseFloat(data[stt[c]].he_so) * count_value * data[stt[c]].item.Calci 
												a[8].total_ = a[8].total_ + parseFloat(data[stt[c]].he_so) * count_value * data[stt[c]].item.Fe 
												a[9].total_ = a[9].total_ + parseFloat(data[stt[c]].he_so) * count_value * data[stt[c]].item.Natri 
												a[10].total_ = a[10].total_ + parseFloat(data[stt[c]].he_so) * count_value * data[stt[c]].item.Kali 
												a[11].total_ = a[11].total_ + parseFloat(data[stt[c]].he_so) * count_value * data[stt[c]].item.Zn 
												a[12].total_ = a[12].total_ + parseFloat(data[stt[c]].he_so) * count_value * data[stt[c]].item.Cholesterol 
												a[13].total_ = a[13].total_ + parseFloat(data[stt[c]].he_so) * count_value * data[stt[c]].item.Beta_caroten
											}
										}
										a[1].percen = Math.floor(((a[1].total_ * 4)/ a[0].total_) * 100);
		a[3].percen = Math.floor(((a[3].total_ * 4)/ a[0].total_) * 100);
		a[2].percen= 100 - a[1].percen - a[3].percen;
										
										
										this.setState({data: data, stt: stt, array_: a})
                })
                .catch(err => {
					
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Lỗi', description: err.data.message, type: "warning" })
					
					return showMessage({ message: 'Lỗi', description:  'Có lỗi trong quá trình đăng ký', type: "warning" })
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
	  render() {
		  const { process } = this.state
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
			
			</View>
			<View style={[{width: width, height: height - 85}]} >
			<ScrollView>
				<View style={[{width: width,  marginBottom: 10, marginTop: -4, height: 50, backgroundColor: '#ddd', position: 'relative'}]} >
				
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40}]}>
				    THÀNH PHẦN
				</Text>
			</View>	
			
			<View>
			{
					this.state.stt.map((val, index) => {
						let value__ = 1
							if(typeof this.state.data[val].value_ != 'undefined')value__ = this.state.data[val].value_
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
										(!val_.show && val_.value.gradient1 != null)
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
										(!val_.show && val_.value.gradient2 != null)
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
										(!val_.show && val_.value.gradient3 != null)
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
										(!val_.show && val_.value.gradient4 != null)
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
										(!val_.show && val_.value.gradient5 != null)
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
										(!val_.show && val_.value.nguyenlieuphu != null)
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
										(!val_.show && val_.value.lydo != null)
										?
									<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4'}]} >
							<ScrollView style={[{width: width, height: 40}]} horizontal={true}>
							<Text maxFontSizeMultiplier={1} style={[{color: 'red', fontSize: 15,position:'relative', marginLeft: 20, marginTop: 10}]}>
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
						}
						else if(val == 'hs'){
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
										<Text maxFontSizeMultiplier={1} style={{fontWeight: 'bold'}}>{val_.value.title}: khối lượng {parseInt(parseInt(100*this.state.data['r'][index_].he_so))}g</Text>
										</Text>
										<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
											{value__}
										</Text>
										</View>
									</View>
									
									</View>
								)
								})
								}
								</View>
							)
						}
						else{
							if(this.state.data[val].status){
								let  don_vi = ''
								if(this.state.data[val].don_vi != 0)don_vi = this.state.data[val].don_vi
								if(this.state.data[val].value_ == null || this.state.data[val].value_ == '')this.state.data[val].value_ = 1
								if(this.state.data[val].don_vi == null)don_vi = 'gói'
							return (
							<View>
							<View style={[styles.itemList, {backgroundColor: '#fff'}]}>
								
								<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width, borderColor: '#757F8C',borderBottomWidth: 1 }}  key={index} onPress={this._showValue.bind(this, val)}>
								<Text maxFontSizeMultiplier={1} style={[styles.itemListText_]}>
									<Text maxFontSizeMultiplier={1} style={{fontWeight: 'bold'}}>{this.state.data[val].item.title}</Text>
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									{this.state.data[val].value_}
								</Text>
								</TouchableOpacity>
							</View>
							{ 
								(this.state.data[val].show && this.state.data[val].item.gradient1 != null)
								?
								<View style={[{width: width,  height: 50, backgroundColor: '#E7F0E4', position: 'relative'}]} >
										<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
											{this.state.data[val].item.gradient1 + ': ' + parseFloat(this.state.data[val].item.amount1*this.state.data[val].he_so)*parseFloat(this.state.data[val].value_) + 'g'}{(this.state.data[val].item.quy_doi1 != null) ? ' => ' + parseFloat(this.state.data[val].item.quy_doi1*this.state.data[val].he_so*parseFloat(this.state.data[val].value_)).toFixed(1) + ' ' + this.state.data[val].item.don_vi1 : ''}
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
											{this.state.data[val].item.gradient2 + ': ' + parseFloat(this.state.data[val].item.amount2*this.state.data[val].he_so)*parseFloat(this.state.data[val].value_) + 'g'}{(this.state.data[val].item.quy_doi2 != null) ? ' => ' + parseFloat(this.state.data[val].item.quy_doi2*this.state.data[val].he_so*parseFloat(this.state.data[val].value_)).toFixed(1) + ' ' + this.state.data[val].item.don_vi2 : ''}
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
											{this.state.data[val].item.gradient3 + ': ' + parseFloat(this.state.data[val].item.amount3*this.state.data[val].he_so)*parseFloat(this.state.data[val].value_) + 'g'}{(this.state.data[val].item.quy_doi3 != null) ? ' => ' + parseFloat(this.state.data[val].item.quy_doi3*this.state.data[val].he_so*parseFloat(this.state.data[val].value_)).toFixed(1) + ' ' + this.state.data[val].item.don_vi3 : ''}
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
											{this.state.data[val].item.gradient4 + ': ' + parseFloat(this.state.data[val].item.amount4*this.state.data[val].he_so)*parseFloat(this.state.data[val].value_) + 'g'}{(this.state.data[val].item.quy_doi4 != null) ? ' => ' + parseFloat(this.state.data[val].item.quy_doi4*this.state.data[val].he_so*parseFloat(this.state.data[val].value_)).toFixed(1) + ' ' + this.state.data[val].item.don_vi4 : ''}
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
											{this.state.data[val].item.gradient5 + ': ' + parseFloat(this.state.data[val].item.amount5*this.state.data[val].he_so)*parseFloat(this.state.data[val].value_) + 'g'}{(this.state.data[val].item.quy_doi5 != null) ? ' => ' + parseFloat(this.state.data[val].item.quy_doi5*this.state.data[val].he_so*parseFloat(this.state.data[val].value_)).toFixed(1) + ' ' + this.state.data[val].item.don_vi5 : ''}
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
				</View>
			
			<View style={[{width: width,  marginBottom: 10, marginTop: -4, height: 50, backgroundColor: '#ddd', position: 'relative'}]} >
				
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 40}]}>
				    GIÁ TRỊ DINH DƯỠNG
				</Text>
			</View>
			<View style={{width:width, marginTop: -10}}>	
				
				{
				this.state.array_.map((val, index) => {
						
				if(val != null)
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
export default connect(mapStateToProps)(InfoMenu)