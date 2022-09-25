import React,{useState,useEffect,useContext} from 'react';
import {View, Text,StyleSheet,Button,RefreshControl,Image,TouchableOpacity,Modal,Platform,FlatList} from 'react-native';
import OpenFile from 'react-native-files-viewer';
import { useIsFocused } from '@react-navigation/native';
import  Icon  from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../../theauth/context';

const DocumentTab = ({route,navigation,name}) =>{

  const {reload,
    setReload,
    project_id,
    seProject_id,} = useContext(AuthContext)

    const [id,setId] = useState(project_id)

    const [animating, setAnimating] = useState(false);

    const [refreshing,setRefreshing] = useState(true)

    const [projects, setProjects] = useState([])

    const [dfile,setDfile] = useState('')

    const isFocused = useIsFocused();

    ////////
    useEffect(()=>{
        setProjects([])
        setId(name)
        onRefresh()
        //getData();
          // setRefreshing(true)
   
     },[reload])
   
     const getData = () =>{
       setId(project_id)
       setProjects([])
   
       fetch('http://flaskcompanyapp-env.eba-tjwerny3.us-east-1.elasticbeanstalk.com/getprojectdocs',{
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
              setProjects(response.data)
              setRefreshing(false)
             })
             .catch((error) => {
                 console.error(error);
             });
     };

    ////////
    function cb() {
        setAnimating(false);
      }


    /////////
    function handlePressb64() {
        setAnimating(true);
        if (Platform.OS === 'android') {
          OpenFile.openDocb64(
            {
              base64:dfile,
              fileName: 'sample',
              fileType: 'pdf',
              cache: true,
            },
            cb,
          );
        }
        
      }
    ///////////

    const renderItem = ({item}) => {
        //var tss ='data:image/png;base64,'
        //var oss = tss.concat(item.images)
       return(
         <TouchableOpacity
          onPress={() => {
           // setImages(oss)
            setDfile(item.documents);
            handlePressb64()
            

          }}
          // onPress={() => openImg()}
         >
             <View style={{flex:1,flexDirection:'column', justifyContent: 'space-between', alignItems:'stretch',backgroundColor:'#FFFFFF',borderRadius:10,padding:15,marginTop:10,marginBottom:10}}>
                 <View style={{flexDirection:'row',alignItems:'center',alignSelf:'stretch',width:290}}>
                   <Icon name={"document-text-outline"} size={44} color={'#01a1ec'}/>
                   <Text style={{fontSize:16,color:"#000000"}}>{item.name}</Text>
                </View>
             </View>
    
             
       </TouchableOpacity>
       )
     }
    //////////
      const onRefresh = () =>{
        setId(name)
        setProjects([])
        setRefreshing(true)
        getData()
      }
    
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{marginTop:8}}></Text>
        
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
        <Button
           title = "Upload Document"
           onPress={() => navigation.navigate('Dupscreen',{ids:id})}
          />

        <TouchableOpacity
          onPress={() => navigation.navigate('Dupscreen',{ids:id})}
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
        

     </View>
    );
}

export default DocumentTab;