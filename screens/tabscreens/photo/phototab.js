import React,{useState,useEffect,useContext} from 'react';
import {View, Text,StyleSheet,Modal,Button,FlatList,TouchableOpacity,Image,RefreshControl} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
// import ImageView from "react-native-image-viewing";
import ImageModal from 'react-native-image-modal';

import  Icon  from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../../theauth/context';

const PhotoTab = ({route,navigation,name}) =>{

  const {reload,
    setReload,
    project_id,
    seProject_id,} = useContext(AuthContext)
  
  const [id,setId] = useState(project_id)

  const [projects, setProjects] = useState([])

  const [refreshing,setRefreshing] = useState(true)

  const [visible, setIsVisible] = useState(false);

  const [images, setImages] = useState('');

  const [sta,setSta]= useState({isVis:false})
  
  const isFocused = useIsFocused();
  

  useEffect(()=>{
    
    setProjects([])
     setId(name)
     
     
     getData();
       // setRefreshing(true)

  },[reload])

  const getData = () =>{
    setId(project_id)
    setProjects([])

    fetch('http://flaskcompanyapp-env.eba-tjwerny3.us-east-1.elasticbeanstalk.com/getprojectimgs',{
          method: 'POST',
          headers: {
               //Header Defination
               'Accept':'application/json',
               'Content-Type':'application/json',
           },
           body: JSON.stringify({
               "id":id
           })
       })
	      .then((response) => response.json())
	      .then((response) => {
          if (response.json=='None'){
            setProjects([])
          }else{
	         setProjects(response.data)
          }
           setRefreshing(false)
	      })
	      .catch((error) => {
	          console.error(error);
	      });
  };

  const openImg = () =>{
    //setImages({uri:oss})
    setIsVisible(true)
  }

  const displayModal=(show)=>{
    setSta({isVis: show})
  }
  const renderItem = ({item}) => {
    var tss ='data:image/png;base64,'
    var oss = tss.concat(item.images)
   return(
     <TouchableOpacity
     // onPress={() => {
      //  setImages(oss)
      //  displayModal(true)
      //}}
      // onPress={() => openImg()}
     >
         <View style={{flexDirection:'column', justifyContent: 'space-between', backgroundColor:'#FFFFFF',borderRadius:10,padding:5,marginTop:10,marginBottom:10}}>
               <ImageModal
                 resizeMode= "contain" 
                 source={{uri: oss}}
                 style={{height: 300,
                     width: 300,
                     margin: 12,borderWidth: 1,resizeMode: 'contain'}}
               />
         </View>

         
   </TouchableOpacity>
   )
 }

 const onRefresh = () =>{
   setRefreshing(true)
   getData()
 }
  
 
return(
   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     <Text style={{marginTop:8,color:'black'}}>Projects{id}</Text>
     <View></View>
     <FlatList
     ListHeaderComponent={() => {
       return(<Text style={{color:"#000000"}}>Project Images</Text>)
     }}
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
     {/* <Button
        title = "Upload photo"
        onPress={() => navigation.navigate('Uscreen',{ids:id})}
       /> */}

        <TouchableOpacity
          onPress={() => navigation.navigate('Uscreen',{ids:id})}
          style={{
            margin:10,
            width: 65,
            height: 65,
            alignSelf: 'flex-end',
            padding: 10,
            paddingRight:6.8,
            borderRadius: 100,
            backgroundColor: '#00BFFF',
            position:'relative',
            marginTop:-150,
            alignItems:'center',
            //justifyContent:'flex-end',
            }}>
          
          <Icon name={"ios-add-circle-outline"} size={44} color={'#FFFFFF'}/>
        </TouchableOpacity>
        {/*
         <Modal
            animationType = {"fade"}
            transparent={true}
            visible={sta.isVis}
            onRequestClose={() => {
              setSta({isVis: false})
            }}>

             <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
             <Image  
                 source={{uri: images}}
                 style={{height: 350,
                     width: 350,
                     margin: 12,borderWidth: 1,resizeMode: 'contain'}}
               />        
              </View>
                 </Modal> */}
       {/*
     <ImageView
        images={{source:{uri:'data:image/png;base64,'+projects[0].images}}}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
       */}
  </View>
);
{/*
return(
   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     <Text style={{fontSize:16,marginTop:5}}>Photo Screen {name}</Text>
     <View style={{marginTop:10}}>
     <Button
        title = "Upload photo"
        onPress={() => navigation.navigate('Uscreen')}
       />
     </View>

  </View>
); */}

   {/*
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize:16,marginTop:5}}>Photo Screen {id}</Text>
        <View style={{marginTop:10}}>
        <Button
           title = "Upload Picture"
           onPress={() => navigation.navigate('Uscreen',{ids:id})}
           //onPress={() => navigation.navigate('Fdetails',{name:item.id, details:item.details })}
          />
        </View>

     </View>
    ); */}
}

export default PhotoTab;