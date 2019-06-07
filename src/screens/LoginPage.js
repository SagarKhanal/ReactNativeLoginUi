import React, { Component } from 'react'
import {
     Text,
     View,
     StyleSheet,
     StatusBar,
     ImageBackground,
     Dimensions,
     Image,
     TextInput,
     TouchableOpacity
     } from 'react-native'

import api from '../api/images' 

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default class LoginPage extends Component {
    
    static navigationOptions={
        header:null,
    }

    render() {
        state ={
            username:'',
            password:'',
            isLoggedIn:false,
        }

        onSubmit=()=>{

        }

        return (
            <ImageBackground style={styles.imgBgnd} source={{uri:api.data.background}}>
                <StatusBar hidden/>
                    <View style={styles.mainContainer}>
                        <View style={styles.container}>
                            <Text style={styles.txtStyle}>“Photography helps people to see.”</Text>
                        </View>
                        <Image style={styles.logo} source={{uri:api.data.logo}}/>
                        <View style={styles.formWrapper}>
                            <View style={styles.inputWrapper}>
                                <TextInput placeholderTextColor="white"
                                           style={styles.input}
                                           placeholder="USERNAME"
                                           autoCorrect={false}
                                           spellCheck={false}                                           textContentType="username"
                                           onChangeText={(username)=>this.setState({username})}
                                        />
                                <TextInput placeholderTextColor="white"
                                           placeholder="PASSWORD"
                                           style={styles.input}
                                           autoCorrect={false}
                                           spellCheck={false}   
                                           textContentType='password'
                                           secureTextEntry
                                           onChangeText={(username)=>this.setState({username})}
                                        />
                            </View>   
                            <View style={styles.button}>
                                <TouchableOpacity style={{alignSelf:'center'}}>
                                    <Text style={styles.submit}>LOGIN</Text>
                                </TouchableOpacity>
                            </View>    
                        </View>
                    </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'rgba(5,5,5,0.5)'
    },
    container:{
        backgroundColor: 'rgba(129, 190, 52, 0.8)',
    },
    imgBgnd:{
        height:height,
        width:width,
    },
    txtStyle:{
        alignSelf:'center',
        fontStyle:'italic',
        fontWeight:'bold'
    },
    logo:{
        marginTop:20,
        height:150,
        width:150,
        alignSelf:'center'

    },
    input:{
        borderWidth:1,
        borderRadius:25,
        width:width/2+100,
        borderColor:'teal',
        marginBottom:18,
        color:'white',
        backgroundColor:'rgba(252,228,236,0.1)',
        textAlign:'center',
        fontSize:22
    },
    inputWrapper:{
        left:40,
        top:30,
    },
    button:{
        borderWidth:1,
        borderRadius:25,
        width:width/2+100,
        borderColor:'teal',
        marginBottom:18,
        backgroundColor:'#6b9b37',
        alignSelf:'center',
        marginTop:40,
        height:50,
        alignContent:'center'
    },
    submit:{
        color:'black',
        fontSize:15,
        alignSelf:'center',
        top:8,
        fontSize:22
    }
})

