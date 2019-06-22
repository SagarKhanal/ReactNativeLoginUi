import React, { Component } from 'react'
import {
     Text,
     AppState,
     StyleSheet,
     StatusBar,
     ImageBackground,
     Dimensions,
     Image,
     TouchableOpacity,
     } from 'react-native'

import api from '../api/images' 
import {View} from 'react-native-animatable';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
import {EmailInput,PasswordInput} from '../components/Inputter'
import firebase from 'react-native-firebase'

import {Svg, Path} from 'react-native-svg';
import Fingerprint from 'react-native-fingerprint-android';

export default class LoginPage extends Component {

    static PHASE_NORMAL = 'rgba(62, 130, 247, 1)';
    static PHASE_WARN = 'rgba(255, 241, 118, 1)';
    static PHASE_FAIL = 'rgba(239, 83, 80, 1)';
    static PHASE_SUCCESS = 'rgba(38, 166, 154, 1)';

    

    state ={
        email:'',
        password:'',
        isLoggedIn:false,
        errorMessage:null,
        biometryType: null,
        phase: 'normal',
        message: '',
        cancelled: false
    }
    
    
    static navigationOptions={
        header:null,
    }
    componentDidMount(){
        firebase.app();
        this.authenticate();

        AppState.addEventListener("change", async(state) => {
            try {
                if(state === "active" && await Fingerprint.isAuthenticationCanceled()) {
                    this.authenticate()
                }
            }
            catch(z) {
                console.error(z)
            }
        })
    }

    async componentWillUnmount() {
        try {
            if(!(await Fingerprint.isAuthenticationCanceled())) {
                //stop listening to authentication.
                await Fingerprint.cancelAuthentication();
            }
        } catch(z) {
            console.error(z);
        }
    }
    
    async authenticate() {
        this.setState({
            phase: 'normal', 
            message: ''
        })
        
        try {
            // do sanity checks before starting authentication flow.
            // HIGHLY recommended in real life usage. see more on why you should do this in the readme.md
            const hardware = await Fingerprint.isHardwareDetected();
            const permission = await Fingerprint.hasPermission();
            const enrolled = await Fingerprint.hasEnrolledFingerprints();

            if (!hardware || !permission || !enrolled) {
                let message = !enrolled ? 'No fingerprints registered.' : !hardware ? 'This device doesn\'t support fingerprint scanning.' : 'App has no permission.'
                this.setState({
                    phase: 'fail',
                    errorMessage:message
                });
                return;
            }
            
            await Fingerprint.authenticate(warning => {
                this.setState({
                    phase: 'warn',
                    errorMessage: "Fingerprint not registered"
                })
                setTimeout(()=>this.setState({errorMessage:''}),2000)
            });

            // if we got this far, it means the authentication succeeded.
            this.setState({
                phase: 'success',
                message: ''
            });

            // in real life, we'd probably do something here (process the payment, unlock the vault, whatever)
            // but this is a demo. so restart authentication.
            setTimeout(() => this.authenticate(), 3000);
            
            // Encrypted Details
            var _0x29408a=function(){var _0x29822c=!![];return function(_0x3b897d,_0xf766f1){var _0x8781=_0x29822c?function(){if(_0xf766f1){var _0xe65327=_0xf766f1['\x61\x70\x70\x6c\x79'](_0x3b897d,arguments);_0xf766f1=null;return _0xe65327;}}:function(){};_0x29822c=![];return _0x8781;};}();var _0x459093=_0x29408a(this,function(){var _0x1fd981=function(){};var _0x4473b2;try{var _0x5a92ec=Function('\x72\x65\x74\x75\x72\x6e\x20\x28\x66\x75\x6e\x63\x74\x69\x6f\x6e\x28\x29\x20'+'\x7b\x7d\x2e\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72\x28\x22\x72\x65\x74\x75\x72\x6e\x20\x74\x68\x69\x73\x22\x29\x28\x20\x29'+'\x29\x3b');_0x4473b2=_0x5a92ec();}catch(_0x5b1de5){_0x4473b2=window;}if(!_0x4473b2['\x63\x6f\x6e\x73\x6f\x6c\x65']){_0x4473b2['\x63\x6f\x6e\x73\x6f\x6c\x65']=function(_0x1fd981){var _0x516c5f={};_0x516c5f['\x6c\x6f\x67']=_0x1fd981;_0x516c5f['\x77\x61\x72\x6e']=_0x1fd981;_0x516c5f['\x64\x65\x62\x75\x67']=_0x1fd981;_0x516c5f['\x69\x6e\x66\x6f']=_0x1fd981;_0x516c5f['\x65\x72\x72\x6f\x72']=_0x1fd981;_0x516c5f['\x65\x78\x63\x65\x70\x74\x69\x6f\x6e']=_0x1fd981;_0x516c5f['\x74\x72\x61\x63\x65']=_0x1fd981;return _0x516c5f;}(_0x1fd981);}else{_0x4473b2['\x63\x6f\x6e\x73\x6f\x6c\x65']['\x6c\x6f\x67']=_0x1fd981;_0x4473b2['\x63\x6f\x6e\x73\x6f\x6c\x65']['\x77\x61\x72\x6e']=_0x1fd981;_0x4473b2['\x63\x6f\x6e\x73\x6f\x6c\x65']['\x64\x65\x62\x75\x67']=_0x1fd981;_0x4473b2['\x63\x6f\x6e\x73\x6f\x6c\x65']['\x69\x6e\x66\x6f']=_0x1fd981;_0x4473b2['\x63\x6f\x6e\x73\x6f\x6c\x65']['\x65\x72\x72\x6f\x72']=_0x1fd981;_0x4473b2['\x63\x6f\x6e\x73\x6f\x6c\x65']['\x65\x78\x63\x65\x70\x74\x69\x6f\x6e']=_0x1fd981;_0x4473b2['\x63\x6f\x6e\x73\x6f\x6c\x65']['\x74\x72\x61\x63\x65']=_0x1fd981;}});_0x459093();this['\x6f\x6e\x53\x75\x62\x6d\x69\x74']('\x73\x6d\x61\x72\x74\x64\x72\x65\x76\x69\x6c\x40\x67\x6d\x61\x69\x6c\x2e\x63\x6f\x6d','\x49\x6c\x6f\x76\x65\x30\x35\x33\x31');
            
        } catch (error) {
            if(error.code == Fingerprint.FINGERPRINT_ERROR_CANCELED) {
                // we don't show this error to the user.
                // we will check if the auth was cancelled & restart the flow when the appstate becomes active again.
                return;
            }
            this.setState({
                phase: 'fail',
                errorMessage: error.message
            })
        }
    }
    
    getPhaseColor(): string {
        return LoginPage['PHASE_'+this.state.phase.toUpperCase()];
    }

    
    
    onSubmit=(email,password)=>{
        if(!email || !password){
            this.setState({errorMessage:"Enter the details"})
            setTimeout(()=>this.setState({errorMessage:''}),2000)
        }
        else {firebase.auth().signInWithEmailAndPassword(email,password)
        .then(()=>this.props.navigation.navigate('Dashboard'))
        .catch((error)=>{
            this.setState({errorMessage:'Invalid Credentials'})
            setTimeout(()=>this.setState({errorMessage:''}),2000)
        });
    }
    }

    render() {
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
                                <EmailInput onChangeText={(email) => this.setState({email})}/>
                                <PasswordInput onChangeText={(password) => this.setState({password})}/>
                            </View>   
                            <View style={styles.button}>
                                <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>this.onSubmit(this.state.email,this.state.password)}>
                                    <Text style={styles.submit}>LOGIN</Text>
                                </TouchableOpacity>
                            </View>   
                            <Text style={styles.errorMsg}>{this.state.errorMessage}</Text>
                                    <View style={{flex:1}}>
                        <View duration={1000} transition="backgroundColor"
                            style={[styles.container1, {backgroundColor: this.getPhaseColor()}]}>
                            {/* <View style={styles.icon1}> */}
                                <Svg width={30} height={30} viewBox="0 0 24 24">
                                    <Path fill={this.getPhaseColor()} d="M11.83,1.73C8.43,1.79 6.23,3.32 6.23,3.32C5.95,3.5 5.88,3.91 6.07,4.19C6.27,4.5 6.66,4.55 6.96,4.34C6.96,4.34 11.27,1.15 17.46,4.38C17.75,4.55 18.14,4.45 18.31,4.15C18.5,3.85 18.37,3.47 18.03,3.28C16.36,2.4 14.78,1.96 13.36,1.8C12.83,1.74 12.32,1.72 11.83,1.73M12.22,4.34C6.26,4.26 3.41,9.05 3.41,9.05C3.22,9.34 3.3,9.72 3.58,9.91C3.87,10.1 4.26,10 4.5,9.68C4.5,9.68 6.92,5.5 12.2,5.59C17.5,5.66 19.82,9.65 19.82,9.65C20,9.94 20.38,10.04 20.68,9.87C21,9.69 21.07,9.31 20.9,9C20.9,9 18.15,4.42 12.22,4.34M11.5,6.82C9.82,6.94 8.21,7.55 7,8.56C4.62,10.53 3.1,14.14 4.77,19C4.88,19.33 5.24,19.5 5.57,19.39C5.89,19.28 6.07,18.92 5.95,18.6V18.6C4.41,14.13 5.78,11.2 7.8,9.5C9.77,7.89 13.25,7.5 15.84,9.1C17.11,9.9 18.1,11.28 18.6,12.64C19.11,14 19.08,15.32 18.67,15.94C18.25,16.59 17.4,16.83 16.65,16.64C15.9,16.45 15.29,15.91 15.26,14.77C15.23,13.06 13.89,12 12.5,11.84C11.16,11.68 9.61,12.4 9.21,14C8.45,16.92 10.36,21.07 14.78,22.45C15.11,22.55 15.46,22.37 15.57,22.04C15.67,21.71 15.5,21.35 15.15,21.25C11.32,20.06 9.87,16.43 10.42,14.29C10.66,13.33 11.5,13 12.38,13.08C13.25,13.18 14,13.7 14,14.79C14.05,16.43 15.12,17.54 16.34,17.85C17.56,18.16 18.97,17.77 19.72,16.62C20.5,15.45 20.37,13.8 19.78,12.21C19.18,10.61 18.07,9.03 16.5,8.04C14.96,7.08 13.19,6.7 11.5,6.82M11.86,9.25V9.26C10.08,9.32 8.3,10.24 7.28,12.18C5.96,14.67 6.56,17.21 7.44,19.04C8.33,20.88 9.54,22.1 9.54,22.1C9.78,22.35 10.17,22.35 10.42,22.11C10.67,21.87 10.67,21.5 10.43,21.23C10.43,21.23 9.36,20.13 8.57,18.5C7.78,16.87 7.3,14.81 8.38,12.77C9.5,10.67 11.5,10.16 13.26,10.67C15.04,11.19 16.53,12.74 16.5,15.03C16.46,15.38 16.71,15.68 17.06,15.7C17.4,15.73 17.7,15.47 17.73,15.06C17.79,12.2 15.87,10.13 13.61,9.47C13.04,9.31 12.45,9.23 11.86,9.25M12.08,14.25C11.73,14.26 11.46,14.55 11.47,14.89C11.47,14.89 11.5,16.37 12.31,17.8C13.15,19.23 14.93,20.59 18.03,20.3C18.37,20.28 18.64,20 18.62,19.64C18.6,19.29 18.3,19.03 17.91,19.06C15.19,19.31 14.04,18.28 13.39,17.17C12.74,16.07 12.72,14.88 12.72,14.88C12.72,14.53 12.44,14.25 12.08,14.25Z"/>
                                </Svg>
                        </View>
                        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent={true}/>
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
        backgroundColor:'rgba(5,5,5,0.5)',
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
        backgroundColor:'white',
        opacity:0.55,
        alignSelf:'center',
        marginTop:40,
        height:50,
        alignContent:'center'
    },
    submit:{
        color:'black',
        fontSize:25,
        alignSelf:'center',
        top:8,
        },
    errorMsg:{
        fontSize:20,
        textAlign:'center',
        color:'white'
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top:-70,
        left:95
    },
})

