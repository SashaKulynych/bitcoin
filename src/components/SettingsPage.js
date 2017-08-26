import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,ScrollView,Image,ToolbarAndroid
} from 'react-native';
import {  Container, Header, Content, Card, CardItem, Text, Right,Footer,FooterTab,Button,Icon} from 'native-base';
class SettingsPage extends Component {
    constructor(){
        super();
        this.state={
            curTime:''
        }
    }
    componentWillMount(){
        this.setState({
            curTime : new Date().toLocaleString()
        })
    }
    render() {
        return (
            <Container>
                <ScrollView>
                    <Text>
                    {this.state.curTime}
                    </Text>
                </ScrollView>
            </Container>
        );
    }
}
let styles = StyleSheet.create({
    toolbar: {
        height: 56,
        backgroundColor: '#4883da',
    },
});
export default SettingsPage;