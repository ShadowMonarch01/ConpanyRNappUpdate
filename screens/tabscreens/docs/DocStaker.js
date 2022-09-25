import React from 'react';
import {View, Text, Button,Image,TextInput,StyleSheet} from 'react-native';
import DocumentTab from './documenttab';
import UploadDoc from './UploadDoc';
import { createStackNavigator } from '@react-navigation/stack';


const DStack = createStackNavigator();

const DocStaker = ({route,navigation,name}) =>{
    
    return(
        <View style={{ flex: 1}}>
            <DStack.Navigator headerMode='none'>
                <DStack.Screen name="Dscreen" children={(props)=> <DocumentTab {...props} name={name}/>}/>
                <DStack.Screen name="Dupscreen" component={UploadDoc}/>
            </DStack.Navigator>
       </View>
    );
}

export default DocStaker;
