import React from 'react';
import {View, Text, Button, StyleSheet, TextInput,Image, TouchableOpacity} from 'react-native';

function SplashScreen({navigation}) {
  // if images are not showing where they are supposed to rename them changing the spaces to underscore
    return (
      <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flexDirection:'row',backgroundColor:'#00BFFF', height:50, alignSelf:'stretch'}}>
                <Text style={{marginTop:18,marginLeft:66,fontSize:16,color:'white'}}>CHOOSE SIGN IN OPTION </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')} style={{margin:10,marginLeft:48,alignSelf:'flex-end'}}>
                  <Text style={{fontSize:16,color:'white'}}>Login </Text>
                </TouchableOpacity>
              </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              
              <Image source={require('../onboardAssets/SPEKTRE_TASK_logo_on_mobile_top.png')} style={{marginBottom:30}} />
              <Image source={require('../onboardAssets/image_on_screen_5.png')} style={{marginBottom:-60,marginTop:20}}/>


              <TouchableOpacity
                      /*onPress={() => navigation.navigate('SignInScreen')}*/
                      style={{marginTop:164, backgroundColor:'#ff0000',borderRadius: 10,width:280, height:48}}>
                      <Text style={{color:'white', alignSelf:'center', marginTop:12}}>Login With Google</Text>
                      <Image source={require('../onboardAssets/icons8-google-48.png')} style={{backgroundColor:'white', marginLeft:235,marginTop:-28, height:42, width:42, borderRadius:10}}/>
                    </TouchableOpacity>
                    
              <TouchableOpacity
               /* onPress={() => navigation.navigate('SignInScreen')}*/
                style={{marginTop:10, backgroundColor:'blue',borderRadius: 10,width:280, height:48}}>
                <Text style={{color:'white', alignSelf:'center', marginTop:12}}>Login With Facebook</Text>
                <Image source={require('../onboardAssets/icons8-facebook-48.png')} style={{backgroundColor:'white', marginLeft:235,marginTop:-28, height:42, width:42, borderRadius:10}}/>
              </TouchableOpacity>
            </View>
      </View>
    );
  }
  

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});