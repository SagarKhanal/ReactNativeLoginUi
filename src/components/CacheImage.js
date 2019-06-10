import React, { Component } from 'react'
import {Dimensions} from 'react-native'
import {CachedImage} from 'react-native-cached-image'


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
