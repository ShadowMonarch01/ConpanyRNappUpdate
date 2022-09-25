import React,{useState,useEffect} from 'react';
import {View, Text,TextInput,Image,StyleSheet,Modal,TouchableOpacity,Alert,ActivityIndicator,Button,PermissionsAndroid,ScrollView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import  Icon  from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import AsyncStorage from '@react-native-async-storage/async-storage';


//////PROFILE SCREEN

const ThirdScreen = ({navigation}) =>{

    const [id,setId] = useState('')

    const [sta,setSta]= useState({isVis:false})

    const [image,setImage] = useState({img:null})
    const [upimage,setupImage] = useState({img:null})
    const [previmage,setprevImage] = useState({img:null})

    const [vsimage,sevstupImage] = useState({isVis:false})
    const [vsname,setvsName] = useState({isVis:false})
    const [vsinfo,setvsInfo] = useState({isVis:false})
    const [vsphone,setvsPhone] = useState({isVis:false})

    const [view,setView] = useState({isVis:false})



    
    

    //const value =  AsyncStorage.getItem('name')

    const [name,setName] = useState('')

    const [info,setInfo] = useState('')

    const [phone,setPhone] = useState('')


    useEffect(()=>{
      getData()
    },[])

    
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('name')
        const ids = await AsyncStorage.getItem('id')
        const abt = await AsyncStorage.getItem('about')
        const fne = await AsyncStorage.getItem('phone')
        const pic = await AsyncStorage.getItem('propic')
        if(value !== null) {
          // value previously stored
          setName(value)
        }
        if(ids !== null) {
          // value previously stored
          setId(ids)
        }
        if(abt !== null) {
          // value previously stored
          setInfo(abt)
        }
        if(fne !== null) {
          // value previously stored
          setPhone(fne)
        }
        if(pic !== null) {
          // value previously stored
          setImage({img: 'data:image/png;base64,'+pic})
        }
        
      } catch(e) {
        // error reading value
      }
    }

    
   



    const selectFile = async () => {
      //setId(ids)

    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            'title': 'Example App',
            'message': 'Example App access to your location '
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            try {
                const res = await DocumentPicker.pick({
                  type: [DocumentPicker.types.images],
                });

                const e = res[0].uri
                setImage({img:e})
                setprevImage({img:e})
                //converting...

                const result = await RNFetchBlob.fs.readFile(e,'base64')
                
                //BASE64 IMAGE TO BE SENT
                setupImage({img:result})
                 console.log('URI : ' + result);
                
                console.log(
                 e,
                 JSON.stringify(res)
                )
              } catch (err) {
                if (DocumentPicker.isCancel(err)) {
                  // User cancelled the picker, exit any dialogs or menus and move on
                } else {
                  throw err
                }
              }
        } else {
          console.log("location permission denied")
          alert("Location permission denied");
        }
      } catch (err) {
        console.warn(err)
      }

}

//SEND SCREEN

const handleImgUpload = async () => {
  {/*
    if (!Id) {
      alert('Please enter project id');
      return;
    }
  */}

    if (!upimage.img) {
      alert('Please Select an image');
      return;
    }
    
    sevstupImage({isVis: false})
    
    ///LOADING............
    fetch('http://flaskcompanyapp-env.eba-tjwerny3.us-east-1.elasticbeanstalk.com/updateproimage', {
       method: 'POST',
       headers: {
            //Header Defination
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            "id": id,
            "image": upimage.img
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
         AsyncStorage.setItem('propic', response.propic)
         //console.log(response.data);
         setprevImage({img:null})
         setupImage({img:null})
         
        
        alert('Upload Scuessful');
        }
    })
    .catch((error) => {
        //Hide Loader
        //setLoading(false);
        console.error(error);
    });
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const handleSubmitDetailsePress = async () => {
  
  if (!name) {
    alert('Please fill in your name');
    return;
  }
  // if (!password) {
  //   alert('Please fill Password');
  //   return;
  // }
  //setLoading(true);
  
  setvsName({isVis: false})
  setvsInfo({isVis: false})
  setvsPhone({isVis: false})

  fetch('http://flaskcompanyapp-env.eba-tjwerny3.us-east-1.elasticbeanstalk.com/updateprodata', {
    method: 'POST',
    headers: {
      //Header Defination
      'Accept':'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({
      "id": id,
      "name": name,
      "info": info,
      "phone": phone
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
        console.log(response.name);
        

         AsyncStorage.setItem('name', response.name)
         AsyncStorage.setItem('about', response.about)
         AsyncStorage.setItem('phone', response.phone)
         AsyncStorage.setItem('adm', response.adm)

        //setSta({isVis: false})

      }
    })
    .catch((error) => {
      //Hide Loader
      //setLoading(false);
      alert('Please check your connection and try again');
      console.error(error);
      
    });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // initial state
    const state = {
        isVisible: false
    };

    // hide show modal
    // hide show modal
   const displayModal=(show)=>{
    setSta({isVis: show})
  }

  const displayModalImage=(show)=>{
    sevstupImage({isVis: show})
  }

  const displayModalName=(show)=>{
    setvsName({isVis: show})
  }

  const displayModalInfo=(show)=>{
    setvsInfo({isVis: show})
  }

  const displayModalPhone=(show)=>{
    setvsPhone({isVis: show})
  }
    
    
    return(
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {/* <Text>Third home tab screen</Text> */}
          <View style={{width:5000,height:120,backgroundColor:'#00BFFF'}}>
          
          </View>

          <View style = { styles.container }>


              <View style={{alignSelf:'center',flexDirection:'row',marginTop:-130}}>
                <TouchableOpacity
                onPress={()=>{setView({isVis: true})}}>
                <Image
                  source={{
                    uri: image.img,
                  }}
                  style={{height: 220,
                      width: 220,
                      
                      
                      borderRadius:900,
                      marginLeft:35,
                      borderColor:'#FFFFFF'}}
                />
                </TouchableOpacity>


                 <TouchableOpacity
                style={{backgroundColor:'black',height:50,width:50,borderRadius:50/2,marginLeft:-25,alignItems:'center',paddingTop:5}}
                onPress={() => {displayModalImage(true);}}
                 >
                   <Icon name={"pencil-sharp"} size={30} color={'#adafaa'}/>
                 </TouchableOpacity>   
              </View>

              
              {/* IMAGE MODAL */}
              <Modal
            animationType = {"fade"}
            transparent={true}
            visible={vsimage.isVis}
            onRequestClose={() => {
              Alert.alert('Modal has now been closed.');
              sevstupImage({isVis: false})
            }}>

             <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View style={{alignSelf:'center'}}>
                        <Image
                        source={{
                          uri: previmage.img,
                        }}
                        style={{height: 250,
                            width: 250,
                            resizeMode: 'stretch',}}
                         />
                    </View> 

                    <View style={{flexDirection:'column',width:200,alignSelf:'center',justifyContent:'space-between',marginTop:10}}>
                      <Button
                      title = "Pick image"
                      color= "#00BFFF"
                      onPress={selectFile}
                      
                      />
                      </View>

                    <View style={{flexDirection:'column',width:200,alignSelf:'center',justifyContent:'space-between',marginTop:25}}>
                      <Button
                      
                      title = "Upload image"
                      color= "#00BFFF"
                      onPress={handleImgUpload}
                      />
                      </View>        
               </View>
          </Modal>

          {/* CLOSE IMAGE MODAL */}


          {/* VIEW IMAGE MODAL */}
          <Modal
            animationType = {"fade"}
            transparent={true}
            visible={view.isVis}
            onRequestClose={() => {
              Alert.alert('Modal has now been closed.');
              setView({isVis: false})
            }}>

             <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View style={{alignSelf:'center'}}>
                        <Image
                        source={{
                          uri: image.img,
                        }}
                        style={{height: 450,
                            width: 350,
                            resizeMode: 'stretch',}}
                         />
                    </View> 

                      
               </View>
          </Modal>

          {/* CLOSE IMAGE MODAL */}
              
            

              <TouchableOpacity style={{marginTop:40,marginLeft:-18,borderBottomWidth:1,borderBottomColor:'#a9a9a9'}}
              onPress={()=>{displayModalName(true)}}>
              <View style={{flexDirection:'row',marginLeft:12}}>
                <Icon name={"person-sharp"} size={30} color={'#adafaa'}/>

                <View style={{marginLeft:20,marginTop:8,flexDirection:'row'}}>
                  <Text style={{fontSize:18,marginRight:12,color:"#000000"}}>Name:</Text>
                  <Text style={{fontSize:18,color:"#000000"}}>{name}</Text>
                </View>
              </View>
              </TouchableOpacity>
             
            {/* NAME MODAL */}
              <Modal
            animationType = {"fade"}
            transparent={true}
            visible={vsname.isVis}
            onRequestClose={() => {
              setvsName({isVis: false})
              Alert.alert('Modal has now been closed.');
            }}>

             <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                 <View style={{width:'70%',padding:12,paddingBottom:18,backgroundColor:'white',borderRadius:20, alignItems: 'center', justifyContent: 'center'}}>
                 {/* <ActivityIndicator size="large" color="#0000ff"  /> */}
                    
                 <TextInput
                    style={styles.input}
                    //onChangeText={onChangeText}
                    onChangeText={(pp) => setName(pp)}
                    value={name}
                   
                  />

                  <TouchableOpacity
                  style={{marginTop:30,backgroundColor:"#00BFFF",borderRadius: 6,padding:8}}
                  onPress={handleSubmitDetailsePress}>
                    <Text>Update Name</Text>
                  </TouchableOpacity>
                  </View>          
              </View>
          </Modal>
          {/* END NAME MODAL */}

            
              <TouchableOpacity style={{marginTop:40,marginLeft:-18,borderBottomWidth:1,borderBottomColor:'#a9a9a9'}}
              onPress={()=>{displayModalInfo(true)}}>
              <View style={{flexDirection:'row',marginLeft:12}}>
               <Icon name={"briefcase"} size={30} color={'#adafaa'}/>

                <View style={{marginLeft:20,marginTop:8,flexDirection:'row'}}>
                  <Text style={{fontSize:18,marginRight:12,color:"#000000"}}>About:</Text>
                  <Text style={{fontSize:18,color:"#000000"}}>{info}</Text>

                </View>
              </View>
              </TouchableOpacity>

              {/* PROFILE MODAL */}
              <Modal
            animationType = {"fade"}
            transparent={true}
            visible={vsinfo.isVis}
            onRequestClose={() => {
              Alert.alert('Modal has now been closed.');
              setvsInfo({isVis: false})
            }}>

             <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                 <View style={{width:'80%',backgroundColor:'white',borderRadius:20, alignItems: 'center', justifyContent: 'center',padding:12,paddingBottom:18}}>
                 <TextInput
                    multiline
                    style={{width:'100%',borderWidth:1,borderRadius:10,borderColor:'#a9a9a9'}}
                    //onChangeText={onChangeText}
                    onChangeText={(tt) => setInfo(tt)}
                    value={info}
                   
                  />

                  <TouchableOpacity
                  style={{marginTop:40,backgroundColor:"#00BFFF",borderRadius: 6,padding:8}}
                  onPress={handleSubmitDetailsePress}>
                    <Text>Update Profile</Text>
                  </TouchableOpacity>
                  </View>          
              </View>
          </Modal>
           {/* END PROFILE MODAL */}


              <TouchableOpacity style={{marginTop:40,marginLeft:-18, borderBottomWidth:1,borderBottomColor:'#a9a9a9'}}
              onPress={()=>{displayModalPhone(true)}}>
              <View style={{flexDirection:'row',marginLeft:12}}>
                <Icon name={"call"} size={30} color={'#adafaa'}/>

                <View style={{marginLeft:20,marginTop:8,flexDirection:'row'}}>
                  <Text style={{fontSize:18,marginRight:12,color:"#000000"}}>Phone:</Text>
                  <Text style={{fontSize:18,color:"#000000"}}>{phone}</Text>

                </View>
              </View>
              </TouchableOpacity>

              {/* PHONE MODAL */}
              <Modal
            animationType = {"fade"}
            transparent={true}
            visible={vsphone.isVis}
            onRequestClose={() => {
              Alert.alert('Modal has now been closed.');
              setvsPhone({isVis: false})
            }}>

             <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                 <View style={{width:'80%',backgroundColor:'white',borderRadius:20, alignItems: 'center', justifyContent: 'center',padding:12,paddingBottom:18}}>
                 <TextInput
                    style={styles.input}
                    //onChangeText={onChangeText}
                    onChangeText={(uu) => setPhone(uu)}
                    value={phone}
                   
                  />

                  <TouchableOpacity
                  style={{marginTop:40,backgroundColor:"#00BFFF",borderRadius: 6,padding:8}}
                  onPress={handleSubmitDetailsePress}>
                    <Text>Update Number</Text>
                  </TouchableOpacity>
                  </View>          
              </View>
          </Modal>

          {/* END PHONE MODAL */}
              
              {/* <Icon name={"document-text-outline"} size={44} color={'#01a1ec'}/> */}
        {/* <Modal
            animationType = {"fade"}
            transparent={true}
            visible={sta.isVis}
            onRequestClose={() => {
              Alert.alert('Modal has now been closed.');
            }}>

             <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                 <View style={{width:'40%',height:'20%',backgroundColor:'white',borderRadius:20, alignItems: 'center', justifyContent: 'center'}}>
                 <ActivityIndicator size="large" color="#0000ff"  />
                    
                 <Text 
                        style={styles.closeText}
                        onPress={() => {
                        setSta({isVis: false})}}>Close Modal</Text>
                  </View>          
              </View>
          </Modal> */}
                        

                        {/*
          <Spinner
          //visibility of Overlay Loading Spinner
          visible={sta.isVis}
          //Text with the Spinner
          textContent={'Loading...'}
          //Text style of the Spinner Text
          textStyle={{color: '#FFF'}}
        />
                        */}
          {/* <TouchableOpacity
              style={styles.button}
              //</View>onPress={() => {displayModal(true);}}
              >
              <Text style={styles.buttonText}>Show Modal</Text>
          </TouchableOpacity>           */}
        </View>
       </View>
       </ScrollView>
    );
}

export default ThirdScreen;

const styles = StyleSheet.create({
    container: {
      padding: 25,
      flex: 1,
      
      //justifyContent: 'center',
    },
    button: {
      display: 'flex',
      height: 60,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#2AC062',
      shadowColor: '#2AC062',
      shadowOpacity: 0.5,
      shadowOffset: { 
        height: 10, 
        width: 0 
      },
      shadowRadius: 25,
    },
    closeButton: {
      display: 'flex',
      height: 60,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FF3974',
      shadowColor: '#2AC062',
      shadowOpacity: 0.5,
      shadowOffset: { 
        height: 10, 
        width: 0 
      },
      shadowRadius: 25,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 22,
    },
    
    text: {
      fontSize: 24,
      marginBottom: 30,
      padding: 40,
    },
    closeText: {
      fontSize: 24,
      color: '#00479e',
      textAlign: 'center',
    },
    input: {
      fontSize:16,
      marginTop:10,
      marginBottom:6,
      margin: 12,
      borderWidth: 0,
      borderBottomWidth:1,
      borderBottomColor:'#a9a9a9',
      color:"#000000",
     
      
    },
  });