import React, { Component } from 'react'
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
