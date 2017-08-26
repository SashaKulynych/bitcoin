import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,ScrollView,Image,Button,StatusBar,ToolbarAndroid,RefreshControl,View
} from 'react-native';
import {  Container, Header, Content, Card, CardItem, Text, Right,Footer,FooterTab,Icon,Left,Thumbnail,List, ListItem} from 'native-base';
import {SkypeIndicator} from'react-native-indicators';
class MainPage extends Component {
    constructor(props){
        super(props);
        this.state={
            data:{},
            namesCurrency:[],
            refreshing: false,
            showLoading:true,
            updateTime:''
        };
    }
    getData(){
        fetch('https://blockchain.info/ticker')
            .then((response) =>
                response.json()
            )
            .then((responseJson) => {
                (
                    this.setState({
                        data:responseJson,
                        showLoading: false,
                        refreshing: false,
                        updateTime : new Date().toLocaleString()
                    }));
            })
            .catch((error)=>{
            })
    }
    componentDidMount(){
        this.getData();
    }
    _onRefresh() {
        this.setState({
            refreshing: true
        });
        this.getData();
    }
    start() {
        let row = [];
        for (let currency in this.state.data) {
            let obj = this.state.data[currency];
            try {
                let country = 'https://raw.githubusercontent.com/emcrisostomo/flags/master/png/256/' + currency.substr(0, 2) + ".png";
                if (currency.substr(0, 2) == 'EU') {
                    country = 'http://artalbum.org.ua/vc_thumb/countries/flags/Flag_of_Europe.png';
                }
                row.push(
                    <ListItem key={currency} onPress={() => {
                        this.props.navigation.navigate('AddCurrent',
                            {
                                currency:currency,
                                country:country
                            })
                    }}>
                        <Left>
                            <Thumbnail source={{uri: country}}/>
                            <Text>
                                {currency + " " + obj['last'] + " " + obj['symbol']}
                            </Text>
                        </Left>
                        <Right>
                            <Icon name="ios-arrow-forward-outline"/>
                        </Right>
                    </ListItem>
                );
            }
            catch (error) {
            }
        }
        return row;
    }

    render() {
        return (
            <Container style={styles.containerStyle}>
                <ToolbarAndroid
                    title='Bitcoin List'
                    style={styles.toolbar}
                    titleColor='white'
                />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />}
                >

                    <Text style={styles.timeStyle}>{this.state.updateTime}</Text>
                    <List>
                            <View>
                                {
                                    this.state.showLoading  &&  <SkypeIndicator style={styles.indicatorStyle} color='#4883da' />
                                }
                            </View>
                            {
                                this.start()
                            }
                    </List>
                </ScrollView>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    timeStyle:{
        textAlign:'center',
        marginTop:5,
        color:'silver',
        fontSize:12
    },
    containerStyle:{
        flex: 1
    },
    indicatorStyle:{
        marginTop:'60%'
    }
});
export default MainPage;