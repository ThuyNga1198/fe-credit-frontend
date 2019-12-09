import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Icon, 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
     <View style={styles.headerGroup}>
       <View style={styles.imgHeader}>
      <Image 
      style={styles.avatar}
      source={require('../assets/images/logo.jpg')}
      />
      <Text style={styles.text}>
        Chào Mừng Quý Khách!
        </Text>
        <Text style={styles.text1}>
       Mời Chọn Dịch Vụ
      </Text>
      </View>
      </View>
      <View style={styles.header}>
       <View style = {styles.buttonContainer}>
          <TouchableOpacity
            onPress={openFE}>
              <Text style={styles.TEXT}>Giới Thiệu FE CREDIT</Text>
            </TouchableOpacity>
          
          
          
        </View>
       
        <View style = {styles.buttonContainer}>
          <TouchableOpacity
            onPress={opendangky}
            >
            <Text style={styles.TEXT}>Mở Thẻ Ngân Hàng</Text>
            </TouchableOpacity>
        </View>
        <View style = {styles.buttonContainer}>
          <TouchableOpacity
            onPress={opendangky}>
              <Text style={styles.TEXT}>Đăng Nhập</Text>
            </TouchableOpacity>
        </View>
        <View style = {styles.buttonContainer}>
          <TouchableOpacity
            onPress={opendangky}>
              <Text style={styles.TEXT}>Đăng Ký</Text>
            </TouchableOpacity>
        </View>
 </View>
      </View>
      )}
      function opendangky(){
        WebBrowser.openBrowserAsync(
          'https://fecredit.com.vn/dang-ky-the-tin-dung-fe-credit/'
        )
      }
      function openFE(){
        WebBrowser.openBrowserAsync(
          'https://fecredit.com.vn'
        )
      }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'forestgreen',
    alignItems: 'center',
  },
  imgHeader: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width: 400,
    height: 75,
  },
  header:{
    flex:0.4,
    width: 200,
    //backgroundColor:'rgba(0,145,234,1)',
    padding:8,
    borderRadius: 20,
    marginTop:2,
   alignItems:'center',
   justifyContent:'center'
  },
  
  headerGroup: {
    flex:0.2 ,
    
    alignItems: "center",
    justifyContent: "center",

  },
 
  TEXT:{
    fontSize:18,
    justifyContent:'center',
    alignContent:'center'
  },
 
  text:{
    color: 'white',
    fontSize:30,
    fontWeight:'bold'
  },
  text1:{
    color: 'white',
    fontSize:20,
  },
  
    alternativeLayoutButtonContainer: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    buttonContainer:{
    flex: 0.4,
    
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    height:40,
    marginTop: 16,
    },
    avatar: {
      width: 400,
      height: 75,
    
      alignItems:'center'
    },
  });
