import React,{useState,useContext} from 'react';
import {View, Text, Button,PermissionsAndroid,Image,TextInput,StyleSheet,Alert,TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import { AuthContext } from '../../../theauth/context';
import Spinner from 'react-native-loading-spinner-overlay';


const UploadPhoto = ({route,navigation}) =>{
    
    const {reload,setReload} = useContext(AuthContext)
    const {ids} = route.params;

    const [image,setImage] = useState({img:null})
    const [upimage,setupImage] = useState({img:null})
    const [Id, setId] = useState('');
    const [errortext, setErrortext] = useState('');

    const [sta,setSta]= useState({isVis:false})

    const selectFile = async () => {
          setId(ids)

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
                    //converting...

                    const result = await RNFetchBlob.fs.readFile(e,'base64')
                    
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

    const handleUpload = () => {
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
        
        setSta({isVis: true})
        
        fetch('http://flaskcompanyapp-env.eba-tjwerny3.us-east-1.elasticbeanstalk.com/uploadimage', {
           method: 'POST',
           headers: {
                //Header Defination
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                "id": Id,
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
             console.log(response.data);
             setImage({img:null})
             setupImage({img:null})
             setId('')
             setReload(!reload)
            //navigation.navigate('Pscreen');
            setSta({isVis: false})
            alert(response.status,
                {   title: "OK",
                    onPress: navigation.navigate("Pscreen")})           
             return;
            } else {
            setErrortext(response.data);
            console.log('An error occured try again');
            setSta({isVis: false})
            }
        })
        .catch((error) => {
            //Hide Loader
            //setLoading(false);
            setSta({isVis: false})
            console.error(error);
        });
        
    }



    //SEND SCREEN

    return(
        <View style={{flex:1}}>
            <Text style={{marginBottom:10,alignSelf:'center',color:"#000000",marginTop:10}}>Post a picture</Text>

            <View style={{alignSelf:'center'}}>
            <Image
            source={{
              uri: image.img,
            }}
            style={{height: 250,
                width: 250,
                resizeMode: 'stretch',}}
          />
           </View>
            
           {/* <TextInput
                style={styles.input}
                //onChangeText={onChangeText}
                onChangeText={(ids) => setId(ids)}
                keyboardType="numeric"
                placeholder="project id"
                value={Id}
               />               
           */}
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
             onPress={handleUpload}
            />
            </View>

        </View>
    );
}

export default UploadPhoto;

const styles = StyleSheet.create({
    
    input: {
      height: 40,
      marginTop:20,
      margin: 12,
      borderWidth: 0,
      borderBottomWidth:1,
      borderBottomColor:'#a9a9a9',
      padding: 10,
      
    },
   
});