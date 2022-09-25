import React ,{useState}from 'react';
import {View, Text, Button,Image,TextInput,StyleSheet,ScrollView} from 'react-native';
//import SendScreen from './screens/uploadscreen/SendScreen';
import DocumentTab from './docs/documenttab';
import TaskStaker from './task/TaskStaker';
import PhotoTab from './photo/phototab';
import PhotoStaker from './photo/PhotoStaker';
import DocStaker from './docs/DocStaker';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';

import  Icon  from 'react-native-vector-icons/Ionicons';


const Tab = createMaterialTopTabNavigator();

const TabsScreen = ({route,navigation}) =>{
    //const [text,setText] = useState('');
    //const [text1,setText1] = useState('');
    //const [showContent,setShowContent] = useState('Docs');
    const {name,details,proname} = route.params;

    AsyncStorage.setItem('projectname', proname)

   
    return(
        <View style={{flex:1}}>
            <View style={{flex:1,backgroundColor:'#FFFFFF'}}>
               {/* <View>
                    <Text style={{ borderRadius:10,padding:5,height:50,marginTop:10,marginBottom:10}}>Project details</Text>
                    <Text>ll:{name}</Text>
               </View> */}

            <View style={{flexDirection:'column', justifyContent: 'space-between', backgroundColor:'#FFFFFF',borderRadius:10,padding:10,marginTop:1,marginBottom:5}}>
                 <ScrollView>
                 <View style={{flexDirection:'row',padding:5}}>

                 <Icon name={"ios-construct-sharp"} size={44} color={'#01a1ec'}/>

                    <View style={{flexDirection:'column',marginLeft:14,marginTop:-8}}>
                        <Text style={{marginTop:8,color:"#000000"}}>{proname}</Text>
                        <Text style={{marginTop:3,color:"#000000"}}>Details:{details}</Text>
                        {/* <Text style={{marginTop:3}}>Location: {details}</Text> */}
                        <Text style={{marginTop:3,color:"#000000"}}>Duration</Text>
                        
                     </View>
                 </View>
                 </ScrollView>
                
              </View>
                {/* <Button
             title = "Back to project"
             onPress={() => navigation.navigate('Fproject')}
            /> */}
            </View>

            <View style={{flex:4}}>
                <Tab.Navigator initialRouteName="DOCUMENTS">
                    <Tab.Screen name="DOCUMENTS" children={(props)=> <DocStaker {...props} name={name}/>}/>
                    <Tab.Screen name="TASKS" children={(props)=> <TaskStaker {...props} name={name}/>}/>
                    <Tab.Screen name="PHOTOS" children={(props)=> <PhotoStaker {...props} name={name}/>}/>
                </Tab.Navigator>
            </View>
         
        </View>
    );
}

export default TabsScreen;