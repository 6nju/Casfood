
import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Icon, Divider, Button } from 'react-native-elements'
import { colors, apis } from '../../../configs';
import { ActionCreators } from '../../../redux/ActionCreators'
import { Actions, ActionConst } from 'react-native-router-flux';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            process: false
        }
    }

    logout() {
        this.setState({ process: true })
        apis.logout()
            .then(res => {
                this.setState({ process: false }, () => {
                    this.props.dispatch(ActionCreators.set_user_login(null))
                    Actions.login({ type: ActionConst.REPLACE })
                })
            })
            .catch(err => this.setState({ process: false }, () => {
                this.props.dispatch(ActionCreators.set_user_login(null))
                Actions.login({ type: ActionConst.REPLACE })
            }))
    }

    render() {
        const { process } = this.state
        return (
            <View style={{ flex: 1, paddingTop: 12 }}>
                <ScrollView>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }}>
                        <Text maxFontSizeMultiplier={1} style={{ flex: 1 }}>Thông tin tài khoản</Text>
                        <Icon name='ios-arrow-forward' type='ionicon' color='gray' size={18} />
                    </TouchableOpacity>
                    <Divider style={{ backgroundColor: 'lightgray', marginHorizontal: 16 }} />
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }}>
                        <Text maxFontSizeMultiplier={1} style={{ flex: 1 }}>Lịch sử phục vụ</Text>
                        <Icon name='ios-arrow-forward' type='ionicon' color='gray' size={18} />
                    </TouchableOpacity>
                    <Divider style={{ backgroundColor: 'lightgray', marginHorizontal: 16 }} />
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }}>
                        <Text maxFontSizeMultiplier={1} style={{ flex: 1 }}>Sổ tay nhân viên</Text>
                        <Icon name='ios-arrow-forward' type='ionicon' color='gray' size={18} />
                    </TouchableOpacity>
                    <Divider style={{ backgroundColor: 'lightgray', marginHorizontal: 16 }} />
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }}>
                        <Text maxFontSizeMultiplier={1} style={{ flex: 1 }}>Lịch làm việc</Text>
                        <Icon name='ios-arrow-forward' type='ionicon' color='gray' size={18} />
                    </TouchableOpacity>
                    <Divider style={{ backgroundColor: 'lightgray', marginHorizontal: 16 }} />
                </ScrollView>

                <View style={{ marginHorizontal: 14, marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.logout()} disabled={process}>
                        <View style={{ height: '100%', position: 'absolute', top: 0, left: 12, alignItems: 'center', justifyContent: 'center' }}>
                            {process ? <ActivityIndicator color={'white'} /> : null}
                        </View>
                        <Text maxFontSizeMultiplier={1} style={{
                            fontSize: 16, paddingVertical: 8, color: 'gray', fontWeight: 'bold'
                        }}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Account