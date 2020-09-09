
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
  Alert,
  TextInput,
  StatusBar,
  Dimensions,
  Image,
  ActivityIndicator,
  ScrollView,
  Picker
} from 'react-native';
import {
  LineChart,
} from "react-native-chart-kit";
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
class AlertInfoTow extends Component {
    constructor(props) {
        super(props)
        this.state = {
			additional: 0,
			height: 180,
			secure: true,
			process: false,
			type: this.props.type_,
			don_vi: this.props.don_vi_1,
			don_vi_1: this.props.don_vi_1,
			don_vi_2: this.props.don_vi_2,
			heso_1: this.props.heso_1,
			heso_2: this.props.heso_2,
			mota: this.props.mota,
			expanded: false,
			title: this.props.title,
			max: this.props.max,
			min: this.props.min,
			type_: 1,
			items: [],
			items_1: [],
			items_2: [],
			label: [],
			label_1: [],
			content_1: [],
			top_max: 0,
			top_min: 0,
			max_2: 0,
			min_1: 0,
			min_2: 0,
			label_2: [],
			content_2: [],
			content: [],
			cannang: '',

			enegy: 0,
			change : 0,
			phone: this.props.user_login.phone,
        }
		apis.getHeavy(this.state.phone, this.state.type)
                .then(res => {
					let label = []
					let label_1 = []
					let label_2 = []
					let content = []
					let content_1 = []
					let content_2 = []
					
					for(let i = 0; i < res.data.items.length; i++){
						label.push(res.data.items[i].date_);
						content.push(parseFloat(res.data.items[i].content));
						content_2.push(parseFloat((parseFloat(res.data.items[i].content) * parseFloat(this.props.heso_2))))
						content_1.push(parseFloat(res.data.items[i].content));
					
					}
					let min_1 = Math.min.apply(null, content_1); 
					let min_2 = Math.min.apply(null, content_2); 
					let max_1 = Math.max.apply(null, content_1); 
					let max_2 = Math.max.apply(null, content_2);
					let top_max = 180*(this.state.max - min_1)/(max_1 - min_1)
					let top_min = 180*(this.state.min - min_1)/(max_1 - min_1)
					label.reverse()
					content.reverse()
					content_1.reverse()
					content_2.reverse()
					
					if(res.data.items.length > 1){
					this.setState({
						items: res.data.items,
						
	
						label: label,
						label_1: label,
						top_min: top_min,
						top_max: top_max,
						max_1: max_1,
						min_2: min_2,
						min_1: min_1,
						min_2: min_2,

						content: content,
						content_1: content_1,
						content_2: content_2,
						process: true,
					})
					}else{
						this.setState({
						items: res.data.items,
						top_min: top_min,
						top_max: top_max,
						max_1: max_1,
						min_2: min_2,
						min_1: min_1,
						min_2: min_2,	
						label: label,
						label_1: label,
						label_2: label,
						content: content,
						content_1: content_1,
						content_2: content_2,
						process: false,
					})
					}
					
                })
                .catch(err => {
					
					this.setState({ process: false })
					return showMessage({ message: err.data.message, type: "error" })
                })
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
	 _save = () => {
		this.setState({
						
						process: false,
					})
					let cannang = this.state.cannang
					if(this.state.type_ == 2){
						
						cannang = parseFloat(this.state.cannang)/parseFloat(this.state.heso_2)
						
						this.setState({
						
						cannang: cannang,
					})
					}
		apis.saveHeavy(this.state.phone, cannang, this.state.type)
                .then(res => {
					let label = []
					let label_1 = []
					let label_2 = []
					let content = []
					let content_1 = []
					let content_2 = []
					let res_2 = res.data.items
					
					for(let i = 0; i < res.data.items.length; i++){
						label.push(res.data.items[i].date_);
						content.push(parseFloat(res.data.items[i].content));
						content_2.push(parseFloat((parseFloat(res.data.items[i].content) * parseFloat(this.props.heso_2))))
						content_1.push(parseFloat(res.data.items[i].content));
					
					}
					let min_1 = Math.min.apply(null, content_1); 
					let min_2 = Math.min.apply(null, content_2); 
					let max_1 = Math.max.apply(null, content_1); 
					let max_2 = Math.max.apply(null, content_2);
					label.reverse()
					content.reverse()
					content_1.reverse()
					content_2.reverse()
					let top_max = 180*(this.state.max - min_1)/(max_1 - min_1)
					let top_min = 180*(this.state.min - min_1)/(max_1 - min_1)
					
					if(res.data.items.length > 1){
					this.setState({
						items: res.data.items,
						top_max: top_max,
						top_min: top_min,
						label: label,
						max_1: max_1,
						min_2: min_2,
						min_1: min_1,
						min_2: min_2,
						label_1: label,
						label_2: label,
						content: (this.state.type_ == 1) ? content_1 : content_2,
						content_1: content_1,
						content_2: content_2,
						process: true,
					})
					}else{
						this.setState({
						items: res.data.items,
						top_max: top_max,
						top_min: top_min,
						label: label,
						max_1: max_1,
						min_2: min_2,
						min_1: min_1,
						min_2: min_2,
						label_1: label,
						label_2: label,
						content: (this.state.type_ == 1) ? content_1 : content_2,
						content_1: content_1,
						content_2: content_2,
						process: false,
					})
					}
					Alert.alert(
						'Thông báo',
						res.data.message,
					)
					this.setState({
						cannang: ''
					})
                })
                .catch(err => {
					
					Alert.alert(
		  'Thông báo',
		  'Có lỗi sảy ra',
		  )
					
                })
	 }
	 
	 _changeTow= () => {
		this.setState({
			type_: 2,
			process: false
		})
		this.setState({
			label: this.state.label_2,
			content: this.state.content_2,
			don_vi: this.state.don_vi_2,
			
		})
		this.setState({

			process: true
		})
	 }
	 _changeOne= () => {
		this.setState({
			type_: 1,
			process: false
		})
		this.setState({
			label: this.state.label_1,
			content: this.state.content_1,
			don_vi: this.state.don_vi_1,
		})
		this.setState({

			process: true
		})
	 }
	_back = () => {
		Actions.pop()
	 }
	 _showGroup(id){
		 let items = this.state.items
		items[id].status = !items[id].status
		this.setState({
			items: items,
		})
	 }
	 _editChart(id){
		 let items = this.state.items
		 let index = this.state.items[id].id
		  let content = this.state.items[id].content
		
					if(this.state.type_ == 2){
						
						content = parseFloat(content)/parseFloat(this.state.heso_2)
						
						
					}
		
		 apis.editChart(index, content)
                .then(res => {
					let label = []
					let label_1 = []
					let label_2 = []
					let content = []
					let content_1 = []
					let content_2 = []
					let res_2 = res.data.items
					
					for(let i = 0; i < res.data.items.length; i++){
						label.push(res.data.items[i].date_);
						content.push(parseFloat(res.data.items[i].content));
						content_2.push(parseFloat((parseFloat(res.data.items[i].content) * parseFloat(this.props.heso_2))))
						content_1.push(parseFloat(res.data.items[i].content));
					
					}
					let min_1 = Math.min.apply(null, content_1); 
					let min_2 = Math.min.apply(null, content_2); 
					let max_1 = Math.max.apply(null, content_1); 
					let max_2 = Math.max.apply(null, content_2);
					label.reverse()
					content.reverse()
					content_1.reverse()
					content_2.reverse()
					let top_max = 180*(this.state.max - min_1)/(max_1 - min_1)
					let top_min = 180*(this.state.min - min_1)/(max_1 - min_1)
					
					if(res.data.items.length > 1){
					this.setState({
						items: res.data.items,
						top_max: top_max,
						top_min: top_min,
						label: label,
						max_1: max_1,
						min_2: min_2,
						min_1: min_1,
						min_2: min_2,
						label_1: label,
						label_2: label,
						content: (this.state.type_ == 1) ? content_1 : content_2,
						content_1: content_1,
						content_2: content_2,
						process: true,
					})
					}else{
						this.setState({
						items: res.data.items,
						top_max: top_max,
						top_min: top_min,
						label: label,
						max_1: max_1,
						min_2: min_2,
						min_1: min_1,
						min_2: min_2,
						label_1: label,
						label_2: label,
						
						content: (this.state.type_ == 1) ? content_1 : content_2,
						content_1: content_1,
						content_2: content_2,
						process: false,
					})
					}
					Alert.alert(
						'Thông báo',
						'Sửa thành công',
					)
					this.setState({
						cannang: ''
					})
                })
                .catch(err => {
					
					Alert.alert(
		  'Thông báo',
		  'Có lỗi xảy ra',
		  )
					
                })
	 }
	 _deleteFriendGroup(id){
		
		apis.deleteChart(id)
                .then(res => {
					let label = []
					let label_1 = []
					let label_2 = []
					let content = []
					let content_1 = []
					let content_2 = []
					let res_2 = res.data.items
					
					for(let i = 0; i < res.data.items.length; i++){
						label.push(res.data.items[i].date_);
						content.push(parseFloat(res.data.items[i].content));
						content_2.push(parseFloat((parseFloat(res.data.items[i].content) * parseFloat(this.props.heso_2))))
						content_1.push(parseFloat(res.data.items[i].content));
					
					}
					let min_1 = Math.min.apply(null, content_1); 
					let min_2 = Math.min.apply(null, content_2); 
					let max_1 = Math.max.apply(null, content_1); 
					let max_2 = Math.max.apply(null, content_2);
					label.reverse()
					content.reverse()
					content_1.reverse()
					content_2.reverse()
					let top_max = 180*(this.state.max - min_1)/(max_1 - min_1)
					let top_min = 180*(this.state.min - min_1)/(max_1 - min_1)
					
					if(res.data.items.length > 1){
					this.setState({
						items: res.data.items,
						top_max: top_max,
						top_min: top_min,
						label: label,
						max_1: max_1,
						min_2: min_2,
						min_1: min_1,
						min_2: min_2,
						label_1: label,
						label_2: label,
						content: (this.state.type_ == 1) ? content_1 : content_2,
						content_1: content_1,
						content_2: content_2,
						process: true,
					})
					}else{
						this.setState({
						items: res.data.items,
						top_max: top_max,
						top_min: top_min,
						label: label,
						max_1: max_1,
						min_2: min_2,
						min_1: min_1,
						min_2: min_2,
						label_1: label,
						label_2: label,
						content: (this.state.type_ == 1) ? content_1 : content_2,
						content_1: content_1,
						content_2: content_2,
						process: false,
					})
					}
					Alert.alert(
						'Thông báo',
						'Xóa thành công',
					)
					this.setState({
						cannang: ''
					})
                })
                .catch(err => {
					
					Alert.alert(
		  'Thông báo',
		  'Có lỗi xảy ra',
		  )
					
                })
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
	 changeLayoutOne = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded }); 
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
			const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
};

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
				Chỉ số
			</Text>
			
			</View>
			
			
			<ScrollView style={[{width: width, flex:1}]}>
				{
					(this.state.process) ?
			<View>
  <Text maxFontSizeMultiplier={1} style={{width: width, textAlign:'center', fontSize: 20, fontWeight:'bold'}}>Biểu Đồ {this.state.title}({this.state.don_vi})</Text>

  <View style={{position: 'relative', height: 225, width: width}}>
  
  {
	  (this.state.top_max > 0) ?
	  
	  <View style={{position: 'absolute', height: 2, width: width - 63, backgroundColor:'red', bottom: this.state.top_max + 33, zIndex: 1000,right:0,}}>
	  {
			  (this.state.type_ == 1) ?
	  <Text maxFontSizeMultiplier={1}  style={{position: 'absolute',  width: width - 63,  bottom: 0, zIndex: 1000, textAlign:'right', fontSize: 12, right:0, }}>
		Cảnh báo cao({this.state.max})
	  </Text> :
	  <Text maxFontSizeMultiplier={1}  style={{position: 'absolute',  width: width - 63,  bottom: 0, zIndex: 1000, textAlign:'right', fontSize: 12, right:0, }}>
		Cảnh báo cao({(this.state.max* this.state.heso_2)})
	  </Text> 
	  }
	  </View> : null
  }
  {
	  (this.state.top_min > 0) ?
	  
	  <View style={{position: 'absolute', height: 2, width: width - 63, backgroundColor:'#3399ff', bottom: this.state.top_min + 33, zIndex: 1000, right:0,}}>
		  {
			  (this.state.type_ == 1) ?
	  <Text maxFontSizeMultiplier={1}  style={{position: 'absolute',  width: width - 63,  bottom: 0, zIndex: 1000, textAlign:'right', fontSize: 12, right:0, }}>
		Cảnh báo thấp({this.state.min})
	  </Text>
	  :
	  <Text maxFontSizeMultiplier={1}  style={{position: 'absolute',  width: width - 63,  bottom: 0, zIndex: 1000, textAlign:'right', fontSize: 12, right:0, }}>
		Cảnh báo thấp({(this.state.min * this.state.heso_2)})
	  </Text>
		  }
	  </View> : null
  }
  <LineChart
    data={{
      labels: this.state.label,
      datasets: [
        {
          data: this.state.content
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel=""
    yAxisSuffix=""
	 withInnerLines={false}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundGradientFrom: "#ffac47",
      backgroundGradientTo: "#ffac47",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(0, 0, 5, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  </View>
  
				</View> : null }
			
			<View style={{width: width, flexDirection: 'row'}}>
			<TouchableOpacity onPress={this._changeOne} style={{width: width*.5}} >
					  <View style={{width: width*.5}} >
						<Text maxFontSizeMultiplier={1} style={{width: width*.5, textAlign: 'right', fontSize: 16, fontWeight: 'bold'}}>
							{this.state.don_vi_1} 
						</Text>
					  </View>
			</TouchableOpacity>
			<TouchableOpacity onPress={this._changeTow} style={{width: width*.5}} >
					  <View style={{width: width*.5}} >
						<Text maxFontSizeMultiplier={1} style={{width: width*.5, textAlign: 'left', fontSize: 16, fontWeight: 'bold'}}>
							- {this.state.don_vi_2}
						</Text>
					  </View>
			</TouchableOpacity>
			</View>
			<View>
					<View style={{ marginTop: 10, minHeight: 30, position: 'relative', width: width }}>
					
					<ScrollView style={[{width: width - 40}]} horizontal={true}>
					
					
					<TouchableOpacity onPress={this.changeLayoutOne}>
					<Text maxFontSizeMultiplier={1} style={{width: width - 10,marginLeft: 5, fontSize: 16, fontWeight:'bold'}}>
						{this.state.title}({this.state.don_vi})
					</Text>
					</TouchableOpacity>
					
					</ScrollView>
					
					</View>
					<View style={{ height: this.state.expanded ? null : 0, overflow: 'hidden', }}>
						<Text>{this.state.mota}</Text>
					</View>
					<View>
						<View style={[ styles.formGroup, {marginBottom: 20} ]}>
                    <View style={ styles.itemInput  }>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Nhập"
							placeholderTextColor="#757F8C"
							onChangeText={(cannang) => this.setState({ cannang: cannang.replace(',','.')  })}
							value={cannang}
						/>
					</View>
					<TouchableOpacity onPress={this._save} style={{backgroundColor: '#90D077', borderRadius:5,borderWidth: 1, borderColor: '#fff',position: 'absolute', zIndex: 100, width: 50, height:30, top:5, right: 20}} >
					  <View>
						<Text maxFontSizeMultiplier={1} style={{width: 50, height:30, justifyContent: 'center', textAlign: 'center', color: '#fff', fontSize: 15}}>
							Lưu
						</Text>
					  </View>
					</TouchableOpacity>
                </View>
					</View>
					
					
					{
										this.state.items.map((val_, index_) => {
											let content
											if(this.state.type_ == 2){content = (parseFloat(val_.content) * parseFloat(this.state.heso_2))}else{
												content = val_.content
											}
											return (
											<View>
											<Text maxFontSizeMultiplier={1} style={[styles.itemListText,{fontSize: 16}]}>
												{val_.date_}: {content} {this.state.don_vi}
											</Text>
											<TouchableOpacity style={{position:'absolute',top:18,right:15,}} key={index_} onPress={ this._showGroup.bind(this, index_ ) }>
						<Text maxFontSizeMultiplier={1} >
							<Icon style={{top:15, marginTop:25}} name={'md-menu'} size={20} color='#000000' />
						</Text>
						</TouchableOpacity>
						
						{
						(val_.status) ?
						<View style={[{height: 40, backgroundColor: '#fff', position: 'relative', width:width}]}>
						
						<TouchableOpacity style={[ {marginBottom: 0,position: 'absolute', paddingBottom: 10, paddingLeft: 10 , right:10, paddingLeft: 15, paddingRight: 15} ]}  key={index_} onPress={ this._deleteFriendGroup.bind(this, val_.id ) }>
						
							<Text maxFontSizeMultiplier={1} style={{backgroundColor: '90D077',justifyContent: 'center', textAlign: 'center', color: '#000', fontSize: 15, top: 10, left: 10}}>
								Xóa
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[ {marginBottom: 0,position: 'absolute', paddingBottom: 10, paddingLeft: 10 , right:50, paddingLeft: 15, paddingRight: 15, top: 10} ]}  key={index_} onPress={ this._editChart.bind(this, index_ ) }>
							<Text maxFontSizeMultiplier={1} style={{backgroundColor: '90D077', justifyContent: 'center', textAlign: 'center', color: '#000', fontSize: 15}}>
								Sửa
							</Text>
						</TouchableOpacity>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{width: 200}, styles.input ]}
							placeholder="Nhập"
							placeholderTextColor="#757F8C"
							onChangeText={(content) => {
								let items = this.state.items
								items[index_].content = content
								this.setState({ items: items })
								
								}}
							value={content}
						/>
						</View>
						: null
						}
											</View>
												
											)
										})
									}
					
					
					
					
			</View>
			<View style={{paddingTop:300,}}></View>
			</ScrollView>
			

			<View style={[{width: width, height: 80,position: 'absolute', bottom: 0, backgroundColor: '#fff', shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 2,  elevation: 5,}]}>
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
			<TouchableOpacity   style={{position: 'absolute', width: width*.2, height: 80, top:0, left:width*.8}}  onPress={this._friends}>
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
  itemListText: {
		color: '#757F8C',
		fontSize: 14,
		minWidth: width - 10,
		marginLeft: 5,

		marginTop: 20,

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
export default connect(mapStateToProps)(AlertInfoTow)