import React from 'react';
import {View, Text,StyleSheet,Button} from 'react-native';

const FAllProjectsScreen = ({navigation}) =>{

    
    
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>All Projects home</Text>

          <View style={{marginTop:10}}>
          <Button
             title = "Go to details screen"
             onPress={() => navigation.navigate('Fdetails')}
            />
          </View>

          <View style={{marginTop:10}}>
          <Button
             title = "Go back to home screen"
             onPress={() => navigation.navigate('Fhome')}
            />
          </View>
       </View>
    );
}

export default FAllProjectsScreen;