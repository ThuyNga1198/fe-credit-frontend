import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}












// import React from 'react';
// import { View, Text,TouchableOpacity,Image,Button,ImageBackground } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as Permissions from 'expo-permissions';
// import styles from './style';
// import Toolbar from './toolbar';
// import Gallery from './gallery';
// import BarcodeMask from 'react-native-barcode-mask';

// export default class CameraPage extends React.PureComponent  {
//     camera = null;
//     image=null;

//     state = {
//         captures: [],
//         capturing: null,
//         hasCameraPermission: null,
//         cameraType: Camera.Constants.Type.back,
//         flashMode: Camera.Constants.FlashMode.off,
//     };   

//     async snapPhoto() {       
//         if (this.camera) {
//            console.log('Taking photo');
//            const options = { quality: 1, base64: true, fixOrientation: true, 
//            exif: true};
//            await this.camera.takePictureAsync(options).then(photo => {
//                 photo.exif.Orientation = -1;  
//                 image=photo;                      
//                });     
//          }

//         const { imageUri } = this.state;

//         //  if (image){
//           //  return <ImageBackground source={image}/>
//         //  }
//         }

//     getDataUsingPost(){
//         var dataToSend = {demo:image.base64};
//         //making data to send on server
//         var formBody = [];
//         for (var key in dataToSend) {
//           var encodedKey = encodeURIComponent(key);
//           var encodedValue = encodeURIComponent(dataToSend[key]);
//           formBody.push(encodedKey + "=" + encodedValue);
//         }
//         formBody = formBody.join("&");
//         //POST request 
//         fetch('http://192.168.1.7:8000/test', {
//           method: "POST",//Request Type 
//           body: formBody,//post body 
//           headers: {//Header Defination 
//             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//           },
//         })
//         .then((response) => response.json())
//         //If response is in json then in success
//         .then((responseJson) => {
//             // alert(JSON.stringify(responseJson));
//             console.log(responseJson);
//         })
//         //If response is not in json then in error
//         .catch((error) => {
//           alert(JSON.stringify(error));
//           console.error(error);
//         });
//       }

//     setFlashMode = (flashMode) => this.setState({ flashMode });
//     setCameraType = (cameraType) => this.setState({ cameraType });
//     handleCaptureIn = () => this.setState({ capturing: true });

//     handleCaptureOut = () => {
//         if (this.state.capturing)
//             this.camera.stopRecording();
//     };

//     handleShortCapture = async () => {
//         const photoData = await this.camera.takePictureAsync();
//         this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
//     };



//     async componentDidMount() {
//         const camera = await Permissions.askAsync(Permissions.CAMERA);
//         const hasCameraPermission = (camera.status === 'granted');

//         this.setState({ hasCameraPermission });
//     };

//     async takePicture(){
//       const { uri } = await this.camera.takePictureAsync();
//       this.setState({ imageUri: uri });
//     }

//     render() {
//         const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;
 
//         if (hasCameraPermission === null) {
//             return <View />;
//         } else if (hasCameraPermission === false) {
//             return <Text>Access to camera has been denied.</Text>;
//         }
//         const { imageUri } = this.state;

//         if (imageUri){
//           return <ImageBackground source={imageUri}/>
//         }

//         return (
//              <React.Fragment>







//       <View>
//                     <Camera
//                         type={cameraType}
//                         flashMode={flashMode}
//                         style={styles.preview}
//                         ref={camera => this.camera = camera}
//                     />
//                 </View>

//                 //{captures.length > 0 && <Gllery captures={captures}/>}

//      <Toolbar 
//                     capturing={capturing}
//                     flashMode={flashMode}
//                     cameraType={cameraType}
//                     setFlashMode={this.setFlashMode}
//                     setCameraType={this.setCameraType}
//                     onCaptureIn={this.handleCaptureIn}
//                     onCaptureOut={this.handleCaptureOut}
//                     onLongCapture={this.handleLongCapture}
//                     onShortCapture={this.handleShortCapture}
//                 />

























//                 {/* <Camera 
//                           type={cameraType}
//                         flashMode={flashMode}
//                         style={styles.preview}
//                         ref={camera => this.camera = camera}>
//                 </Camera>

//                 <TouchableOpacity style={styles.captureButton} onPress={this.snapPhoto.bind(this)}>
//                     <View style={styles.container}>
                    
//                     {/* <Image style={{width:60, height: 60}} source={require('../assets/icon.jpg')}          
//                     /> *
                    
//      <Toolbar 
//                     capturing={capturing}
//                     flashMode={flashMode}
//                     cameraType={cameraType}
//                     setFlashMode={this.setFlashMode}
//                     setCameraType={this.setCameraType}
//                     onCaptureIn={this.handleCaptureIn}
//                     onCaptureOut={this.handleCaptureOut}
//                     onLongCapture={this.handleLongCapture}
//                     onShortCapture={this.handleShortCapture}
//                 />

//                     </View>
//                 </TouchableOpacity>
//                     <Button onPress={this.getDataUsingPost} title="Post">
//                     style={{backgroundColor: "#06566e", justifyContent: 'center', alignItems: 'center', flex: 1}}>
//                   </Button> */}
//             </React.Fragment>  
//         );
//     }
// }


