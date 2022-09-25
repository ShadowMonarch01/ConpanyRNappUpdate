import React , {useState,useEffect} from 'react';
import {View, Text,StyleSheet, ScrollView,TouchableOpacity,Button} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { useIsFocused } from '@react-navigation/native';

const SecondScreen = ({navigation}) =>{
const d = String(new Date().toISOString()).substring(0,10)

    const [items, setItems] = useState({
        
        // '2020-09-17': [{name:'bbbb'},{name:'cccc'}],
      });
      
   
      
      let isFocused = useIsFocused();

      useEffect(()=> {
        console.log(d)
      

        //setProjects([])
      
        getAllData();
          //onRefresh()
      
          
        },[isFocused])
      
    const getAllData =()=>{
    fetch('http://flaskcompanyapp-env.eba-tjwerny3.us-east-1.elasticbeanstalk.com/getagendas')
    .then((response) => response.json())
    .then((response) => {
        setItems(response.info)
        if(!items){
          setItems({[`${d}`]:[{"taskid": 'nbu',
          "kr": 'No projects yet',
          "name":'Not tasks yet' ,
          "date":'00-00-00',
          "fyjrd":'00:00 am/pm',
          "sto":'00:00 am/pm',
          "dfgae":'Empty',
          "jobn":'Empty'}]})
          // setItems({'2022-09-17': [{"taskid": 1,
          // "projid": 'No projects yet',
          // "task":'Not tasks yet' ,
          // "date":'00-00-00',
          // "sta":'00:00 am/pm',
          // "sto":'00:00 am/pm',
          // "dby":'Empty',
          // "jobn":'Empty'}],})
        }
        // setRefreshing(false)
        
    })
    .catch((error) => {
        console.error(error);
    });
    };

    const renderItem = (item) => {

        return(
          <TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent: 'space-between',alignItems:'center', backgroundColor:'#FFFFFF',borderRadius:10,padding:5,marginTop:10,marginBottom:10}}>
              <View style={{padding:5}}>
                <Text>Project:{item.kr}</Text>
                <Text>Task:{item.name}</Text>
                <Text>Start time:{item.fyjrd}</Text>
                <Text>Stop time:{item.sto}</Text>
                <Text>Done by:{item.dfgae}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
    
      }
      
    
    
    return(
        <View style={{ flex: 1 }}>
          
        <Agenda
        items={items}
        selected={`${d}`}
        renderItem={renderItem}
        
        />
    
       </View>
    );
}

export default SecondScreen;