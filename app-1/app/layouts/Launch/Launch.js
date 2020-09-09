
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, TouchableWithoutFeedback, ImageBackground, TouchableHighlight } from 'react-native'
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper'
import { colors, settings, globalStyles, images, apis } from '../../configs/index'
import { styles } from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
})

class Launch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            routes: [
                { key: 'slide_one', data: { tieuDe: '', moTa: '' } },
                { key: 'slide_tow', data: { tieuDe: '', moTa: '' } , img: require('./Imgs/slide_tow.png')},
                { key: 'slide_three', data: { tieuDe: '', moTa: '' }, img: require('./Imgs/slide_three.png') },
                { key: 'slide_four', data: { tieuDe: '', moTa: '' }, img: require('./Imgs/slide_four.png')  }
            ],
            process: false
        };
        apis.lunchMessage()
            .then(res => {
                
                if(res.status == 1){
                    let routers = [
                        { key: 'slide_one', data: { tieuDe: '', moTa: '' } },
                        { key: 'slide_tow', data: res.data.data.manSo1, img: require('./Imgs/slide_tow.png') },
                        { key: 'slide_three', data: res.data.data.manSo2, img: require('./Imgs/slide_three.png') },
                        { key: 'slide_four', data: res.data.data.manSo3, img: require('./Imgs/slide_four.png') },
                    ];
                    this.setState({ routes: routers });
                }
                
            })
            .catch(err => this.setState({ process: false }, () => {
                alert('Error');
            }))
    }
    
    _renderItem = ({ navigationState, position }) => ({ route, index }) => {
        let style_ = {};
        if(index == this.state.index){
            style_ = styles.active;
        }
        return (
            <View style={styles.tab}>
                <Animated.View style={[styles.item, style_]}>
                    <View
                        style={style_}
                    />
                </Animated.View>
            </View>
        );
    };
    
    _onPrev = ( index ) => {
        let key_ = this.state.index;
        let prev_ = key_ - 1;
        if (key_ == 0) prev_ = 3;
        this.setState({index: prev_});
        this._renderTabBar;
    }
    _onNext = ( index ) => {
        let key_ = this.state.index;
        let next_ = key_ + 1;
        if (key_ == 3) next_ = 0;
        this.setState({index: next_});
        this._renderTabBar;
    }
    _renderTabBar = ( props ) => { 
        return (
            <View style={[styles.tabbar, styles.position]}>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('login')}>
                  <View style={styles.button}>
                    <Text maxFontSizeMultiplier={1} style={styles.textButton}>Skip</Text>
                  </View>
                </TouchableHighlight>
                {props.navigationState.routes.map((route, index) => {
                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => props.jumpTo(route.key)}
                        >
                            {this._renderItem(props)({ route, index })}
                        </TouchableWithoutFeedback>
                    );
                })}
                <TouchableHighlight onPress={this._onNext}>
                  <View style={styles.button}>
                    <Text maxFontSizeMultiplier={1} style={styles.textButton}>Next</Text>
                  </View>
                </TouchableHighlight>    
            </View>
        );
    }
    renderScene = ({ route }) => {

            if (this.state.index == 0) {
                return (
                    <ImageBackground source={require('./Imgs/slide_one.png')} style={ styles.imgBackground }>
                    </ImageBackground>  
                );
            }else{
               
                return (
                    <ImageBackground source={this.state.routes[this.state.index].img} style={ styles.imgBackground }>
                        
                    </ImageBackground>  
                );
            }
        
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TabView
                    navigationState={this.state}
                    renderScene={this.renderScene}
                    swipeEnabled={false}
                    renderTabBar={this._renderTabBar}
                    tabBarPosition="bottom"
                    onIndexChange={index => this.setState({ index })}
                />
                <View style={{ height: getBottomSpace() }} />
            </View>
        )
    }
}

export default connect(mapStateToProps)(Launch)