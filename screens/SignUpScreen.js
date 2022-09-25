import React ,{useState}from 'react';
import {View, Text, Button, StyleSheet, TextInput,TouchableOpacity ,SafeAreaView,Image,ActivityIndicator,ScrollView} from 'react-native';
//import Spinner from 'react-native-loading-spinner-overlay';
import Spinner from 'react-native-loading-spinner-overlay';
// Register here and use the login screen to navigate to home
import  Icon  from 'react-native-vector-icons/Ionicons';

function SignUpScreen({navigation}) {
  const [merror,setMerror] = useState('')
  const [ername,setErname] = useState('')
  const [erpword,setErpword] = useState('')
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistraionSuccess,  setIsRegistraionSuccess] = useState(false);
  const [errortext, setErrortext] = useState('');

  const [sta,setSta]= useState({isVis:false})

  const [pword,setPword] = useState(true)

  //const [sta,setSta]= useState({isVis:false})

  const handleSubmitButton = () => {
    setErrortext('');
    setMerror('');
    setErname('')
    setErpword('')
    if (!userName) {
      //alert('Please fill in your Name');
      setErname('Please fill in your Name')
      return;
    }
    if (!email) {
      //alert('Please fill in your Email');
      setMerror('Please fill in your Email')
      return;
    }
    if (!password) {
      //alert('Please fill in a Password');
      setErpword('Please fill in a Password')
      return;
    }
    //Show Loader
    //setLoading(true);
    var dataToSend = {
      name: userName,
      email: email,
      password: password,
    };
    
    setSta({isVis: true})
    fetch('http://flaskcompanyapp-env.eba-tjwerny3.us-east-1.elasticbeanstalk.com/register', {
      method: 'POST',
      headers: {
        //Header Defination
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        name: userName,
        password: password,
        email: email
      })
    })
      .then((response) => response.json())
      .then((response) => {
        //Hide Loader
        //setLoading(false);
        console.log(response);
        // If server response message same as Data Matched
        if (response.status === 'success') {
          setSta({isVis: false})
          setIsRegistraionSuccess(true);
          console.log(
            'Registration Successful. Please Login to proceed'
          );
        } else {
          setSta({isVis: false})
          setErrortext(response.msg);
          setMerror(response.msg)
        }
      })
      .catch((error) => {
        //Hide Loader
        //setLoading(false);
        setSta({isVis: false})
        console.error(error);
        //setMerror(error)
      });
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        
        <Text style={{alignSelf:'center',marginBottom:20,color:'black'}} >
          Registration Successful
        </Text>
        <TouchableOpacity
          //style={}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('SignInScreen')}
          style={{backgroundColor:'white',alignSelf:'center',padding:10,borderRadius:8}}>
          <Text style={{alignSelf:'center', fontSize:26,color:'black'}} >Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: -11, alignItems: 'center', justifyContent: 'center'}}>

        {/*loading screens*/}

        {/*<View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
              <Spinner
              //visibility of Overlay Loading Spinner
              visible={sta.isVis}
              //Text with the Spinner
              textContent={'Logging in...'}
              //Text style of the Spinner Text
              textStyle={{color: '#FFF'}}
            />
    </View> */}

         <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
              <Spinner
              //visibility of Overlay Loading Spinner
              visible={sta.isVis}
              //Text with the Spinner
              textContent={'Registering User...'}
              //Text style of the Spinner Text
              textStyle={{color: '#FFF'}}
            />
          </View>


          <View style ={{alignSelf:'stretch',height:226, backgroundColor:'#00BFFF'}}>
          
          <Text style={{fontWeight:'bold',fontSize:50, fontFamily:'Cochin' ,alignSelf:'center',marginTop:50, color:'white'}}>SPEKTRE <Text style={{fontSize:35}}>TASK</Text></Text>
          <Text style={{alignSelf:'center', marginTop:20, fontSize:24,color:'white'}}>Welcome to Spekre</Text>
            

          </View>
          <View style={{backgroundColor:'#FFFFFF',width:'88%', position:'relative',marginTop: -35,borderRadius: 10,shadowColor:"#000", shadowOffset:{width:0,height:3}, shadowOpacity:0.27,shadowRadius:4.65,elevation:6}}>
                
               
          <View style={{flexDirection:'row'}}>
              <TextInput
                style={styles.input}
                onChangeText={(UserName) => setUserName(UserName)}
                placeholder="User name"
                placeholderTextColor="#C0C0C0"
                //value={text}
               />

             <TouchableOpacity style={{marginTop:35}}>
               <Icon name={"person-sharp"} size={25} color={'#C0C0C0'}/>
              </TouchableOpacity>
          </View>

          <Text style={{fontSize:8,marginLeft:14,marginBottom:-10,color:'red'}}>{ername}</Text>


          <View style={{flexDirection:'row'}}>   
              <TextInput
                style={styles.input}
                onChangeText={(Email) => setEmail(Email)}
                //value={number}
                placeholder="Email Address"
                keyboardType="email-address"
                placeholderTextColor="#C0C0C0"
              />

             <TouchableOpacity style={{marginTop:35}}>
                <Icon name={"mail"} size={25} color={'#C0C0C0'}/>
              </TouchableOpacity>
          </View>

          <Text style={{fontSize:8,marginLeft:14,marginBottom:-6,color:'red'}}>{merror}</Text>


          <View style={{flexDirection:'row'}}>   
              <TextInput
                style={styles.input}
                onChangeText={(Password) => setPassword(Password)}
                //value={number}

                secureTextEntry={pword}
                placeholder="Password"
                placeholderTextColor="#C0C0C0"
                //keyboardType="numeric"
              />
       
            <TouchableOpacity style={{marginTop:35}}
              onPress={()=>{setPword(!pword)}}>
              <Icon name={pword ?"eye-off":"eye-sharp"} size={25} color={'#C0C0C0'}/>
              </TouchableOpacity>

          </View>
              <Text style={{fontSize:8,marginLeft:14,marginBottom:-10,color:'red'}}>{erpword}</Text>

              <TouchableOpacity
                onPress={handleSubmitButton}
                style={styles.roundButton1}>
                <Image source={require('../onboardAssets/icons8-right-64.png')} style={{ marginLeft:3,marginTop:1, height:42, width:42, borderRadius:10}}/>
              </TouchableOpacity>
        </View>
        <TouchableOpacity
                onPress={() => navigation.navigate('SignInScreen')}
                style={{marginTop:84, backgroundColor:'#ff0000',borderRadius: 10,width:280, height:48}}>
                <Text style={{color:'white', alignSelf:'center', marginTop:12}}>Login With Google</Text>
                <Image source={require('../onboardAssets/icons8-google-48.png')} style={{backgroundColor:'white', marginLeft:235,marginTop:-28, height:42, width:42, borderRadius:10}}/>
              </TouchableOpacity>
              
        <TouchableOpacity
          onPress={() => navigation.navigate('SignInScreen')}
          style={{marginTop:10, backgroundColor:'blue',borderRadius: 10,width:280, height:48}}>
          <Text style={{color:'white', alignSelf:'center', marginTop:12}}>Login With Facebook</Text>
          <Image source={require('../onboardAssets/icons8-facebook-48.png')} style={{backgroundColor:'white', marginLeft:235,marginTop:-28, height:42, width:42, borderRadius:10}}/>
        </TouchableOpacity>
        
        <Text style={{marginTop:30,color:"#000000"}}>You have an accoutn?<Text  onPress={() => navigation.navigate('SignInScreen')}  style={{color:'#87ceeb'}}> Sign in</Text></Text>
        
        
      </View>
      </ScrollView>
    );
  }
  

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
      height: 40,
      marginTop:16,
      marginBottom:6,
      margin: 12,
      borderWidth: 0,
      borderBottomWidth:1,
      borderBottomColor:'#a9a9a9',
      padding: 10,
      width:"80%",
      color:"#000000",
      
    },
    roundButton1: {
      marginTop:20,
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