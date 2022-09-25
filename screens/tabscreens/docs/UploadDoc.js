import React,{useState,useContext} from 'react';
import {View, Text, Button,PermissionsAndroid,Image,TextInput,StyleSheet,Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import { AuthContext } from '../../../theauth/context';
import Spinner from 'react-native-loading-spinner-overlay';



const UploadDoc = ({route,navigation}) =>{
    const{reload,setReload} = useContext(AuthContext)
    const {ids} = route.params;

    //const [image,setImage] = useState({img:null})
    const [upPdf,setupPdf] = useState({pdf:null})
    const [Id, setId] = useState('');
    const [fname,setFname] = useState('');
    const [ftype,setFtype] = useState('');
    const [fsize,setFsize] = useState('');
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
                      type: [DocumentPicker.types.pdf],
                    });

                    const e = res[0].uri
                    //setImage({img:e})
                    //converting...

                    const result = await RNFetchBlob.fs.readFile(e,'base64')
                    setupPdf({pdf:result})

                    for (const info of res){
                      setFname(info.name)
                      setFtype(info.type)
                      setFsize(info.size)
                    }
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
        if (!upPdf.pdf) {
          alert('Please Select document');
          return;
        }
       
        setSta({isVis: true})
        
        fetch('http://flaskcompanyapp-env.eba-tjwerny3.us-east-1.elasticbeanstalk.com/pdfupload', {
           method: 'POST',
           headers: {
                //Header Defination
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                "id": Id,
                "pdf": upPdf.pdf,
                "docname":fname
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
             //setImage({img:null})
             setupPdf({pdf:null})
             setId('')
             setFname('')
             setFtype('')
             setFsize('')
             setReload(!reload)
             
            //navigation.replace('ElHome');
            setSta({isVis: false})
             alert(response.status,
                {   title: "OK",
                    onPress: navigation.navigate("Dscreen")}).           
             return;
            } else {
            setErrortext(response.msg);
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
            <Text style={{marginBottom:10,alignSelf:'center',color:"#000000",marginTop:10}}>Post pdf document</Text>

            <Text style={{marginTop:20,marginBottom:10,color:"#000000",marginLeft:10}}>Name: {fname}</Text>
            <Text style={{marginTop:10,marginBottom:10,color:"#000000",marginLeft:10}}>Type: {ftype}</Text>
            <Text style={{marginTop:10,marginBottom:30,color:"#000000",marginLeft:10}}>Size: {fsize}</Text>
            
          {/*  
            <TextInput
                style={styles.input}
                //onChangeText={onChangeText}
                onChangeText={(ids) => setId(ids)}
                keyboardType="numeric"
                placeholder="project id"
                value={Id}
               />               
          */}
          <View style={{flexDirection:'column',width:200,alignSelf:'center',justifyContent:'space-between'}}>
            <Button
             title = "Pick pdf document"
             color= "#00BFFF"
             onPress={selectFile}
             
            />
          </View>

          <View style={{flexDirection:'column',width:200,alignSelf:'center',justifyContent:'space-between',marginTop:20}}>
            <Button
             
             title = "Upload Document"
             color= "#00BFFF"
             onPress={handleUpload}
            />
            </View>

            <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
              <Spinner
              //visibility of Overlay Loading Spinner
              visible={sta.isVis}
              //Text with the Spinner
              textContent={'Uploading...'}
              //Text style of the Spinner Text
              textStyle={{color: '#FFF'}}
            />
          </View>
        </View>
    );
}

export default UploadDoc;

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