import React from 'react';
import {View, Text,StyleSheet,Button} from 'react-native';

const FProjectDetails = ({navigation}) =>{

    
    
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>FProjectDetails Screen</Text>

          <View style={{marginTop:10}}>
          <Button
             title = "Back to project"
             onPress={() => navigation.navigate('Fproject')}
            />
          </View>
       </View>
    );
}

export default FProjectDetails;