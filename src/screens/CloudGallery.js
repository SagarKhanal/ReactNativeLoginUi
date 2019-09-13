import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';


class MultiTap extends Component{
    static defaultProps = {
        onPress:()=>null,
        numberOfTouches = 2
    }

    onResponderRelease=(evt)=>{
        this.props.onPress();
    }

    onStartShouldSetResponder=(evt)=>{
        if(evt.nativeEvent.touches.length===this.props.numberOfTouches){
            return true
        }

        return false
    }

    render() {
        return (
           <View
            onStartShouldSetResponder={this.onStartShouldSetResponder}
            onResponderRelease={this.onResponderRelease}
           >
               {this.props.children}
           </View>
        )
    }
}

export default class CloudGallery extends Component {
    render() {
        return (
            <View style={styles.container} >
                <MultiTap>
                <TouchableOpacity onPress={()=>alert('Double TAP')} numberOfTouches={2}>
                <Text> Here you can add images to cloud </Text>
                </TouchableOpacity>
                </MultiTap>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{

    }
})