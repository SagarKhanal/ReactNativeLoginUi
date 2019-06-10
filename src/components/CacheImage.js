import React, { Component } from 'react'
import {Dimensions} from 'react-native'
import {CachedImage} from 'react-native-cached-image'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

class CacheImage extends Component {
    render() {
        return (
            <CachedImage
                style={this.props.style} 
                source={this.props.source}
                />
        )
    }
}


export default CacheImage;