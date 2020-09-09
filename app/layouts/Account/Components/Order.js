
import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { colors, apis } from '../../../configs';
import { Divider } from 'react-native-elements';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            floors: [{ name: 'Hoá đơn' }],
            is_select_floor: 0,
            list_order: []
        }
    }

    componentDidMount = () => {
        apis.getAllLevel()
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    let floors = res.data.data
                    floors.unshift({ name: 'Hoá đơn' })
                    this.setState({ floors })
                }
            })
            .catch(err => console.log(err))
        apis.getListOrderByLevel()
            .then(res => {
                if (res.status === 200)
                    this.setState({ list_order: res.data.data })
                console.log(res)
            })
    };

    getOrder(level_id) {
        apis.getListOrderByLevel(level_id)
            .then(res => {
                if (res.status === 200)
                    this.setState({ list_order: res.data.data })
                console.log(res)
            })
    }

    render() {
        const { floors, is_select_floor, list_order } = this.state
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ paddingHorizontal: 6, flexDirection: 'row', paddingVertical: 8 }}>
                            {
                                floors.map((item, idx) => {
                                    return <TouchableOpacity style={{
                                        height: 36, borderRadius: 18, marginHorizontal: 6, justifyContent: 'center', alignItems: 'center', borderWidth: 1,
                                        borderColor: colors.primaryColor, backgroundColor: idx === is_select_floor ? colors.primaryColor : 'white'
                                    }} key={idx} onPress={() => {
                                        this.setState({ is_select_floor: idx }, () => {
                                            this.getOrder(item.id)
                                        })
                                    }}>
                                        <Text maxFontSizeMultiplier={1} style={{ paddingVertical: 4, paddingHorizontal: 10, color: idx === is_select_floor ? 'white' : colors.textColor }}>{item.name}</Text>
                                    </TouchableOpacity>
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={Platform.OS == "android" ? -500 : 0} enabled>
                    <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="none">
                        <View style={{ flex: 1 }}>
                            {
                                list_order && list_order.length > 0 && list_order.map((item, idx) => {
                                    return <View style={{ borderBottomWidth: 1, borderColor: 'gray' }} key={idx}>
                                        <View style={{ flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 16 }}>
                                            <Text maxFontSizeMultiplier={1} style={{ flex: 1 }}>Bàn {item.table.table_name}</Text>
                                            <Text maxFontSizeMultiplier={1} style={{ color: 'gray' }}>08:00</Text>
                                        </View>
                                        <Divider style={{ backgroundColor: 'lightgray', marginHorizontal: 16 }} />
                                        <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12 }}>
                                            <View style={{ flex: 1 }}>
                                                <Text maxFontSizeMultiplier={1} style={{ marginBottom: 5 }}>{item.customer.customer_name}</Text>
                                                <Text></Text>
                                            </View>
                                            <View style={{ alignItems: 'flex-end' }}>
                                                <Text maxFontSizeMultiplier={1} style={{ marginBottom: 5 }}>{item.order_detail.list_product.length} sản phẩm</Text>
                                                <Text>{item.order_detail.order_common.amount}đ</Text>
                                            </View>
                                        </View>
                                        <View style={{ paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 30, backgroundColor: colors.primaryColor }}>
                                                <Text maxFontSizeMultiplier={1} style={{ color: 'white' }}>Sửa</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 30, backgroundColor: colors.secondaryColor }}>
                                                <Text maxFontSizeMultiplier={1} style={{ color: 'white' }}>Tạo mới</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 30, backgroundColor: colors.tertiaryColor }}>
                                                <Text maxFontSizeMultiplier={1} style={{ color: 'white' }}>Chi tiết</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Divider style={{ backgroundColor: 'lightgray', marginHorizontal: 16, marginTop: 12 }} />
                                        <View style={{ flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 16 }}>
                                            <Text maxFontSizeMultiplier={1} style={{ flex: 1 }}>Trạng thái</Text>
                                            <Text>{item.order_detail.order_common.status_name}</Text>
                                        </View>
                                    </View>
                                })
                            }
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

export default Order