import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,ScrollView,Image,ToolbarAndroid,AsyncStorage,RefreshControl
} from 'react-native';
import {
    Container, Header, Content,
    Card, CardItem, Text,
    Right,Footer,FooterTab,
    Button,Icon,Form,
    Item, Input,Thumbnail,Left,
    Body
} from 'native-base';
class ProfilePage extends Component {
    constructor(){
        super();
        this.state={
            info:'?',
            refreshing: false
        }
    }
    _onRefresh() {
        this.setState({
            refreshing: true
        });
        this.getInfoNotification().done()
    }
    componentDidMount() {
        this.getInfoNotification().done()
    }
    async getInfoNotification(){
        let info = JSON.parse(await AsyncStorage.getItem('curNotification'));
        this.setState({info,refreshing: false})
    }
    profile(){
        let row = [];
        for (let currency in this.state.info) {
            let obj = this.state.info[currency];
            row.push(
                <Card key={currency} style={{padding:10}}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: obj.countryURL}}/>
                            <Body>
                                <Text>{obj.currency}</Text>
                                <Text note>{obj.dataTime}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Left>
                            <Icon active name='ios-arrow-down-outline'/>
                            <Text>{obj.lowBorder}</Text>
                        </Left>
                        <Right style={{ flex:1,flexDirection:'row', justifyContent:'flex-end'}}>
                            <Text style={{ flex:1, justifyContent:'flex-end'}} >{obj.upBorder}</Text>
                            <Icon style={{ flex:1, justifyContent:'flex-end'}} active name='ios-arrow-up-outline'/>
                        </Right>
                    </CardItem>
                </Card>
            );
        }
        return row;
    }
    render() {
        return (
            <Container>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />}
                >
                <Content>
                    {this.profile()}
                </Content>
                </ScrollView>
            </Container>
        );
    }
}
export default ProfilePage;