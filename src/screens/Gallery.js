import React, { Component } from 'react'
import { CameraRoll,PermissionsAndroid,View, TouchableOpacity,ActivityIndicator,TouchableWithoutFeedback,FlatList,Dimensions,Image,Animated } from 'react-native'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import RNFetchBlob from 'react-native-fetch-blob'
import Share from 'react-native-share'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

//Obfuscated API
var _0xdd3a=["\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x75\x6E\x73\x70\x6C\x61\x73\x68\x2E\x63\x6F\x6D\x2F\x70\x68\x6F\x74\x6F\x73\x2F\x72\x61\x6E\x64\x6F\x6D\x3F\x63\x6F\x75\x6E\x74\x3D\x33\x30\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D\x35\x31\x30\x30\x38\x39\x62\x30\x36\x61\x64\x32\x37\x30\x38\x38\x63\x64\x34\x61\x61\x35\x65\x33\x62\x32\x65\x35\x30\x35\x35\x39\x36\x61\x38\x30\x34\x61\x66\x65\x39\x66\x33\x32\x61\x62\x66\x35\x62\x63\x61\x61\x37\x66\x34\x37\x30\x39\x34\x64\x62\x33\x35\x66"];const apiLink=_0xdd3a[0]



export default class Gallery extends Component {


static navigationOptions={
    header:null
}

state ={
    isLoading:true,
    images:[],
    scale: new Animated.Value(1),
    isImageFocused:false,
}

scale = {
    transform:[{scale:this.state.scale}]
}

actionBarY = this.state.scale.interpolate({
    inputRange:[0.9,1],
    outputRange:[0,-80]
})

borderRadius = this.state.scale.interpolate({
    inputRange:[0.9,1],
    outputRange:[30,-80]
})


componentDidMount(){
    this.loadWallpapers()
}

loadWallpapers=()=>{
    axios.get(apiLink).then((response)=>{
        this.setState({images:response.data,isLoading:false})
    }).catch((err)=>{

    }).finally(()=>{

    })
}

showControls=(item)=>{
    this.setState({
        isImageFocused:!this.state.isImageFocused
    },()=>{
        if(this.state.isImageFocused){
            Animated.spring(this.state.scale,{
                toValue:0.9
            }).start()
        }
        else {
            Animated.spring(this.state.scale,{
                toValue:1
            }).start()
        }
    })
}


saveToGallery= async image=>{
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'My App Storage Permission',
              message: 'My App needs access to your storage ' +
                'so you can save your photos',
            },
          );
          RNFetchBlob.config({
            fileCache:false,
            path:RNFetchBlob.fs.dirs.DCIMDir+"_"+image.id+".jpg"
        })
        .fetch('GET',image.urls.full,{})
        .then((res)=>{
            alert(res.path())
            CameraRoll.saveToCameraRoll(res.path(),"photo");
        })
          return granted;
    } catch (error) {
        console.error('Failed to request permission ', error);
        return null;
    }
}

shareWallpaper=async image=>{
    await this.saveToGallery(image)
    RNFetchBlob.fs.readFile(RNFetchBlob.fs.dirs.DCIMDir+"_"+image.id+".jpg",'base64')
    .then((data)=>{
    Share.open({
        title:'Wallpaper',
        message:'Check out this wallpaper',
        url:`data:image/jpg;base64,${data}`,
        subject:'Check out this photo'
    })
    .then((res) => console.log('res:', res))
    .catch(err => console.log('err', err))
    })
}

renderItem=({item})=>{
    return(
        <View style={{flex:1}}>
        <View style={styles.blackScreenWrapper}>
        <ActivityIndicator size="large" color="orange"/>
        </View>
        <TouchableWithoutFeedback onPress={()=>this.showControls(item)}>
        <Animated.View style={[{height,width},this.scale]}>
            <Animated.Image
                style={{flex:1,height:null,width:null,borderRadius:this.borderRadius}}
                source={{uri:item.urls.regular}}
                resizeMode="cover"
            />
        </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.actionBar,{bottom:this.actionBarY}]}>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>this.loadWallpapers()}>
                <Icon name="circle-o" color="white" size={40}/>
                </TouchableOpacity>
            </View>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>this.saveToGallery(item)}>
                <Icon name="save" color="white" size={40}/>
                </TouchableOpacity>
            </View>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>this.shareWallpaper(item)}>
                <Icon name="share-alt-square" color="white" size={40}/>
                </TouchableOpacity>
            </View>
        </Animated.View>
        </View>
    )
}

    render() {
        return this.state.isLoading?(
            <View style={styles.container}>
                <ActivityIndicator size="large" color="orange"/>
            </View>
        ):
        <View style={styles.container}>
            <FlatList
                scrollEnabled={!this.state.isImageFocused}
                horizontal
                pagingEnabled
                data={this.state.images}
                renderItem={this.renderItem}
                keyExtractor={item=>item.id}
            />
        </View>
    }
}


const styles = {
    container:{
        flex:1,
        backgroundColor:'black',
        alignItems:'center',
        justifyContent:'center'
    },
    blackScreenWrapper:{
        position:'absolute',
        top:0,
        bottom:0,
        right:0,
        left:0,
        backgroundColor:'black',
        alignItems:'center',
        justifyContent:'center'
    },
    actionBar:{
        position:'absolute',
        right:0,
        left:0,
        height:80,
        backgroundColor:'black',
        flexDirection:'row',
        justifyContent:'space-around'
    }
}