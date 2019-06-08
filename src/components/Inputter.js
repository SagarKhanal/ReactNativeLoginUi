import React from 'react'
import {
    StyleSheet,
    TextInput,
    Dimensions
} from 'react-native'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
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
})


const EmailInput = (props)=>{
    return (
    <TextInput placeholderTextColor="white"
                style={styles.input}
                placeholder="USERNAME"
                autoCorrect={false}
                spellCheck={false}
                autoFocus={true}
                blurOnSubmit={false}
                autoCapitalize="none"
                keyboardAppearance="light"
                returnKeyType="next"
                onSubmitEditing={this._focusNext}
                textContentType="emailAddress"
                onChangeText={props.onChangeText}
            />)
}

const PasswordInput=(props)=>{
    return(
     <TextInput placeholderTextColor="white"
                placeholder="PASSWORD"
                style={styles.input}
                blurOnSubmit={false}
                keyboardAppearance="light"
                returnKeyType="next"
                onSubmitEditing={this._focusNext}
                autoCorrect={false}
                spellCheck={false}   
                textContentType='password'
                secureTextEntry
                onChangeText={props.onChangeText}
            />)
}

export {EmailInput,PasswordInput};