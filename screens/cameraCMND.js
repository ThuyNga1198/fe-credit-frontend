// Snip
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { StyleSheet, Dimensions,TouchableHighlight } from 'react-native';
import { View, Image } from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import Button from './Button';
import styled from 'styled-components';



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

export default class CameraCMND extends React.Component {
  image=null;

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
    var dataToSend = {cmnd:image};
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //POST request 
    fetch('http://192.168.1.4:8000/get-cmnd', {
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


  renderCamera() {
    return (
      <Camera
      
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}


        flashMode={Camera.Constants.FlashMode.off}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >
        <BarcodeMask width={200} height={350} showAnimatedLine={false} transparency={0.8}/>

        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
      </Camera>
    );
  }

  renderImage() {
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
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
}