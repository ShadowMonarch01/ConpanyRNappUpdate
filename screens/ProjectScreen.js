import React,{useState} from 'react';
import DocumentPicker from "react-native-document-picker"
import {View, Text,TextInput, Button,StyleSheet,TouchableOpacity} from 'react-native';


const ProjectScreen = ({navigation}) =>{
  const [text,setText] = useState('');
  const [details,setDetails] = useState('');
  
  const handleProjectUpload = () => {

    if (!text) {
      alert('Please enter project name');
      return;
    }

    if (!details) {
      alert('Please enter project details');
      return;
    }
    
    
    fetch('http://flaskcompanyapp-env.eba-tjwerny3.us-east-1.elasticbeanstalk.com/newproject', {
       method: 'POST',
       headers: {
            //Header Defination
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            name: text,
            details: details
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
             console.log(response.info);
             setText('')
             setDetails('')
             //setId('')
           
             
            //navigation.replace('ElHome');
             alert(response.status)  
             navigation.navigate('Fproject')         
             return;
            } else {
            setErrortext(response.msg);
            console.log('An error occured try again');
            }
        })
        .catch((error) => {
            //Hide Loader
            setLoading(false);
            console.error(error);
        });
        
    }
 // const { data, isFetching } = useGetProjectsQuery();
// Replcae with Loader later 
// if (isFetching) return <Loading />;
//if (isFetching) return "Hi";
  return(
    <View style={{ flex: 1, backgroundColor:'#FFFFFF' }}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize:24,marginTop:5,color:"#000000",marginTop:20}}>Create New Project</Text>
        <TextInput style={{height: 40,marginTop:20,margin: 12,borderWidth:1,borderRadius:10,borderColor:'#a9a9a9',padding: 10,width:300,color:"#000000"}}
         placeholder="Enter Project Name"
         placeholderTextColor="#C0C0C0"
         value={text}
         onChangeText={(ids) => setText(ids)}
         ></TextInput>

        <TextInput
          multiline
          numberOfLines={10}
          style={{margin: 12,borderWidth: 1,width:300,color:"#000000",borderRadius:20,borderColor:"#a9a9a9"}}
          onChangeText={(ls) => setDetails(ls)}
          value={details}
          placeholder="Enter Project details"
          placeholderTextColor="#C0C0C0"
        />
        {/* <View style={{marginTop:10}}>
        <Button
           title = "Create Project"
           onPress={handleProjectUpload}
          />
        </View> */}

        <TouchableOpacity
        onPress={handleProjectUpload}
        style={{marginTop:50, backgroundColor:'#00BFFF',borderRadius: 10,width:280, height:48,alignSelf:'center'}}>
        <Text style={{color:'white', alignSelf:'center', marginTop:12}}>CREATE PROJECT</Text>
      </TouchableOpacity>

        <TouchableOpacity
        onPress={() => navigation.navigate('Fproject')}
        style={{marginTop:50, backgroundColor:'#00BFFF',borderRadius: 10,width:280, height:48,alignSelf:'center'}}>
        <Text style={{color:'white', alignSelf:'center', marginTop:12}}>SEE  ALL  PROJECTS</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProjectScreen;
