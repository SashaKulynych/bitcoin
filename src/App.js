import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet
} from 'react-native';
import {Icon} from 'native-base';

import { TabNavigator} from 'react-navigation'
import { StackNavigator} from 'react-navigation'

import MainPage from './components/MainPage';
import SettingsPage from './components/SettingsPage';
import ProfilePage from './components/ProfilePage';
import AddCurrent from './components/AddCurrent';

export default class App extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return <MainPage/>;
    }
}
const stackSettingNav = StackNavigator({
    SettingsPage: {
        screen: SettingsPage,
        navigationOptions: {
            title:'Setting',
        }
    }
});
const stackProfileNav = StackNavigator({
    ProfilePage: {
        screen: ProfilePage,
        navigationOptions: {
            title:'Profile',
        }
    },
});
const stackMainNav = StackNavigator({
    MainPage: {
        screen: MainPage,
        navigationOptions: {
            title:'Bitcoin List',
        }
    },
    AddCurrent: {
        screen: AddCurrent,
        navigationOptions: {
            title:'Add',
        }
    }
});
const tabNav = TabNavigator({
    MainPage: {
        screen: stackMainNav,
        navigationOptions: {
            tabBarIcon: () => <Icon name={"logo-bitcoin"} />
        }
    },
    ProfilePage: {
        screen: stackProfileNav,
        navigationOptions: {
            tabBarIcon: () => <Icon name={"md-contact"} />
        }
    },
    SettingsPage: {
        screen: stackSettingNav,
        navigationOptions: {
            tabBarIcon: () => <Icon name={"md-settings"} />
        }
    }
}, {tabBarPosition:'bottom',
    tabBarOptions: {
        showIcon:'true',
        showLabel:false,
        activeTintColor: 'black',
        style:{
            backgroundColor: '#F3F3F3'
        }
    }
});

AppRegistry.registerComponent('App', () => tabNav);