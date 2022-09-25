import React from 'react';
import {View, Text, Button, StyleSheet, TextInput,TouchableOpacity ,SafeAreaView,Image} from 'react-native';

function SignInScreen({navigation}) {
  //const [text, onChangeText] = React.useState("Useless Text");
  //const [number, onChangeNumber] = React.useState(null);
    return (
      <View style={{ flex: -11, alignItems: 'center', justifyContent: 'center'}}>
          <View style ={{alignSelf:'stretch',height:226, backgroundColor:'#00BFFF'}}>
          
          <Text style={{fontWeight:'bold',fontSize:50, fontFamily:'Cochin' ,alignSelf:'center',marginTop:50, color:'white'}}>SPEKTRE <Text style={{fontSize:35}}>TASK</Text></Text>
          <Text style={{alignSelf:'center', marginTop:20, fontSize:24,color:'white'}}>Forgot Password</Text>
            

          </View>
          <View style={{backgroundColor:'#FFFFFF',width:'88%', position:'relative',marginTop: -35,borderRadius: 10, shadowColor:"#000", shadowOffset:{width:0,height:3}, shadowOpacity:0.27,shadowRadius:4.65,elevation:6}}>
                
               
                  
              <TextInput
                style={styles.input}
                //onChangeText={onChangeText}
                placeholder="Email Address"
                //value={text}
               />
              
              <TouchableOpacity
                onPress={() => navigation.navigate('SetPasswordScreen')}
                style={styles.roundButton1}>
                <Image source={require('../onboardAssets/icons8-right-64.png')} style={{ marginLeft:3,marginTop:1, height:42, width:42, borderRadius:10}}/>
              </TouchableOpacity>
              
        </View>
        
      </View>
    );
  }
  

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
      height: 40,
      marginTop:28,
      marginBottom:28,
      margin: 12,
      borderWidth: 0,
      borderBottomWidth:1,
      borderBottomColor:'#a9a9a9',
      padding: 10,
      
    },
    roundButton1: {
      width: 65,
      height: 65,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: '#00BFFF',
      position:'relative',
      marginBottom:-34,
      alignSelf:'center',
      borderWidth:7,
      borderColor:'#FFFFFF',
    },
});