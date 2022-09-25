import React,{useState,useEffect,useContext} from 'react';
import {View, Text, Button,PermissionsAndroid,Image,TextInput,StyleSheet,Alert,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../theauth/context';


const WorkTask = ({route,navigation}) =>{

    const {reload,setReload}=useContext(AuthContext)

    const {iids,itask,idt} = route.params;
   
    const [Id, setId] = useState(iids);
    const [text,setText] = useState(itask);

    const [projetId,setProjectId] = useState(idt);

    const [curdate,setCurdate] = useState('');

    const [startTime,setStartTime] = useState('');

    const [stopTime,setStopTime] = useState('');

    const [uname,setUname] = useState('');

    const [projetName,setProjectName] = useState('');




    useEffect(()=>{
      var date = new Date().getDate()
      var month = new Date().getMonth()+1
      var year = new Date().getFullYear()
      var d=String(date).padStart(2, '0');
      var m=String(month).padStart(2, '0');
      // var hour = new Date().getHours()
      // var min = new Date().getMinutes()
      // var sec = new Date().getSeconds()
      openTwoButtonAlert()
      setCurdate(year+'-'+m+'-'+d)
      // setProjects([])
      //  setId()
       
       
      getData();
      //    // setRefreshing(true)
  
    },[])

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('name')

        const pname = await AsyncStorage.getItem('projectname')

        setUname(value)

        setProjectName(pname)
        
        
      } catch(e) {
        // error reading value
      }
    }
    

    const openTwoButtonAlert=()=>{
      Alert.alert(
        'Hey There!',
        'Would you like to start time tracking',
        [
          {text: 'Yes', onPress: () => console.log('Yes button clicked')},
          {text: 'No', onPress: () => navigation.navigate('Tscreen'), style: 'cancel'},
        ],
        { 
          cancelable: true 
        }
      );
    }

    
    const quittask=()=>{
      Alert.alert(
        'Hey There!',
        'Are you sure tou want to quit this task',
        [
          {text: 'Yes', onPress: () => navigation.navigate('Tscreen')},
          {text: 'No', onPress: () => console.log('No button clicked') , style: 'cancel'},
        ],
        { 
          cancelable: true 
        }
      );
    }



    const handleUpload = () => {
        setId(iids)
        setProjectId(idt)
        {/*
          if (!Id) {
            alert('Please enter project id');
            return;
          }
        */}
  
          // if (!text) {
          //   alert('Please Enter a Task');
          //   return;
          // }

          if (!startTime) {
            alert('Please Enter the time you task started');
            return;
          }

          if (!stopTime) {
            alert('Please Enter the time you finished the task');
            return;
          }
          
          
          fetch('http://flaskcompanyapp-env.eba-tjwerny3.us-east-1.elasticbeanstalk.com/agendaupload', {
             method: 'POST',
             headers: {
                  //Header Defination
                  'Accept':'application/json',
                  'Content-Type':'application/json',
              },
              body: JSON.stringify({
                  "taskid": Id,
                  "projid": projetId,
                  "task": text,
                  "date":curdate,
                  "sta":startTime,
                  "sto":stopTime,
                  "dby":uname,
                  "jobn":projetName
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
               setStartTime('')
               setStopTime('')
               setProjectName('')
               setProjectId('')
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex:1}}>
            <Text style={{fontSize:24,alignSelf:'center',color:"#000000",marginTop:10,marginBottom:6}}>Upload Task</Text>
            <View style={{alignItems:'center'}}>
                {/* <TextInput 
                  style={{borderWidth: 0,borderBottomWidth:1,borderBottomColor:'#a9a9a9'}}
                  onChangeText={(ids) => setText(ids)}
                  placeholder="Enter task"
                /> */}
                <Text style={{color:"#000000"}}>Name:{text}</Text>
                {/* <Text>Id:{Id}</Text> */}
                <Text style={{color:"#000000"}}>Date:{curdate}</Text>
                {/* <Text>ProjectId:{projetId}</Text> */}

                <Text style={{color:"#000000"}}>ProjectName:{projetName}</Text>

                <View style={{flexDirection:'row'}}>
                    <View style={{flexDirection:'column'}}>
                      <Text style={{fontSize:18,alignSelf:'center',color:"#000000"}}>Start time</Text>
                      <TextInput 
                        style={{borderWidth: 0,borderBottomWidth:1,borderBottomColor:'#a9a9a9',margin:4,marginRight:10}}
                        onChangeText={(st) => setStartTime(st)}
                        placeholder="00:00 am/pm"
                        placeholderTextColor="#C0C0C0"
                      />
                    </View>
                  
                    <View style={{flexDirection:'column'}}>
                      <Text style={{fontSize:18,alignSelf:'center',color:"#000000"}}>Stop time</Text>
                      <TextInput 
                          style={{borderWidth: 0,borderBottomWidth:1,borderBottomColor:'#a9a9a9',margin:4,marginLeft:10}}
                          onChangeText={(stp) => setStopTime(stp)}
                          placeholder="00:00 am/pm"
                          placeholderTextColor="#C0C0C0"
                        />
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'column',width:200,alignSelf:'center',justifyContent:'space-between',marginTop:25}}>
                <Button
                
                title = "Upload task"
                color= "#00BFFF"
                onPress={handleUpload}
                />

                <View style={{marginTop:25}}>
                    <Button
                      
                      title = "Quit task"
                      color= "#00BFFF"
                      onPress={quittask}
                      />
                  </View>
            </View>
        </View>
        </ScrollView>
    );
}
export default WorkTask;