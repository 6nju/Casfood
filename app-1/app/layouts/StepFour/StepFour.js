
import React, { Component } from 'react'
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  Alert,
  ScrollView,
  Modal,
  Picker
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const height = Dimensions.get('window').height
import {Actions} from 'react-native-router-flux';
const width = Dimensions.get('window').width
import { showMessage } from 'react-native-flash-message';
import { colors, apis } from '../../configs'
import { ActionCreators } from '../../redux/ActionCreators'
import { connect } from 'react-redux'
const mapStateToProps = (state) => ({
	user_login: state.user_login,
	step_four: state.step_four,
})
var thisObj;
var deviceHeight = Dimensions.get("window").height;


const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
 
class StepFour extends Component {
    constructor(props) {
        super(props)
        this.state = {
			phone: this.props.phone,
			password: this.props.password,
			breakfastData: (this.props.step_four != null) ? this.props.step_four.breakfast : [],
			user_login: this.props.user_login,
			step_four: this.props.step_four,
			lunchData: (this.props.step_four != null) ? this.props.step_four.lunch : [],
			dinnerData: (this.props.step_four != null) ? this.props.step_four.lunch : [],
			extraData: (this.props.step_four != null) ? this.props.step_four.extra : [],
			pageY: [],
			items: [],
			itemsChose: [],
			modalVisible: false,
			progess: false,
			timkiem: '',
			isShow: false,
			t: height,
			keyExtra: 0,
			keyBreakfast: 0,
			keyLunch: 0,
			keyDinner: 0,
			l: 10,
			type: 0,
        }
		if(this.state.user_login){
			
			
		}else{
			
			let data = {
			breakfast : [],
			lunch : [],
			dinner : [],
			extra : [],
		}

		let send_data = JSON.stringify(data)
		
		let phone_ = this.state.phone
		
		
		
            apis.saveItem(send_data, phone_)
                .then(res => {
					
					Actions.frontpage({phone: this.state.phone, password: this.state.password, login: 1})
					
                })
                .catch(err => {
					this.setState({ process: false })

					Alert.alert('Thông báo',  'Có Lỗi xảy ra' )
                    
                })
        
		}
		
		
    }
	_offBreakfast = () => {
		this.setState({
		  timkiem: '',
		})
		if(this.state.type == 1){
		let data = this.state.breakfastData
		this.setState({
			data: [],
		})
		let items = this.state.items
		let key = this.state.keyBreakfast
		
		data[key].items = items;

		this.setState({
		  isShow: !this.state.isShow,
		  breakfastData: data,
		})
		}
		if(this.state.type == 2){
		let data = this.state.lunchData
		this.setState({
		  lunchData: [],
		})
		let items = this.state.items
		let key = this.state.keyLunch
		
		data[key].items = items;

		this.setState({
		  isShow: !this.state.isShow,
		  lunchData: data,
		})
		}
		if(this.state.type == 3){
		let data = this.state.dinnerData
		this.setState({
		  dinnerData: [],
		})
		let items = this.state.items
		let key = this.state.keyDinner
		
		data[key].items = items;

		this.setState({
		  isShow: !this.state.isShow,
		  dinnerData: data,
		})
		}
		this.setState({
		  t: height,

		})
	 }
	 
	_next = () => {

		
		let b = this.state.breakfastData
		let send_ = []
		send_.breakfast = []
		send_.lunch = []
		send_.extra = []
		for(let i = 0; i < this.state.breakfastData.length; i++){
			let items = b[i].items;
			
			for(let a = 0; a < items.length; a++){
			
				if(items[a].status){
					
					send_.breakfast.push(items[a].id);
				}	
			}
		}
		
		let l = this.state.lunchData
		for(let i = 0; i < this.state.lunchData.length; i++){
			let items = l[i].items;
			for(let a = 0; a < items.length; a++){
			
				if(items[a].status){
					send_.lunch.push(items[a].id);
				}	
			}
		}
		let e = this.state.extraData
		for(let e_ = 0; e_ < this.state.extraData.length; e_++){
			let items = e[e_].items;
			for(let a = 0; a < items.length; a++){
			
				if(items[a].status){
					send_.extra.push(items[a].id);
				}	
			}
		}
		
		let data = {
			breakfast : send_.breakfast,
			lunch : send_.lunch,
			dinner : send_.lunch,
			extra : send_.extra,
		}

		let send_data = JSON.stringify(data)
		
		let phone_ = this.state.phone
		if(this.state.user_login){
			
		  phone_ = this.state.user_login.phone
		  
		
		}
		
		this.setState({ process: true }, () => {
            apis.saveItem(send_data, phone_)
                .then(res => {
					Alert.alert('Thông báo',  'Bạn đã lưu xong thực đơn tổng' )
					
					if(!this.state.user_login){
						Actions.frontpage({phone: this.state.phone, password: this.state.password, login: 1})
					
					}
                })
                .catch(err => {
					this.setState({ process: false })

					Alert.alert('Thông báo',  'Có Lỗi xảy ra' )
                    
                })
        })
	 }

	_showExtra(id) {
		let items = this.state.extraData[id].items
		let pageY = this.state.pageY
		let y
		this.setState({
		  isShow: !this.state.isShow,
		  keyExtra: id, 
		  items: items, 
		  l: 10,
		  type: 2,
		})
		LayoutAnimation.configureNext(
		  LayoutAnimation.create(
			300,
			LayoutAnimation.Types.easeInEaseOut,
			LayoutAnimation.Properties.scaleXY,
		  ),
		);
		this.setState({t: height*.5, l: 0})
	}
	_showLunch(id) {
		let items = this.state.lunchData[id].items
		let pageY = this.state.pageY
		let y
		this.setState({
		  isShow: !this.state.isShow,
		  keyLunch: id, 
		  items: items, 
		  l: 10,
		  type: 2,
		})
		LayoutAnimation.configureNext(
		  LayoutAnimation.create(
			300,
			LayoutAnimation.Types.easeInEaseOut,
			LayoutAnimation.Properties.scaleXY,
		  ),
		);
		this.setState({t: height*.5, l: 0})
	}
	_deleteLunch(id, index) {
		let array_ = this.state.lunchData
		array_[index].items[id].status = !array_[index].items[id].status
		this.setState({
		  lunchData: array_
		})
	}
	_deleteExtra(id, index) {
		let array_ = this.state.extraData
		array_[index].items[id].status = !array_[index].items[id].status
		this.setState({
		  extraData: array_
		})
	}
	_showDinner(id) {
		let items = this.state.dinnerData[id].items
		let pageY = this.state.pageY
		let y
		
		this.setState({
		  isShow: !this.state.isShow,
		  keyDinner: id, 
		  items: items, 
		  l: 10,
		  type:3,
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
	_deleteDinner(id, index) {
		let array_ = this.state.dinnerData
		array_[index].items[id].status = !array_[index].items[id].status
		this.setState({
		  dinnerData: array_
		})
	}
	_showBreakfast(id) {
		let items = this.state.breakfastData[id].items
		let pageY = this.state.pageY
		let y
		
		this.setState({
		  isShow: !this.state.isShow,
		  keyBreakfast: id, 
		  items: items, 
		  l: 10,
		  type:1,
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
	_back = () => {
		Actions.list()
	 }
	 changeExpandedB = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandedB: !this.state.expandedB }); 
  }
  changeExpandedL = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandedL: !this.state.expandedL }); 
  }
  changeExpandedK = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandedK: !this.state.expandedK }); 
  }
    _deleteBreakfast(id, index) {
		let array_ = this.state.breakfastData
		array_[index].items[id].status = !array_[index].items[id].status
		this.setState({
		  breakfastData: array_
		})
	}
    pickClick(id) {
		let array_ = this.state.items
		array_[id].status = !array_[id].status;
		 this.setState({
		  items: array_
		})
	 }
	 _stepGroup = () => {
		Actions.menugroup()
	}
    render() {
		const { isShow, items, data, timkiem, progess } = this.state
		if (progess) return (
            <View style={[styles.mainLoader, styles.loader]}>
                <ActivityIndicator size="large" color="#90D077" />
            </View>
        );
		else
        return (
		
			
			
			<View style={[{width: width, height: height}]} >
			<View style={[styles.box, {width: width, height: 85}]} >
				<StatusBar backgroundColor="#fff" barStyle="dark-content" />
			
				<TouchableOpacity   style={styles.back} onPress={this._back}>
				  <View>
					<Text maxFontSizeMultiplier={1} style={styles.buttonText}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-back'} size={20} color='#000' />
					</Text>
					
				  </View>
				</TouchableOpacity>
				<Text maxFontSizeMultiplier={1} style={[styles.buttonText, styles.title, {color: '#000'}]}>
				    Thực Đơn Tổng
				</Text>
				<TouchableOpacity   style={styles.button} onPress={this._next}>
					{ this.state.user_login ?
				  <View>
				<Text maxFontSizeMultiplier={1} style={[styles.buttonText, {color:'#000'}]}>
						Lưu
				</Text>
				</View>
				:
				<View>
				<Text maxFontSizeMultiplier={1} style={[styles.buttonText]}>
					Tiếp
				</Text>
				</View>
					}
				</TouchableOpacity>
				</View>
            <ScrollView style={[styles.container, {paddingBottom: 80}]}>
				
				
					<TouchableOpacity onPress={this.changeExpandedB} style={{position: 'relative', marginTop: 20,width: width, height: 300*(width)/1000,marginLeft:0, backgroundColor:'#000'}}>
					<View  style={{position: 'relative'}}>
					<Image
						source={ require('./imgs/ms.png') }
						style={{width: width, height: 300*(width)/1000,borderRadius:20}}

					/>
					
				</View>	
				</TouchableOpacity>
				<View  style={{ height: this.state.expandedB ? null : 0, overflow: 'hidden', }}>
				{
					this.state.breakfastData.map((item, index_) => {
						
						return (
				<View>
				<View style={[styles.itemList]} 
				onLayout={event => {
					const layout = event.nativeEvent.layout;
					let array_ = this.state.pageY
					if(typeof array_[index_] != 'undefined') {
						
						array_[index_] = layout.y
					}else 
					array_ = array_.concat(layout.y)
					
					this.setState({
					  pageY: array_
					})
                }}
				>
				
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }}  key={index_} onPress={this._showBreakfast.bind(this, index_)}>
					
					<ScrollView style={[{width: width - 40, height: 40}]} horizontal={true}>
					<Image 
					source={{uri: 'http://casfood.vn/' + item.img,width: 30, height: 30}}  style={{position: 'absolute', top: -3, left: 0}}/>
					
					<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 35}]}>
						
						{item.name}
					</Text>
					</ScrollView>
					<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
					</Text>
					</TouchableOpacity>
					
					
					
				</View>
				
				{
				item.items.map((val, index) => {
						
				if(val.status)
				return(
				<View style={[{width: width,  height: 40, backgroundColor: '#E7F0E4', position: 'relative'}]} >
				
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
				    {val.title}
				</Text>
				<TouchableOpacity style={[styles.button, {marginTop: 22}]} key={index} onPress={this._deleteBreakfast.bind(this, index, index_)}>
				  <View>
					<Text maxFontSizeMultiplier={1} style={[styles.buttonText, {top: 10}]}>
						
						<Icon style={{top:10, marginTop:10}} name={'ios-remove-circle'} size={20} color='#757F8C' />
					</Text>
					</View>
				</TouchableOpacity>
				</View>
				)
				})
				}
				</View>
				)
				})
				}	
				
				</View>
				
				
				
				<TouchableOpacity onPress={this.changeExpandedL} style={{position: 'relative', marginTop: 20,width: width, height: 300*(width)/1000,marginLeft:0, backgroundColor:'#000'}}>
					<View  style={{position: 'relative'}}>
					<Image
						source={ require('./imgs/mt.png') }
						style={{width: width, height: 300*(width)/1000,borderRadius:20}}

					/>
					
				</View>	
				</TouchableOpacity>
				
				<View  style={{ height: this.state.expandedL ? null : 0, overflow: 'hidden', }}>
				{
					this.state.lunchData.map((item, index_) => {
						return (
						<View>
						<View style={[styles.itemList]} 
						onLayout={event => {
							const layout = event.nativeEvent.layout;
							let array_ = this.state.pageY.concat(layout.y)

							this.setState({
							  pageY: array_
							})
					}}
				>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }}  key={index_} onPress={this._showLunch.bind(this, index_)}>
					<ScrollView style={[{width: width - 60, height: 40}]}  horizontal={true}
                                         showsHorizontalScrollIndicator={false}>
					
				
					<Image 
					source={{uri: 'http://casfood.vn/' + item.img,width: 30, height: 30}}  style={{position: 'absolute', top: -3, left: 0}}/>
					
					<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 35}]}>
						
						{item.name}
					</Text>
					</ScrollView>
					
					<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
					</Text>
					</TouchableOpacity>
					
					
					
				</View>
				{
				item.items.map((val, index) => {
						
				if(val.status)
				return(
				<View style={[{height: 40, backgroundColor: '#E7F0E4', position: 'relative', paddingLeft: 15, paddingRight: 15}]} >
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
				    {val.title}
				</Text>
				<TouchableOpacity style={[styles.button, {marginTop: 22}]} key={index} onPress={this._deleteLunch.bind(this, index, index_)}>
					<View>
						<Text maxFontSizeMultiplier={1} style={[styles.buttonText]}>
							<Icon style={{top:10, marginTop:10}} name={'ios-remove-circle'} size={20} color='#757F8C' />
						</Text>
					</View>
				</TouchableOpacity>
				</View>
				)
				})
				}
				</View>
				)
				})
				}	
				</View>
				<TouchableOpacity onPress={this.changeExpandedK} style={{position: 'relative', marginTop: 20,width: width, height: 300*(width)/1000,marginLeft:0, backgroundColor:'#000'}}>
					<View  style={{position: 'relative'}}>
					<Image
						source={ require('./imgs/mk.png') }
						style={{width: width, height: 300*(width)/1000,borderRadius:20}}

					/>
					
				</View>	
				</TouchableOpacity>
				<View  style={{ height: this.state.expandedK ? null : 0, overflow: 'hidden',marginBottom: 200 }}>
				
				{
					this.state.extraData.map((item, index_) => {
						return (
						<View>
						<View style={[styles.itemList]} 
						onLayout={event => {
							const layout = event.nativeEvent.layout;
							let array_ = this.state.pageY.concat(layout.y)

							this.setState({
							  pageY: array_
							})
					}}
				>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }}  key={index_} onPress={this._showExtra.bind(this, index_)}>
					<ScrollView style={[{width: width - 60, height: 40}]} horizontal={true}>
					
				
					<Image 
					source={{uri: 'http://casfood.vn/' + item.img,width: 30, height: 30}}  style={{position: 'absolute', top: -3, left: 0}}/>
					
					<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 35}]}>
						{item.name}
					</Text>
					</ScrollView>
					
					<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10}]}>
						<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
					</Text>
					</TouchableOpacity>
					
					
					
				</View>
				{
				item.items.map((val, index) => {
						
				if(val.status)
				return(
				<View style={[{height: 40, backgroundColor: '#E7F0E4', position: 'relative', paddingLeft: 15, paddingRight: 15}]} >
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
				    {val.title}
				</Text>
				<TouchableOpacity style={[styles.button, {marginTop: 22}]} key={index} onPress={this._deleteExtra.bind(this, index, index_)}>
					<View>
						<Text maxFontSizeMultiplier={1} style={[styles.buttonText]}>
							<Icon style={{top:10, marginTop:10}} name={'ios-remove-circle'} size={20} color='#757F8C' />
						</Text>
					</View>
				</TouchableOpacity>
				</View>
				)
				})
				}
				</View>
				)
				})
				}	
				
				
				</View>
				
				
			</ScrollView>
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
						this.state.items.map((val, index) => {
							if(val.title.toUpperCase().includes(this.state.timkiem.toUpperCase()))
							return (
								<View style={{height: 40, position: 'relative', zIndex: 1}}>
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
				<View style={[styles.wrapOption, {height: height, width: width, top: 0,  backgroundColor: '#000', opacity: 0.5,left: 0, zIndex: 2}]}>
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
	itemList: {
		zIndex: 0,
		position: 'relative',
		width: width,
		borderColor: '#757F8C',
		borderBottomWidth: 1,
		height:40,
		flexDirection: 'row',
	},
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
	container_: {
    flex: 1,
    justifyContent: 'center',
	alignItems: 'center'
  },
  container: {
	zIndex:0,
	height: 100,
    position: 'relative',
  },
  horizontal: {
	marginTop: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  rootView : {
        height: deviceHeight / 2
    },
    itemText: {
        padding: 8,
        color: "#fff"
    },
    itemTextSelected: {
        padding: 8,
        color: "#fff",
        backgroundColor: '#757575'
    },
    list: {
        flex: 1,
		color: '#000'
    },
	mainLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  itemListText: {
	color: '#757F8C',
    fontSize: 16,
	marginLeft: 10,
	fontWeight:'bold'
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
export default connect(mapStateToProps)(StepFour)