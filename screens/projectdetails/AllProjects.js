import React, {useState, useEffect, useContext} from 'react';
import {View, Text,StyleSheet,FlatList,TouchableOpacity,Image,RefreshControl} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../theauth/context';

const AllProjectsScreen = ({navigation}) =>{

     	const [projects, setProjects] = useState([])

      const [refreshing,setRefreshing] = useState(true)

      const {reload,setReload,project_id,seProject_id} = useContext(AuthContext)

      let isFocused = useIsFocused();

     	useEffect(()=> {
         
         setProjects([])

	      getAllData();
        onRefresh()
    
     	},[isFocused])

       const getAllData =()=>{
        fetch('http://flaskcompanyapp-env.eba-tjwerny3.us-east-1.elasticbeanstalk.com/getprojects')
	      .then((response) => response.json())
	      .then((response) => {
	         setProjects(response.data)
           setRefreshing(false)
	      })
	      .catch((error) => {
	          console.error(error);
	      });
       };


       

      const renderItem = ({item}) => {
        return(
          <TouchableOpacity
            onPress={() =>{
              seProject_id(item.id) 
              setReload(!reload)
              navigation.navigate('Fdetails',{name:item.id, details:item.details,proname:item.name }) 
            }}
          >
              <View style={{flexDirection:'column', justifyContent: 'space-between', backgroundColor:'#FFFFFF',borderRadius:10,padding:18,marginTop:10,marginBottom:10}}>
                 <View style={{flexDirection:'row',alignSelf:'stretch',width:300}}>

                 <Icon name={"ios-construct-outline"} size={44} color={'#01a1ec'}/>

                    <View style={{flexDirection:'column'}}>
                        <Text style={{marginTop:8,marginLeft:16,color:"#000000"}}>{item.name}</Text>
                        <Text style={{marginTop:6,marginLeft:16,color:"#000000"}}>Posted by...</Text>
                     </View>
                 </View>
                <Text style={{color:"#000000"}}>{item.details}</Text>
              </View>
        </TouchableOpacity>
        )
      }
       
      const onRefresh = () =>{
        setRefreshing(true)
        getAllData()
      }

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{color:"#000000",marginTop:12,marginBottom:6}}>All Projects</Text>
          <FlatList
            data={projects}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh} 
              
              />
            }
          />
          <View></View>
       </View>
    );
}

export default AllProjectsScreen;