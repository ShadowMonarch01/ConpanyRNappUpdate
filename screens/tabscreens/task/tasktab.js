import React,{useState,useEffect,useContext} from 'react';
import {View, Text,StyleSheet,Modal,Button,FlatList,TouchableOpacity,Image,RefreshControl,TextInput} from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
// import CheckBox from '@react-native-community/checkbox';
//import { TextInput } from 'react-native-gesture-handler';
import { AuthContext } from '../../../theauth/context';



const TaskTab = ({route,navigation,name}) =>{

  const {reload,
    setReload,
    project_id,
    seProject_id,} = useContext(AuthContext)

    const [id,setId] = useState(name)

    const [projects, setProjects] = useState([])

    const [refreshing,setRefreshing] = useState(true)

    //const [id,setId] = useState(name)

    const isFocused = useIsFocused();

    // const [show,setShow] = useState(false)

    const [starter,setStater] = useState({isVis:false})

    const [viewer,setViewer] = useState({isVis:false})

    const [show,setShow] = useState(false)

    



    useEffect(()=>{
    
      setProjects([])
       setId(project_id)
       
       
       getData();
       setRefreshing(true)
  
    },[reload])


    const getData = () =>{
      setId(project_id)
      setProjects([])
  
      fetch('http://flaskcompanyapp-env.eba-tjwerny3.us-east-1.elasticbeanstalk.com/getprojecttask',{
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


    const renderItem = ({item}) => {
      //var tss ='data:image/png;base64,'
      var oss = item.task
     return(
       <TouchableOpacity
       // onPress={() => {
        //  setImages(oss)
        //  displayModal(true)
        //}}
        onPress={() => navigation.navigate('WTscreen',{iids:item.id,itask:item.task,idt:name})}
       >
           <View style={{flexDirection:'column', justifyContent: 'space-between', backgroundColor:'#FFFFFF',borderRadius:10,padding:5,marginTop:10,marginBottom:10}}>
             <View style={{padding:10,margin:10,width:280}}>
                 <Text style={{color:"#000000"}}>{item.task}</Text>
              </View>
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
          {/* <Text style={{color:"#000000"}}>Tasks {id}</Text> */}

          <FlatList
            ListHeaderComponent={() => {
            return(<Text style={{color:"#000000",alignSelf:'center',marginTop:10,marginBottom:8}}>Project Tasks</Text>)
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

         <TouchableOpacity
            onPress={() => navigation.navigate('UTscreen',{ids:id})}
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

export default TaskTab;
const styles = StyleSheet.create({
  
  input: {
    height: 40,
    marginTop:16,
    marginBottom:6,
    margin: 12,
    borderWidth: 0,
    borderBottomWidth:1,
    borderBottomColor:'#a9a9a9',
   
    
  },
});