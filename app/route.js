
import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { Scene, Router, Actions, Stack, ActionConst, Animated, Easing } from 'react-native-router-flux'
import { colors, settings } from './configs/index'
import FlashMessage from 'react-native-flash-message'
import { StackViewStyleInterpolator } from 'react-navigation-stack'
import {
    Account, Login, Home,AddItem,SearchInfo,Search,ListFood,SettingTow,Setting,Heavy,Forgot,StepFive,StepSix,CreateFoodTow, Launch,AlertInfoTow, FrontPage, Register, AlertInfo, StepOne, StepTow, MenuGroupTow, StepThree, StepFour, Friends, Alerts, MyMenuGroup, Facebook, Menu, CreateFood, MyMenu, InfoMenu, MenuGroup, MenuExtra, MenuSport, Post, List
} from './layouts/index'
import Axios from 'axios';
import { ActionCreators } from './redux/ActionCreators'
import { connect } from 'react-redux'

const getSceneStyle = () => {
    const style = {
        flex: 1,
        backgroundColor: 'white'
    };
    return style
};

const mapStateToProps = (state) => ({
})

class RouterComponent extends Component {
    constructor(props) {
        super(props)
        Axios.defaults.baseURL = settings.ServiceAddress
        Axios.defaults.timeout = 30000
        if (props.store.getState().user_login) {
            Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.store.getState().user_login.token
            }
        } else {
            Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        Axios.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            // console.log(error.response)
            // if (error.response.status === 401) {
            //     props.dispatch(ActionCreators.set_user_login(null))
            //     Actions.login({ type: ActionConst.REPLACE })
            // } else
            //     return Promise.reject(error);
        });
    }

    onBackPress() {
        if (Actions.state.index === 0) {
            return false
        }
        Actions.pop()
        return true
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
                <StatusBar
                    translucent
                    backgroundColor="rgba(0, 0, 0, 0.0)"
                    animated
                    barStyle="light-content"
                />
                <Router getSceneStyle={getSceneStyle} backAndroidHandler={this.onBackPress}>
                    <Stack key='root' hideNavBar hideTabBar transitionConfig={() => ({
						transitionSpec: {
						duration: 500,


						},
                        screenInterpolator: (props) => {
                            const { scene } = props
                            switch (scene.route.routeName) {
                                case 'login':
                                    return StackViewStyleInterpolator.forHorizontal(props)
                                default:
                                    return StackViewStyleInterpolator.forHorizontal(props)
                            }
                        }
                    })}>
                        <Scene key='heavy' component={Heavy} panHandlers={null}/>
                        <Scene key='account' component={Account} panHandlers={null}/>
                        <Scene key='setting' component={Setting} panHandlers={null}/>
                        <Scene key='launch' component={Launch} panHandlers={null}/>
                        <Scene key='home' component={Home} panHandlers={null}  initial={this.props.store.getState().user_login}/>
                        <Scene key='login' component={Login} panHandlers={null} />
                        <Scene key='frontpage' component={FrontPage} panHandlers={null} initial={!this.props.store.getState().user_login}/>
                        <Scene key='settingtow' component={SettingTow} panHandlers={null}/>
                        <Scene key='register' component={Register} panHandlers={null}/>
                        <Scene key='forgot' component={Forgot} panHandlers={null}/>
                        <Scene key='stepone' component={StepOne} panHandlers={null}/>
                        <Scene key='searchinfo' component={SearchInfo} panHandlers={null}/>
                        <Scene key='search' component={Search} panHandlers={null}/>
                        <Scene key='steptow' component={StepTow} panHandlers={null}/>
                        <Scene key='listfood' component={ListFood} panHandlers={null}/>
                        <Scene key='additem' component={AddItem} panHandlers={null}/>
                        <Scene key='stepthree' component={StepThree} panHandlers={null}/>
                        <Scene key='alertinfo' component={AlertInfo} panHandlers={null}/>
                        <Scene key='stepsix' component={StepSix} panHandlers={null}/>
                        <Scene key='stepfive' component={StepFive} panHandlers={null}/>
                        <Scene key='menu' component={Menu} panHandlers={null}/>
                        <Scene key='alertinfotow' component={AlertInfoTow} panHandlers={null}/>
						<Scene key='createfoodtow' component={CreateFoodTow} panHandlers={null}/>
                        <Scene key='stepfour' component={StepFour} panHandlers={null}/>
                        <Scene key='mymenu' component={MyMenu} panHandlers={null}/>
                        <Scene key='mymenugroup' component={MyMenuGroup} panHandlers={null}/>
                        <Scene key='list' component={List} panHandlers={null}/>
                        <Scene key='infomenu' component={InfoMenu} panHandlers={null}/>
                        <Scene key='post' component={Post} panHandlers={null}/>
                        <Scene key='menugrouptow' component={MenuGroupTow} panHandlers={null}/>
                        <Scene key='friends' component={Friends} panHandlers={null}/>
                        <Scene key='alerts' component={Alerts} panHandlers={null}/>
                        <Scene key='facebook' component={Facebook} panHandlers={null}/>
                        <Scene key='menuextra' component={MenuExtra} panHandlers={null}/>
                        <Scene key='createfood' component={CreateFood} panHandlers={null}/>
                        <Scene key='menugroup' component={MenuGroup} panHandlers={null}/>
                        <Scene key='menusport' component={MenuSport} panHandlers={null}/>
                    </Stack>
                </Router>
				
                <FlashMessage position="top" />
            </View>
        );
    }
}

export default connect(mapStateToProps)(RouterComponent)
