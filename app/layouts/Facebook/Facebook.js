

import React, { Component } from 'react'
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  Image,
  Dimensions,
  ActivityIndicator,
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
class Facebook extends Component {
    constructor(props) {
        super(props)
        this.state = {
			phone: this.props.user_login.phone,
			expandedB: (typeof this.props.check != 'undefined') ? this.props.check : false,
			timkiem: '',
			group: '',
			search: '',
			isShow: false,
			
			items: [],
			old: [],
			key: '',
			list_group: [],
			data: [],
			friend_list: [],
			user_search: [],
			request_friend: [],
			showFriend: false,
			process: false,
			

			
        }
		apis.listGroup(this.state.phone).then(res => {
					this.setState({ list_group: res.data.groups })
                })
                .catch(err => {
					
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Thông báo', description: err.data.message, type: "warning" })
					
					return showMessage({ message: 'Thông báo', description:  'Có lỗi trong quá trình tìm kiếm', type: "warning" })
                    
                })
		apis.getListUser(this.state.phone)
                .then(res => {
					
					this.setState({ friend_list: res.data.data,old: res.data.data, request_friend: res.data.request })
                })
                .catch(err => {
					
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Thông báo', description: err.data.message, type: "warning" })
					
					return showMessage({ message: 'Thông báo', description:  'Có lỗi trong quá trình tìm kiếm', type: "warning" })
                    
                })
            
       
    }
	
	_addGroup = () => {
		const { phone, group } = this.state
			this.setState({ process: true }, () => {
            apis.addGroup(group, phone)
                .then(res => {
					this.setState({ list_group: res.data.groups, group: '' })
					Alert.alert('Thông báo',  res.data.message )
                })
                .catch(err => {
					this.setState({ user_search: [], showFriend: !this.state.showFriend })
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Thông báo', description: err.data.message, type: "warning" })
					
					return showMessage({ message: 'Thông báo', description:  'Có lỗi trong quá trình tìm kiếm', type: "warning" })
                    
                })
        })
	}
	_search = () => {
		const { phone, search } = this.state
		this.setState({ process: true }, () => {
        apis.search(phone, search)
            .then(res => {
				this.setState({ user_search: res.data.data, search: '', showFriend: !this.state.showFriend })
					
            })
            .catch(err => {
				this.setState({ user_search: [], showFriend: !this.state.showFriend })
				this.setState({ process: false })
				if(err.data)return showMessage({ message: 'Thông báo', description: err.data.message, type: "warning" })
					
				return showMessage({ message: 'Thông báo', description:  'Có lỗi trong quá trình tìm kiếm', type: "warning" })
                    
            })
        })
	}	
	
	_appectFriend(id){
		this.setState({ process: true }, () => {
            apis.appectFriend( this.state.phone , this.state.request_friend[id].phone_friend )
                .then(res => {
					this.setState({ friend_list: res.data.data, request_friend: res.data.request})
					Alert.alert('Thông báo',  res.data.message )
                })
                .catch(err => {
					this.setState({ user_search: [], showFriend: !this.state.showFriend })
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Thông báo', description: err.data.message, type: "warning" })
					
					return showMessage({ message: 'Thông báo', description:  'Có lỗi trong quá trình', type: "warning" })
                    
                })
		})
	}
	_showGroup(id){
		
		let groups = this.state.list_group;
		for(let i = 0; i < groups.length; i++){
			groups[i].status = false
		}
		this.setState({
			list_group: []
		})
		groups[id].status = !groups[id].status
		this.setState({
			list_group: groups
		})		
 	}
	_shareFriend(id){
		
	}
	_deleteGroup(id){
		this.setState({ process: true }, () => {
            apis.deleteGroup( this.state.list_group[id].id )
                .then(res => {
					
					this.setState({
						list_group: res.data.groups
					})	
					Alert.alert('Thông báo',  res.data.message )
                })
                .catch(err => {
					this.setState({ user_search: [], showFriend: !this.state.showFriend })
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Thông báo', description: err.data.message, type: "warning" })
					
					return showMessage({ message: 'Thông báo', description:  'Có lỗi trong quá trình', type: "warning" })
                    
                })
		})
	}
	_deleteFriend(id){
		this.setState({ process: true }, () => {
            apis.deleteFriend( this.state.friend_list[id].id )
                .then(res => {
					this.setState({
						friend_list: res.data.friends,
						list_group: res.data.groups
					})	
					Alert.alert('Thông báo',  res.data.message )
                })
                .catch(err => {
					this.setState({ user_search: [], showFriend: !this.state.showFriend })
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Thông báo', description: err.data.message, type: "warning" })
					
					return showMessage({ message: 'Thông báo', description:  'Có lỗi trong quá trình', type: "warning" })
                    
                })
		})
	}
	_deleteFriendGroup(id, id_){
		this.setState({ process: true }, () => {
            apis.deleteFriendGroup(this.state.list_group[id].items[id_].phone_friend,this.state.list_group[id].id )
                .then(res => {
					this.setState({

						list_group: res.data.groups
					})	
					Alert.alert('Thông báo',  res.data.message )
                })
                .catch(err => {
					this.setState({ user_search: [], showFriend: !this.state.showFriend })
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Thông báo', description: err.data.message, type: "warning" })
					
					return showMessage({ message: 'Thông báo', description:  'Có lỗi trong quá trình', type: "warning" })
                    
                })
		})
	}
	_changeName(id){
		this.setState({ process: true }, () => {
            apis.changeName( this.state.friend_list[id].id,  this.state.friend_list[id].name)
                .then(res => {
						
					Alert.alert('Thông báo',  res.data.message )
                })
                .catch(err => {
					this.setState({ user_search: [], showFriend: !this.state.showFriend })
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Thông báo', description: err.data.message, type: "warning" })
					
					return showMessage({ message: 'Thông báo', description:  'Có lỗi trong quá trình', type: "warning" })
                    
                })
		})
	}
	_alert = () => {
		Actions.alerts()
	}
	_home = () => {
		Actions.home({tess_: '1111'})
	}
	_menu = () => {
		Actions.list()
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
	 _addFriend(id) {
		 const { phone } = this.state
			this.setState({ process: true }, () => {
            apis.addFriend(phone, this.state.user_search[id].phone)
                .then(res => {
					Alert.alert('Thông báo',  res.data.message )
					this.setState({ process: false })
					this.setState({ user_search: [], friend_list: res.data.friends, showFriend: !this.state.showFriend })
                })
                .catch(err => {
					this.setState({ showFriend: !this.state.showFriend })
					this.setState({ process: false })
					if(err.data)return showMessage({ message: 'Thông báo', description: err.data.message, type: "warning" })
					
					return showMessage({ message: 'Thông báo', description:  'Có lỗi trong quá trình kết bạn', type: "warning" })
                    
                })
        })
		
	 }
	 pickClick(id) {
		let array_ = this.state.items
		let data = this.state.data
		let friends_ = this.state.friends_
		
		if(array_[id].status_){
			for(let i = 0; i < data.length; i++){
				if(data[i].id == id){
					data.splice(i, 1);
					friends_.splice(i, 1);
				}
			}
		}else{
			data.push({id: id, value: array_[id]});
			friends_.push(array_[id]);
		}
		
		array_[id].status_ = !array_[id].status_;
		this.setState({
		  data: data,
		  friends_: friends_,
		  items: array_
		})
	}
	_offBreakfast = () => {
		let groups = this.state.list_group
		this.setState({
		  timkiem: '',
		  list_group: [],
		})
		
		let items = this.state.items
		
		groups[this.state.key].items = this.state.friends_
		this.setState({
		  isShow: !this.state.isShow,
		  list_group: groups,
		})
		
		this.setState({
		  height: height,

		})
		let data = {
			items: this.state.list_group[this.state.key].items,
		}
		let send_ = JSON.stringify(data)
		this.setState({ process: true }, () => {
            apis.setGroup(this.state.list_group[this.state.key].id, send_)
                .then(res => {
					this.setState({
					  list_group: res.data.groups,

					})
					
                })
                .catch(err => {
					
					
					return showMessage({ message: 'Thông báo', description:  'Có lỗi trong quá trình', type: "warning" })
                    
                })
        })
	 }
	_showSetting(id){
		let friend = this.state.friend_list
		friend[id].status__ = !friend[id].status__
		this.setState({
					  friend_list: friend,

					})
	}
	
	_showFood(id){
		let items = this.state.old
		
		let data = []
		
		for(let i = 0; i < this.state.friend_list.length; i++){
			if(this.state.list_group[id].array_.indexOf(items[i].phone_friend) != null){
			if(this.state.list_group[id].array_.indexOf(items[i].phone_friend) != -1){
				
				data.push({id: i, value: items[i]});
				items[i].status_ = true
			}else{
				items[i].status_ = false
			}
			}
		}
		this.setState({
		  isShow: !this.state.isShow,
		  items: items, 
		  friends_: this.state.list_group[id].items, 
		  data: data, 
		  l: 10,
		key:id
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
	changeExpandedC = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ expandedC: !this.state.expandedC }); 
	  }
	changeExpandedD = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ expandedD: !this.state.expandedD }); 
	  }
	changeExpandedB = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ expandedB: !this.state.expandedB }); 
	  }
	  render() {
		  const { phone, search, showFriend, group, isShow, timkiem  } = this.state
		return (
		  <View style={styles.container}>
<StatusBar backgroundColor="#90D077" color="#fff"/>
			<View style={[styles.box, {width: width, height: 85}]} >
			
			
			<TouchableOpacity   style={styles.back} onPress={this._back}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={styles.buttonText}>
				    <Icon style={{top:10, marginTop:10}} name={'md-arrow-back'} size={20} color='#fff' />
				</Text>
			  </View>
			</TouchableOpacity>
			<Text maxFontSizeMultiplier={1} style={[styles.buttonText, styles.title]}>
				    Bạn bè
			</Text>
			</View>
			<View style={[{width: width, height: height - 85 - 80}]} >
			<ScrollView style={[{width: width, height: height - 85 - 80}]}>
			<TouchableOpacity onPress={this.changeExpandedB} style={[styles.image_box]}>
				
				<Image
					style={styles.image}
                    source={ require('./imgs/icon1.png') }
                    

                />
				
			
			</TouchableOpacity>
			<View style={{ height: this.state.expandedB ? null : 0, overflow: 'hidden'}}>
				<View style={[{width: width,  height: 40, backgroundColor: '#ddd', position: 'relative'}]} >
					
					<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
						Lời mời kết bạn
					</Text>
				</View>
				{
				this.state.request_friend.map((val, index) => {
						
				
				return(
				<View style={[{width: width,  height: 140, backgroundColor: '#E7F0E4', position: 'relative', marginLeft: 0}]} >
						
						<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', left: 0, top: 10, marginTop: 0,fontSize: 17, position:'relative', marginLeft: 10, width: width - 20}]}>
							{val.name} đã gửi cho bạn lời mời kết bạn
						</Text>
						<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C',left: 0,  top: 15,   fontSize: 14, position:'relative', marginLeft: 10, width: width - 20}]}>
							Bạn có muốn chia sẻ tình trạng Thông báo của bạn cho người đó không?
						</Text>
						<View style={[{width: width, position: 'relative', marginTop: 30, height: 40}]} >
							<TouchableOpacity  onPress={this._search} style={{backgroundColor: '#90D077', borderRadius:5,borderWidth: 1, borderColor: '#fff',position: 'absolute', zIndex: 1, width: 100, height:30, top:5, left: 10}}  key={index} onPress={this._appectFriend.bind(this, index)}>
							  <View>
								<Text maxFontSizeMultiplier={1} style={{height:30, justifyContent: 'center', marginTop: 3,textAlign: 'center', color: '#fff', fontSize: 15}}>
									Đồng ý
								</Text>
							  </View>
							</TouchableOpacity>
							<TouchableOpacity  onPress={this._search} style={{backgroundColor: '#fff', borderRadius:5,borderWidth: 1, borderColor: '#fff',position: 'absolute', zIndex: 1, width: 100, height:30, top:5, left: 120}}   key={index} onPress={this._deleteFriend.bind(this, index)}>
							  <View>
								<Text maxFontSizeMultiplier={1} style={{height:30, justifyContent: 'center', marginTop: 3,textAlign: 'center', color: '#757F8C', fontSize: 15}}>
									Từ chối
								</Text>
							  </View>
							</TouchableOpacity>
							
						</View>
				</View>
				)
				})
				}
				<View style={[{width: width,  height: 40, backgroundColor: '#ddd', position: 'relative'}]} >
					<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
						Kết bạn
					</Text>
				</View>
				<View style={[ styles.formGroup, {marginBottom: 0} ]}>
                    <View style={ styles.itemInput  }>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Nhập số điện thoại"
							placeholderTextColor="#757F8C"
							onChangeText={(search) => this.setState({ search })}
							value={search}
						/>
					</View>
					<TouchableOpacity  onPress={this._search} style={{backgroundColor: '#90D077', borderRadius:5,borderWidth: 1, borderColor: '#fff',position: 'absolute', zIndex: 1, width: 50, height:30, top:5, right: 20}} >
					  <View>
						<Text maxFontSizeMultiplier={1} style={{width: 50, height:30, justifyContent: 'center', textAlign: 'center', color: '#fff', fontSize: 15}}>
							Tìm
						</Text>
					  </View>
					</TouchableOpacity>
                </View>
				
				{
				this.state.user_search.map((val, index) => {
						

				return(
				<View style={[{width: width,  height: 40, backgroundColor: '#E7F0E4', position: 'relative'}]} >
						<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
							{val.name}
						</Text>
						<TouchableOpacity  onPress={this._search} style={{backgroundColor: '#90D077', borderRadius:5,borderWidth: 1, borderColor: '#fff',position: 'absolute', zIndex: 1, width: 70, height:30, top:5, right: 20}} key={index} onPress={this._addFriend.bind(this, index)}>
					  <View>
						<Text maxFontSizeMultiplier={1} style={{width: 70, height:30, justifyContent: 'center', textAlign: 'center', color: '#fff', fontSize: 15}}>
							Kết bạn
						</Text>
					  </View>
					</TouchableOpacity>
				</View>
				)
				})
				}
				</View>
				
			<TouchableOpacity onPress={this.changeExpandedC} style={[styles.image_box]}>
				
				<Image
					style={styles.image}
                    source={ require('./imgs/icon2.png') }
                    

                />
				
			
			</TouchableOpacity>
				
				<View style={{ height: this.state.expandedC ? null : 0, overflow: 'hidden'}}>
				{
				this.state.friend_list.map((val, index) => {
				return(
					<View>
					<View style={[ styles.formGroup, {marginBottom: 0, borderColor: '#757F8C',borderBottomWidth: 1, height: 40, position: 'relative' } ]}>
					
					<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[styles.itemListText, {color: '#757F8C', fontSize: 15, marginTop: 0,height:40, marginLeft: 10}]}
							placeholder={val.name}
							placeholderTextColor={val.name}
							onChangeText={(name) => {
								let data = this.state.friend_list
								data[index].name = name
								this.setState({ friend_list: data })
							}}
							value={val.name}
						/>
					
					{
					(val.status == 2)	? 
					<View  onPress={this._addGroup} style={{ borderRadius:5,borderWidth: 1, borderColor: '#fff',position: 'absolute', zIndex: 1, width: 50, height:30, top:5, right: 10}} >
					  <View>
						<Text maxFontSizeMultiplier={1} style={{width: 50, height:30, justifyContent: 'center', textAlign: 'center', color: '#fff', fontSize: 15}}>
							Chờ
						</Text>
					  </View>
					</View>
					: <TouchableOpacity key={index} onPress={this._showSetting.bind(this, index)}style={{borderRadius:5,borderWidth: 1, borderColor: '#fff',position: 'absolute', zIndex: 1, width: 50, height:30, top:5, right: 10}} >
					  <View>
						<Text maxFontSizeMultiplier={1} style={{width: 50, height:30, justifyContent: 'center', textAlign: 'center', color: '#fff', fontSize: 15}}>
						<Icon style={{top:15, marginTop:25}} name={'md-menu'} size={20} color='#757F8C' />
							</Text>
						
					  </View>
					</TouchableOpacity>
					}
					</View>
					{
						(val.status__) ?
					<View style={[{ height: 40, backgroundColor: '#fff', position: 'relative', width:width }]}>
						<TouchableOpacity style={[{marginBottom: 0, height: 40, position: 'absolute', backgroundColor: '90D077', paddingLeft: 10, paddingRight: 10,zIndex:100 } ]}  key={index} onPress={this._deleteFriend.bind(this, index)}>
							<Text maxFontSizeMultiplier={1} style={{backgroundColor: '90D077',justifyContent: 'center', textAlign: 'center', color: '#000', fontSize: 15, top: 10, left: 10}}>
								Xóa
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[ styles.formGroup, {marginBottom: 0, backgroundColor: '90D077' ,position: 'absolute', paddingBottom: 10, paddingLeft: 10,zIndex:100 , paddingLeft: 15, paddingRight: 15, top: 10, left: 50} ]}  key={index} onPress={this._changeName.bind(this, index)}>
							<Text maxFontSizeMultiplier={1} style={{backgroundColor: '90D077', justifyContent: 'center', textAlign: 'center', color: '#000', fontSize: 15}}>
								Đổi tên
							</Text>
						</TouchableOpacity>
						<View style={[{marginBottom: 0, height: 40, position: 'absolute', backgroundColor: '90D077', paddingLeft: 10, paddingRight: 10 } ]}>
							<Text maxFontSizeMultiplier={1} style={{backgroundColor: '90D077',justifyContent: 'center', textAlign: 'center', color: '#000', fontSize: 15, top: 10, left: 160}}>
								{val.phone_friend}
							</Text>
						</View>
						</View>
					: null
					}
					</View>
				)
				})
				}
				</View>
				
			<TouchableOpacity onPress={this.changeExpandedD} style={[styles.image_box]}>
				
				<Image
					style={styles.image}
                    source={ require('./imgs/icon3.png') }
                    

                />
				
			
			</TouchableOpacity>
			<View style={{ height: this.state.expandedD ? null : 0, overflow: 'hidden'}}>
				<View style={[{width: width,  height: 40, backgroundColor: '#ddd', position: 'relative'}]} >
					<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
						Thêm nhóm mới
					</Text>
				</View>
				<View style={[ styles.formGroup, {marginBottom: 0} ]}>
                    <View style={ styles.itemInput  }>
						<TextInput maxFontSizeMultiplier={1} 
							autoCorrect={false}
							returnKeyType='done'
							style={[{}, styles.input ]}
							placeholder="Nhập tên nhóm"
							placeholderTextColor="#757F8C"
							onChangeText={(group) => this.setState({ group })}
							value={group}
						/>
					</View>
					<TouchableOpacity  onPress={this._addGroup} style={{backgroundColor: '#90D077', borderRadius:5,borderWidth: 1, borderColor: '#fff',position: 'absolute', zIndex: 1, width: 50, height:30, top:5, right: 20}} >
					  <View>
						<Text maxFontSizeMultiplier={1} style={{width: 50, height:30, justifyContent: 'center', textAlign: 'center', color: '#fff', fontSize: 15}}>
							Tạo
						</Text>
					  </View>
					</TouchableOpacity>
                </View>
				<View style={[{width: width,  height: 40, backgroundColor: '#ddd', position: 'relative'}]} >
					<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
						Nhóm
					</Text>
				</View>
				
				{
				this.state.list_group.map((val, index) => {
						
				
				return(
					<View>
					<TouchableOpacity style={{width: width, height: 40}}  key={index} onPress={this._showGroup.bind(this, index)}>
					<View style={[ styles.formGroup, {marginBottom: 0, borderColor: '#757F8C',borderBottomWidth: 1, height: 40, position: 'relative' } ]}>
					
					<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {color: '#757F8C', fontSize: 15, marginTop: 10, marginLeft: 10}]}>
						{val.name}
					</Text>
					<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 10, top: 15}]}>
						<Icon style={{top:10, marginTop:25}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
					</Text>
					</View>
					</TouchableOpacity>
						{		
						
						val.status ?
						<View>
						{
							(val.items) ? 
							val.items.map((val_, index_) => {
								return(
						<View style={[{height: 40, backgroundColor: '#E7F0E4', position: 'relative', paddingLeft: 15, paddingRight: 15, width: width}]}>
						<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 20}]}>
							{val_.name}
						</Text>
						<TouchableOpacity style={[{zIndex: 1,bottom:15,color: '#fff',fontSize: 20,}, {color: '#757F8C', fontSize: 15,right: 20,
paddingLeft:10, paddingTop: 10, paddingRight: 10, paddingBottom:10,	position: 'absolute', top: 15}]} key={index_} onPress={this._deleteFriendGroup.bind(this, index, index_ )}>
						<Text maxFontSizeMultiplier={1} style={[{zIndex: 1,bottom:15,color: '#fff',fontSize: 20,}, {color: '#757F8C', fontSize: 15}]}>
							<Icon style={{top:10, marginTop:7}} name={'md-trash'} size={20} color='#757F8C' />
						</Text>
						</TouchableOpacity>
						</View>
						)
							})
							: null
							}
							
						
						
						<TouchableOpacity style={[{height: 40, backgroundColor: '#E7F0E4', position: 'relative', paddingLeft: 15, paddingRight: 15}]} key={index}  onPress={this._showFood.bind(this, index)}>
							<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#000', fontSize: 15, bottom: 7, left: 20}]}>
								Thêm người vào nhóm
							</Text>
							</TouchableOpacity>
						<TouchableOpacity style={[{height: 40, backgroundColor: '#E7F0E4', position: 'relative', paddingLeft: 15, paddingRight: 15}]} key={index}  onPress={this._deleteGroup.bind(this, index)}>
							<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#000', fontSize: 15, bottom: 7, left: 20}]}>
								Xóa nhóm
							</Text>
							</TouchableOpacity>
						</View>
						: null
						}
					</View>
				)
				})
				}
				</View>
				<View style={{marginBottom: 300}}>
				
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
			<TouchableOpacity   style={{position: 'absolute', width: width*.2, height:80, top:0, left:width*.2}}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', marginTop: 10}}>
				    <Icon style={{top:10, marginTop:7}} name={'md-person-add'} size={41} color='#90D077' />
				</Text>
				<Text maxFontSizeMultiplier={1} style={{width: width*.2, textAlign: 'center', color: '#90D077', fontSize: 12}}>
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
						this.state.items.map((val, index) => {
							if(val.name.includes(this.state.timkiem))
							return (
								<View style={{height: 40, position: 'relative', zIndex: 1}}>
								<TouchableOpacity style={{height: 30, marginTop: 10, position: 'relative', zIndex: 1}} key={index} onPress={this.pickClick.bind(this, index)}>
									<Text maxFontSizeMultiplier={1} style={[styles.itemOption, {marginLeft: 15}]}>
										{val.name}
									</Text>
									{(val.status_) ? 
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
        paddingHorizontal: 0,
		position: 'relative',
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
export default connect(mapStateToProps)(Facebook)