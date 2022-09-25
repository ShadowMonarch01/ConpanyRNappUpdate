import React,{useContext} from 'react';
import {View, Text,StyleSheet,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../../theauth/context';

const FourthScreen = ({navigation}) =>{
    
   const {signOut} = useContext(AuthContext)

    const handleExit = async () =>{
        try{
            await AsyncStorage.clear()
            AsyncStorage.setItem('alreadyLaunched', 'true');
            //AsyncStorage.setItem('token','false')
            //navigation.navigate('SignInScreen')
            signOut()
        } catch (eer) {
            console.log(eer)
        }
        
    }
    // style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    // style ={{marginTop:40,backgroundColor:"#00BFFF",borderRadius: 6,padding:5,flexDirection:'row'}}
    return(
        <View style={{ flex: 1 }}>
          {/* <Text>Fourth home tab screen</Text> */}
          <TouchableOpacity
              style ={{marginTop:5,backgroundColor:"#FFFF",padding:10,flexDirection:'row'}}
            //   onPress={handleExit}
              >
              <Text style={{fontSize:20,color:'gray',marginLeft:10}}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style ={{marginTop:5,backgroundColor:"#FFFF",padding:10,flexDirection:'row'}}
            //   onPress={handleExit}
              >
              <Text style={{fontSize:20,color:'gray',marginLeft:10}}>Options</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style ={{marginTop:5,backgroundColor:"#FFFF",padding:10,flexDirection:'row'}}
              onPress={handleExit}
              >
              <Text style={{fontSize:20,color:'black',marginLeft:10}}>LOG OUT</Text>
          </TouchableOpacity>
       </View>
    );
}

export default FourthScreen;