import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';
//import CameraExample from './camera/cameraExample'


export default class App extends React.Component {
  state = { isPermitted: false };
  constructor(props) {
    super(props);
    this.state={
      username:"",
      Ngaysinh:"",
      CMND:"",
      diachi:"",
      quequan:"",
  }}
  render(){
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
       vui lòng nhập thông tin
      </Text>
      </View>
      </View>
      <View style={styles.buton}>
      <TextInput placeholder="Họ và tên"
    	           placeholderTextColor="black"
    	           underlineColorAndroid="transparent"
    	           style={styles.txtInput}  onChangeText={(username) => this.setState({username:username})}/>
    	        <TextInput placeholder="NgaySinh"
    	            underlineColorAndroid="transparent"
    	            placeholderTextColor="black"
    	            
    	            style={styles.txtInput}  onChangeText={(Ngaysinh) => this.setState({Ngaysinh:Ngaysinh})}/>
                  <TextInput placeholder="CMND"
    	            underlineColorAndroid="transparent"
    	            placeholderTextColor="black"
    	            
    	            style={styles.txtInput}  onChangeText={(CMND) => this.setState({CMND:CMND})}/>
                  <TextInput placeholder="địa chỉ"
    	           placeholderTextColor="black"
    	           underlineColorAndroid="transparent"
    	           style={styles.txtInput}  onChangeText={(diachi) => this.setState({diachi:diachi})}/>
                 <TextInput placeholder="quê quán"
    	           placeholderTextColor="black"
    	           underlineColorAndroid="transparent"
    	           style={styles.txtInput}  onChangeText={(quequan) => this.setState({quequan:quequan})}/>
                      
                      <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            onPress={this._onPressButton}
            title='Trở lại!'
          />
          <Button
            onPress={this._onPressButton}
            title='Tiếp Tục!'
            color="#841584"
          />
        </View>
        </View>


                 
      </View>
    
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'forestgreen',
    alignItems: 'center',
    
  },
  avatar: {
    width: 400,
    height: 75,
  
    alignItems:'center'
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerGroup: {
    flex: 0.3,
    
    alignItems: "center",
    justifyContent: "center",

  },
  imgHeader: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
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
  button: {
    flex: 0.4,
    
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
   
  },
  txtInput:{
    backgroundColor: 'white',
    width: 300,
     
    marginHorizontal: 20,
    padding:8,
    borderRadius: 20,
    color: '#000',
    marginTop:2,
},
  

/*btnLogin:{
  width:100,
  backgroundColor:'rgba(0,145,234,1)',
  padding:8,
  borderRadius: 20,
  marginTop:2,
 alignItems:"center"
  
},*/
btnLogin:{
  	     width: 200,
  	     backgroundColor:'rgba(0,145,234,1)',
  	     padding:8,
  	     borderRadius: 20,
  	     marginTop:2,
        alignItems:'center',
        justifyContent:'center'
  	  },
txtLogin:{
  	    color:'#fff',
  	    textAlign:'center'
  	  }
  
});
