// Snip
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { StyleSheet, Dimensions,TouchableHighlight,TouchableOpacity, Text } from 'react-native';
import { View, Image } from 'react-native';
import Button from './Button';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import CameraCMND from './cameraCMND';



const Wrapper = styled.View`
  align-self: center;
  justify-content: center;
  background-color: #000;
  flex: 1;
  width: 100%;
  height: 50;
`;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  reverse: {
    position: 'absolute',
    width: 100,
    height: 60,
    borderColor: '#FFF',
    marginBottom: 15,
    right:5,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
});

export default class CameraFace extends React.Component {
  image=null;

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  constructor(props) {
    super(props);
    this.state = {
      path: null,
    };
  }

  takePicture = async () => {
    try {
      const data = await this.camera.takePictureAsync({ base64: true, uri:true });
      this.setState({ path: data.uri });
      image=data.base64;
    } catch (err) {
      console.log('err: ', err);
    }
  };


  
  getDataUsingPost(){
      return (
          <Camera1/>
      );
    var dataToSend = {demo:image};
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //POST request 
    fetch('http://10.10.191.45:8000/test', {
      method: "POST",//Request Type 
      body: formBody,//post body 
      headers: {//Header Defination 
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
        // alert(JSON.stringify(responseJson));
        console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  }


  renderCameraFace() {
    return (
      <Camera
            ref={(cam) => {
            this.camera = cam;
            }}
            style={styles.preview}
            // type = {Camera.Constants.Type.back} 
            type={this.state.type}

            flashMode={Camera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        >

            <TouchableHighlight
                style={styles.capture}
                onPress={this.takePicture.bind(this)}
                underlayColor="rgba(255, 255, 255, 0.5)"
            >
                <View />
            </TouchableHighlight>
        
            <TouchableOpacity
                style={styles.reverse }
                onPress={() => {
                this.setState({
                    type:
                    this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                });
                }}>
                <Ionicons
                    name="md-reverse-camera"
                    color="white"
                    size={30}
                />
            
            </TouchableOpacity>

            

  

      </Camera>


  

    );
  }

  renderImageFace() {
    return (
      <View>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
          
        />

        <Button onPress={() => this.setState({ path: null })}>Thoat</Button>
          <Button onPress={this.getDataUsingPost}>Gui</Button>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImageFace() : this.renderCameraFace()}
      </View>
    );
  }
}