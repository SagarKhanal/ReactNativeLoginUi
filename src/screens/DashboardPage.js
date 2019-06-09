import React, { Component } from 'react'
import { Text,Dimensions, Image,View, StyleSheet, FlatList,StatusBar,ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import api from '../api/images'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


const images ={
    "data":[
        "https://images.unsplash.com/photo-1519895609939-d2a6491c1196",
       "https://images.unsplash.com/photo-1510227272981-87123e259b17",
        "https://images.unsplash.com/photo-1510633616729-b6c0fcabe9f0",
        "https://images.unsplash.com/photo-1500521680613-a8f77c5cd0f5",
        "https://images.unsplash.com/photo-1518675970634-bdd3fe443f52",
        "https://images.unsplash.com/photo-1519895609939-d2a6491c1196",
       "https://images.unsplash.com/photo-1510227272981-87123e259b17",
        "https://images.unsplash.com/photo-1510633616729-b6c0fcabe9f0",
        "https://images.unsplash.com/photo-1500521680613-a8f77c5cd0f5",
        "https://images.unsplash.com/photo-1518675970634-bdd3fe443f52",
        "https://images.unsplash.com/photo-1518675970634-bdd3fe443f52",
        "https://images.unsplash.com/photo-1519895609939-d2a6491c1196",
       "https://images.unsplash.com/photo-1510227272981-87123e259b17",
       "https://images.unsplash.com/photo-1510227272981-87123e259b17",
       "https://images.unsplash.com/photo-1510227272981-87123e259b17",
        "https://images.unsplash.com/photo-1510633616729-b6c0fcabe9f0",
        "https://images.unsplash.com/photo-1500521680613-a8f77c5cd0f5",
        "https://images.unsplash.com/photo-1518675970634-bdd3fe443f52",
    ]
}


export default class DashboardPage extends Component {


    state = {
        dataSource: {},
    }

    componentDidMount() {
        var that = this;
        let items = Array.apply(null, Array(10)).map((v, i) => {
          return { id: i, src: images.data[i] };
        });
        that.setState({
          //Setting the data source
          dataSource: items,
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
    headerRight : <Icon.Button name="sign-out-alt" size={35} color="white" style={{right:5,}} onPress={()=>{
        alert("Working on it now")
    }} />
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
                    <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                    </View>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index}
                />
                    </View>
                </View>
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
        margin:4
      },
})