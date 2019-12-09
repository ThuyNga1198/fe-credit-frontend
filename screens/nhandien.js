import * as WebBrowser from 'expo-web-browser';
import React,{Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Icon,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import CameraEx from '../screens/CameraEx';

import { MonoText } from '../components/StyledText';
import {CameraScreen} from '../screenName';
import { withNavigation } from 'react-navigation';

//import { Button } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';



export default class nhandien extends Component{
    render(){
        return(
            <View style={{
                flex:1,
                backgroundColor:'dodgerblue',
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Text style={{ fontWeight:'bold',fontSize:22,color:'white'}}>
                Nhan dien Screen
                </Text>
                <Button
                    containerStyle={{padding:10, margin:20, width:200,height:45,borderRadius:10, backgroundColor:'darkviolet'}}
                    style={{ fontSize:18, color:'white'}}
                    onPress={()=>{
                        this.props.navigation.navigate("Camera",{detail:Camera});
                    }}
                    title="Camera">
                    Camera
                 </Button>
             </View>
        );
    }

}
