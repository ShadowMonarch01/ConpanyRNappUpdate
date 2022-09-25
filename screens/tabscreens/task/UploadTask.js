import React,{useState,useContext} from 'react';
import {View, Text, Button,PermissionsAndroid,Image,TextInput,StyleSheet,Alert,TouchableOpacity} from 'react-native';
import { AuthContext } from '../../../theauth/context';


const UploadTask = ({route,navigation}) =>{

   const {reload,setReload}=useContext(AuthContext)
    const {ids} = route.params;
   
    const [Id, setId] = useState(ids);
    const [text,setText] = useState('');


    const handleUpload = () => {
        setId(ids)
        {/*
          if (!Id) {
            alert('Please enter project id');
            return;
          }
        */}
  
          if (!text) {
            alert('Please Enter a Task');
            return;
          }
          
          
          fetch('http://flaskcompanyapp-env.eba-tjwerny3.us-east-1.elasticbeanstalk.com/taskupload', {
             method: 'POST',
             headers: {
                  //Header Defination
                  'Accept':'application/json',
                  'Content-Type':'application/json',
              },
              body: JSON.stringify({
                  "id": Id,
                  "task": text
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
               console.log(response.data);
               setText('')
               setId('')
               setReload(!reload)
               
              navigation.navigate('Tscreen');
              alert(response.status,
                  {   title: "OK",
                      onPress: navigation.navigate("Tscreen")})           
               return;
              } 
          })
          .catch((error) => {
              //Hide Loader
              //setLoading(false);
              console.error(error);
          });
          
      }


    return(
        <View style={{flex:1}}>
            <Text style={{fontSize:24,color:"#000000",alignSelf:'center',marginTop:10}}>Post Task</Text>
            <View style={{alignItems:'center',marginTop:80}}>
                <TextInput 
                  style={{borderWidth:1,width:"80%",borderColor:'#a9a9a9',color:"#000000",borderRadius:8}}
                  onChangeText={(ids) => setText(ids)}
                  placeholder="Enter task"
                  placeholderTextColor="#C0C0C0"
                />
            </View>
            <View style={{flexDirection:'column',width:200,alignSelf:'center',justifyContent:'space-between',marginTop:40}}>
            <Button
             
             title = "Post task"
             color= "#00BFFF"
             onPress={handleUpload}
            />
            </View>
        </View>
    );
}
export default UploadTask;