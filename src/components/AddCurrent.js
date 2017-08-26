import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,ScrollView,Image,AsyncStorage,View,Button,Keyboard
} from 'react-native';
import {
    Container, Content, Text,
    Right,Icon,Form,
    Item, Input,Thumbnail
} from 'native-base';
import DropdownAlert from 'react-native-dropdownalert'

class AppCurrent extends Component {
    constructor(props){
        super(props);
        this.state={
            currencyUpdate:false,
            lowBorder:0,
            upBorder:0,
            data:''
        }
    }
    addToStorage(state){
        let curNotification = {
            [state.params.currency]: {
                lowBorder: this.state.lowBorder,
                upBorder: this.state.upBorder,
                countryURL: state.params.country,
                currency: state.params.currency,
                dataTime: this.state.data
            }
        };
        AsyncStorage.mergeItem('curNotification', JSON.stringify(curNotification));
    }
    check(state) {
        try {
            if (state.params.currency === undefined) {
            } else return (
                <Container style={{padding: 10, flex: 1}}>
                    <Text style={styles.textStyle}>Indicate the lower and upper limit of the value of the bitcoin</Text>
                    <Container style={styles.mainContainer}>
                        <Container style={styles.containerForm}>
                            <Form>
                                <Item>
                                    <Icon active name='ios-arrow-down-outline'/>
                                    <Input
                                        keyboardType={ "phone-pad" }
                                        placeholder="Low"
                                        onChangeText={
                                            (value) => {
                                                this.setState({
                                                    lowBorder: value
                                                });
                                            }
                                        }
                                    />
                                </Item>
                                <Item>
                                    <Icon active name='ios-arrow-up-outline'/>
                                    <Input
                                        keyboardType={ "phone-pad" }
                                        placeholder="Up"
                                        onChangeText={
                                            (value) => {
                                                this.setState({
                                                    upBorder: value
                                                });
                                            }
                                        }
                                    />
                                </Item>
                            </Form>
                        </Container>
                        <Container style={styles.containerFlag}>
                            <Thumbnail small source={{uri: state.params.country}}/>
                            <Text>{state.params.currency}</Text>
                        </Container>
                    </Container>
                    <Container style={styles.buttonContainer}>
                        <Button onPress={() => {
                            let time = new Date().toLocaleString();
                            this.setState({data:time});
                            this.addToStorage(state);
                            Keyboard.dismiss();
                            this.dropdown.alertWithType('info', 'Saved', "All saved");
                        }
                        } title="Enter"/>
                    </Container>
                </Container>
            );
        }
        catch (error) {
        }
    }
    render() {
        const {state} = this.props.navigation;
        return (
                <Container>
                    {this.check(state)}
                    <DropdownAlert
                        ref={(ref) => this.dropdown = ref}
                        infoColor="silver"
                    />
                </Container>
        );
    }
}
let styles = StyleSheet.create({
    buttonStyle:{
        marginTop:10
    },
    formStyle:{
        padding:10
    },
    textStyle:{
        textAlign:'center',
        marginTop:5,
        color:'silver',
        fontSize:12
    },
    toolbar: {
        height: 56,
        backgroundColor: '#4883da',
    },
    mainContainer:{
        flexDirection:'row',
        flex:1
    },
    buttonContainer:{
        flex:2
    },
    containerForm:{
        flex:3
    },
    containerFlag:{
        flex:1,
        alignItems:'center',
        marginTop:30
    }
});
export default AppCurrent;