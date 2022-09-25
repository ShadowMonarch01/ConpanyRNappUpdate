import React ,{useState,useContext} from 'react';
import {View, Text, Button, StyleSheet, TextInput,TouchableOpacity ,SafeAreaView,Image,ScrollView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

import  Icon  from 'react-native-vector-icons/Ionicons';

import {AuthContext} from '../theauth/context'

function SignInScreen({navigation}) {
  /*Swap the codes commented at line 97 for the ones that are not fo easy access
    or use email: Lo@gmail.com , password:1111 to access home screen */
  const [merror,setMerror] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const [sta,setSta]= useState({isVis:false})

  const [pword,setPword] = useState(true)

  const {signIn} = useContext(AuthContext)

  const handleSubmitPress = async () => {
    setMerror('')
    setErrortext('');
    if (!email) {
      alert('Please fill Email');
      return;
    }
    if (!password) {
      alert('Please fill Password');
      return;
    }
    //setLoading(true);
    var dataToSend = {
      email: email,
      password: password,
    };
    setSta({isVis: true})
    fetch('http://flaskcompanyapp-env.eba-tjwerny3.us-east-1.elasticbeanstalk.com/login', {
      method: 'POST',
      headers: {
        //Header Defination
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
      .then((response) => response.json())
      .then((response) => {
        //Hide Loader
        //setLoading(false);
        console.log(response);
        // If server response message same as Data Matched
        if (response.status === 'success') {
          //AsyncStorage.setItem('user_id', responseJson.data.email);
          console.log(response.name);
          
           AsyncStorage.setItem('id', response.id)
           AsyncStorage.setItem('token', response.token)
           AsyncStorage.setItem('name', response.name)
           AsyncStorage.setItem('propic', response.propic)
           AsyncStorage.setItem('about', response.about)
           AsyncStorage.setItem('phone', response.phone)
           AsyncStorage.setItem('adm', response.adm)
          setSta({isVis: false})
          //navigation.navigate('ElHome');
          signIn()
        } else {
          setErrortext(response.msg);
          setSta({isVis: false})
          setMerror(response.msg)
          //alert(response.msg);
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        setSta({isVis: false})
        //Hide Loader
        //setLoading(false);
        console.error(error);
        
      });
  };



    return (
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: -11, alignItems: 'center', justifyContent: 'center'}}>

          <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
              <Spinner
              //visibility of Overlay Loading Spinner
              visible={sta.isVis}
              //Text with the Spinner
              textContent={'Logging in...'}
              //Text style of the Spinner Text
              textStyle={{color: '#FFF'}}
            />
          </View>

          <View style ={{alignSelf:'stretch',height:226, backgroundColor:'#00BFFF'}}>
          
          <Text style={{fontWeight:'bold',fontSize:50, fontFamily:'Cochin' ,alignSelf:'center',marginTop:50, color:'white'}}>SPEKTRE <Text style={{fontSize:35}}>TASK</Text></Text>
          <Text style={{alignSelf:'center', marginTop:20, fontSize:24,color:'white'}}>Welcome Back!</Text>
            

          </View>
          <View style={{backgroundColor:'#FFFFFF',width:'88%', position:'relative',marginTop: -35,borderRadius: 10, shadowColor:"#000", shadowOffset:{width:0,height:3}, shadowOpacity:0.27,shadowRadius:4.65,elevation:6}}>
                
               
          <View style={{flexDirection:'row'}}>    
              <TextInput
                style={styles.input}
                //onChangeText={onChangeText}
                onChangeText={(Email) => setEmail(Email)}
                //value={number}
                placeholder="Email Address"
                placeholderTextColor="#C0C0C0"
                keyboardType="email-address"
               />

             <TouchableOpacity style={{marginTop:35}}>
              <Icon name={"person-sharp"} size={25} color={'#C0C0C0'}/>
              </TouchableOpacity>
          </View>
          <Text style={{fontSize:8,marginLeft:14,marginBottom:-6,color:'red'}}>{merror}</Text>
              
              <View style={{flexDirection:'row'}}>
              

              <TextInput
                style={styles.input}
                //onChangeText={onChangeNumber}
                //value={number}

                secureTextEntry={pword}
                onChangeText={(Password) => setPassword(Password)}
                placeholder="Password"
                placeholderTextColor="#C0C0C0"
              />

              <TouchableOpacity style={{marginTop:35}}
              onPress={()=>{setPword(!pword)}}>
              <Icon name={pword ?"eye-off":"eye-sharp"} size={25} color={'#C0C0C0'}/>
              </TouchableOpacity>

              </View>
              
              

              <Text style={{marginLeft:210, color:'#0000ff',fontSize:12}}  onPress={() => navigation.navigate('ForgotPassword')} > Forgot Password</Text>
              <TouchableOpacity
                onPress={ handleSubmitPress/* () => navigation.navigate('ElHome')*/}
                style={styles.roundButton1}>
                <Image source={require('../onboardAssets/icons8-right-64.png')} style={{ marginLeft:3,marginTop:1, height:42, width:42, borderRadius:10}}/>
              </TouchableOpacity>
              
        </View>
        <TouchableOpacity
                onPress={() => navigation.navigate('SignUpScreen')}
                style={{marginTop:164, backgroundColor:'#ff0000',borderRadius: 10,width:280, height:48}}>
                <Text style={{color:'white', alignSelf:'center', marginTop:12}}>Login With Google</Text>
                <Image source={require('../onboardAssets/icons8-google-48.png')} style={{backgroundColor:'white', marginLeft:235,marginTop:-28, height:42, width:42, borderRadius:10}}/>
              </TouchableOpacity>
              
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUpScreen')}
          style={{marginTop:10, backgroundColor:'blue',borderRadius: 10,width:280, height:48}}>
          <Text style={{color:'white', alignSelf:'center', marginTop:12}}>Login With Facebook</Text>
          <Image source={require('../onboardAssets/icons8-facebook-48.png')} style={{backgroundColor:'white', marginLeft:235,marginTop:-28, height:42, width:42, borderRadius:10}}/>
        </TouchableOpacity>
        
        <Text style={{marginTop:30,color:"#000000"}}>Don't have an account?<Text style={{color:'#87ceeb'}} onPress={() => navigation.navigate('SignUpScreen')} > Sign up</Text></Text>
        
        
      </View>
      </ScrollView>
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
      marginTop:20,
      margin: 12,
      borderWidth: 0,
      borderBottomWidth:1,
      borderBottomColor:'#a9a9a9',
      padding: 10,
      width:"80%",
      color:"#000000",
      
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