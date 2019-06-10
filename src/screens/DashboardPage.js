import React, { Component } from 'react'
import { Dimensions,View,StyleSheet,FlatList,ImageBackground,TouchableOpacity, RefreshControl,Modal } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome5'
import api from '../api/images'

// import Video from 'react-native-video'

import CacheImage from '../components/CacheImage'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


export default class DashboardPage extends Component {


    state = {
        dataSource: {},
        refreshing: false,
        visible:false,
        temp:''
    }

    componentDidMount() {
        this.fetchData()
      }

      _onRefresh = () => {
        this.setState({refreshing: true});
        this.fetchData()
      }

    fetchData=()=>{
        var that = this;
        let items = Array.apply(null, Array(api.images.length)).map((v, i) => {
        const j = parseInt((Math.random() * api.images.length), 10)
          return { id: j, src: api.images[j].url };
        });
        that.setState({
          //Setting the data source
          dataSource: items,
          refreshing:false,
          pause:true
        });
    }

    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#000000',
            opacity:0.9,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
    }

    setModalVisible(visible,item) {
        this.setState({visible: visible,temp:item});
      }
    

    render() {
        return (
            <ImageBackground source={{uri:api.data.darkportrait}} style={styles.imgBgnd}>
                <View style={styles.container}>
                    <View style={styles.gridWrapper}>
                        <FlatList
                        scrollIndicatorInsets={false}
                data={this.state.dataSource}
                renderItem={({ item }) => (
                    <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                   
                    <TouchableOpacity activeOpacity={0} onPress={()=>this.setModalVisible(true,item.src)}>
                    <CacheImage style={styles.imageThumbnail} source={{ uri: item.src }} />
                    </TouchableOpacity>
                    </View>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index}
                refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                    />
                  }
                />
                    </View>
                </View>
                <Modal visible={this.state.visible} transparent animationType='fade' onRequestClose={()=>this.setModalVisible(false)}>
            <CacheImage style={{width:width,height:height}} source={{uri:this.state.temp}}/>
            </Modal>
            </ImageBackground>
        )
    }
}



const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(52, 52, 52, 0.55)',
        flex:1
    },
    imgBgnd:{
        height:height,
        width:width,
    },
    gridWrapper:{
        margin:10,
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 190,
        margin:4,
        // opacity:0.6,
      },
})