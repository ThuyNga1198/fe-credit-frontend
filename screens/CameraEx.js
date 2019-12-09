import React from 'react';
// import { StyleSheet, Text, View ,TouchableOpacity,Platform, Image} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
// import {Camera, Permission} from 'expo';
// import Constants from 'expo-constants';
// import { Header, Left,Item, Icon} from 'native-base';



import { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Expo, { Constants,  MediaLibrary } from 'expo';

export default class CameraEx extends Component {
  state = {
    rollGranted: false,
    cameraGranted: false,
  };

  componentDidMount() {
    this.getCameraPermissions();
  }

  async getCameraPermissions() {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      this.setState({ cameraGranted: true });
    } else {
      this.setState({ cameraGranted: false });
      console.log('Uh oh! The user has not granted us permission.');
    }
    this.getCameraRollPermissions();
  }

  async getCameraRollPermissions() {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.setState({ rollGranted: true });
    } else {
      console.log('Uh oh! The user has not granted us permission.');
      this.setState({ rollGranted: false });
    }
  }

  takePictureAndCreateAlbum = async () => {
    console.log('tpaca');
    const { uri } = await this.camera.takePictureAsync();
    console.log('uri', uri);
    const asset = await MediaLibrary.createAssetAsync(uri);
    console.log('asset', asset);
    MediaLibrary.createAlbumAsync('Expo', asset)
      .then(() => {
        Alert.alert('Album created!')
      })
      .catch(error => {
        Alert.alert('An Error Occurred!')
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Camera
          type={Camera.Constants.Type.back}
          style={{ flex: 1 }}
          ref={ref => {
            this.camera = ref;
          }}
        />
        <TouchableOpacity
          onPress={() =>
            this.state.rollGranted && this.state.cameraGranted
              ? this.takePictureAndCreateAlbum()
              : Alert.alert('Permissions not granted')
          }
          style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Snap
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    width: 200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});























// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View,TextInput,Image,TouchableOpacity, ImageBackground,AppRegistry,Navigator,Dimensions,ScrollView} from 'react-native';
// import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import axios from "axios";
// import ImagePicker from 'react-native-image-picker';


// import styles from './style';
// import {avatarDefault} from 'img';


// const iconUser =()=> (<Icon name="user" size={25} color="#B81033" />);
// const options = {
//     title: 'Select Avatar',
//     customButtons: [],
//     storageOptions: {
//       skipBackup: true,
//       path: 'images',
//     },
// };

// export default class CameraEx extends Component {
//     constructor() {
//         super();
//         // this.state = {};
//     }

//     updateAvatar() {
//         if (this.props.userInfo == null) return;
//         ImagePicker.showImagePicker(options, (response) => {
//             console.log('Response = ', response);
          
//             if (response.didCancel) {
//               console.log('User cancelled image picker');
//             } else if (response.error) {
//               console.log('ImagePicker Error: ', response.error);
//               alert("Image error");
//             } else {
//             //   const source = { uri: response.uri };
//                 let data = new FormData();
//                 data.append('file', {
//                     uri: response.uri,
//                     type: 'image/jpeg',
//                     name: 'cmnd'
//                 })
//               // You can also display the image using data:
//               // const source = { uri: 'data:image/jpeg;base64,' + response.data };
//                 axios.put('http://192.168.1.7:8000/detect-text', data, {
//                     headers: {
//                         Token: this.props.token
//                     }
//                 }).then(response=>{
//                     this.props.updateAvatar(response.data.avatarUrl);
//                 }).catch(responseError =>{
//                     alert("Can't change avatar !!!");
//                 })
//             }
//         });
//     }
//     render(){
//         return (
//             <ImageBackground source={null} style={styles.body}>
//                 <View style={styles.avatar}>
//                     <View style={styles.avatar_img}>
//                         <TouchableOpacity style={styles.avatar_img_btn} onPress={()=>this.updateAvatar()}>
                           
//                         </TouchableOpacity>
//                     </View>

//                 </View>
//               >
//             </ImageBackground>
//         );

//     }
// };

















// class CameraEx extends React.Component {
  
//   state = {
//     hasCameraPermission: null,
//     type: Camera.Constants.Type.back
//   }

//   async componentWillMount() {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({ hasCameraPermission: status === 'granted' })
//   }

//   async snapPhoto() {       
//     console.log('Button Pressed');
//     if (this.camera) {
//        console.log('Taking photo');
//        const options = { quality: 1, base64: true, fixOrientation: true, 
//        exif: true};
//        await this.camera.takePictureAsync(options).then(photo => {
//           photo.exif.Orientation = 1;            
//            console.log(photo);            
//            });     
//      }
//     }

//   render() {
//     const styles = StyleSheet.create({
//       container: {
//          flex: 1,
//          justifyContent: "center",
//          alignItems: "center"
     
//     }})

//     const { hasCameraPermission } = this.state

//     if (hasCameraPermission === null) {
//       return <View />
//     }
//     else if (hasCameraPermission === false) {
//       return <Text> No access to camera</Text>
//     }
//     else {
//       return (
//         <View style={{ flex: 1 }}>
//           <Camera 
//             style={{ flex: 1, justifyContent: 'space-between' }}
//             type={this.state.type}
//           >
//             <Header
//               searchBar
//               rounded
//               style={{
//                 position: 'absolute',
//                 backgroundColor: 'transparent',
//                 left: 0,
//                 top: 0,
//                 right: 0,
//                 zIndex: 100,
//                 alignItems: 'center'
//               }}
//             >
//               <View style={{ flexDirection: 'row', flex: 4 }}>
//                 <Ionicons name="md-camera" style={{ color: 'white' }} />
//                 <Item style={{ backgroundColor: 'transparent' }}>
//                   <Icon name="ios-search" style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}></Icon>
//                 </Item>
//               </View>

//               <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around' }}>
//                 <Icon name="ios-flash" style={{ color: 'white', fontWeight: 'bold' }} />
//                 <Icon
//                   onPress={() => {
//                     this.setState({
//                       type: this.state.type === Camera.Constants.Type.back ?                                        
//                                             Camera.Constants.Type.front :
//                                             Camera.Constants.Type.back
//                     })
//                   }}
//                   name="ios-reverse-camera"
//                   style={{ color: 'white', fontWeight: 'bold' }}
//                 />

//                 <TouchableOpacity style={styles.captureButton} onPress={this.snapPhoto.bind(this)}>
//                                 <Image style={{width: 100, height: 100}} source={require('../assets/images/icon.png')}          
//                                 />
//                             </TouchableOpacity>
//               </View>
//             </Header>

//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginBottom: 15, alignItems: 'flex-end' }}>
//               <Ionicons name="ios-map" style={{ color: 'white', fontSize: 36 }}></Ionicons>
//               <View></View>
//               <View style={{ alignItems: 'center' }}>
//                 <MaterialCommunityIcons name="circle-outline"   // This is the icon which should take and save image
//                   style={{ color: 'white', fontSize: 100 }}
//                 ></MaterialCommunityIcons>
//                 <Icon name="ios-images" style={{ color: 'white', fontSize: 36 }} />
//               </View>
//             </View>
//           </Camera>
//         </View>
//       )
//     }
//   }
// }

// export default CameraEx;























// export default class CameraEx extends React.Component{
//   state={
//     hasCameraPermission:null,
//     type: Camera.Type.back,
//   };

//   async componentDidMount(){
//     const {status}=await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({hasCameraPermission: status === 'granted'});
//   }

//   render(){
//     const {hasCameraPermission}=this.state;
//     if (hasCameraPermission===null){
//       return <View />;
//     } else if (hasCameraPermission===false){
//       return <Text>No access to camera</Text>;
//     } else {
//       return(
//         <View style={{fles:1}}> 
//           <Camera style={{flex:1}} type={this.state.type}>
//             <View 
//             style={{
//               flex:1,
//               backgroundColor:'transparent',
//               flexDirection:'row',
//             }}>
//               <TouchableOpacity
//               style={{
//                 flex:0.1,
//                 alignSelf:'flex-end',
//                 alignItems:'center',
//               }}
//               onPress={()=>{
//                 this.setState({
//                   type: this.state.type===Camera.Constants.Type.back
//                     ? Camera.Constants.Type.front
//                     : Camera.Constants.Type.back,
//                 });
//               }}>
//                 <Text
//                 style={{ fontSize:18,marginBottom:10,color:'white'}}>
//                   {' '}Flip{' '}

//                 </Text>

//               </TouchableOpacity>

//             </View>
//           </Camera>
//         </View>
//       );
//     }
//   }
// }



























// export default class App extends React.Component {
//   state = {
//     hasPermission: null,
//     cameraType: Camera.Constants.Type.back,
//   }

//   async componentDidMount() {
//     this.getPermissionAsync()
//   }

//   getPermissionAsync = async () => {
//     // Camera roll Permission
//     if (Platform.OS === 'ios') {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
//     }
//     // Camera Permission
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({ hasPermission: status === 'granted' });
//   }

//   handleCameraType=()=>{
//     const { cameraType } = this.state

//     this.setState({cameraType:
//       cameraType === Camera.Constants.Type.back
//       ? Camera.Constants.Type.front
//       : Camera.Constants.Type.back
//     })
//   }

//   takePicture = async () => {
//     if (this.camera) {
//       let photo = await this.camera.takePictureAsync();

//     }
//   }

//   pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images
//     });
//   }


//   render(){
//     const { hasPermission } = this.state
//     if (hasPermission === null) {
//       return <View />;
//     } else if (hasPermission === false) {
//       return <Text>No access to camera</Text>;
//     } else {
//       return (
//           <View style={{ flex: 1 }}>
//             <Camera style={{ flex: 1 }} type={this.state.cameraType}  ref={ref => {this.camera = ref}}>
//               <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:30}}>
//                 <TouchableOpacity
//                   style={{
//                     alignSelf: 'flex-end',
//                     alignItems: 'center',
//                     backgroundColor: 'transparent'
//                   }}
//                   onPress={()=>this.pickImage()}>
//                   <Ionicons
//                       name="ios-photos"
//                       style={{ color: "#fff", fontSize: 40}}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={{
//                     alignSelf: 'flex-end',
//                     alignItems: 'center',
//                     backgroundColor: 'transparent',
//                   }}
//                   onPress={()=>this.takePicture()}
//                   >
//                   <FontAwesome
//                       name="camera"
//                       style={{ color: "#fff", fontSize: 40}}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={{
//                     alignSelf: 'flex-end',
//                     alignItems: 'center',
//                     backgroundColor: 'transparent',
//                   }}
//                   onPress={()=>this.handleCameraType()}
//                   >
//                   <MaterialCommunityIcons
//                       name="camera-switch"
//                       style={{ color: "#fff", fontSize: 40}}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </Camera>
//         </View>
//       );
//     }
//   }

// }