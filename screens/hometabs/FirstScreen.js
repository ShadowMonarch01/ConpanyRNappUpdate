import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FHomeScreen from './first/FHomeScreen';
import FAllProjectsScreen from './first/FAllProjectsScreen';
import FProjectDetails from './first/FProjectDetails';
import TabsScreen from '../tabscreens/TabsScreen';
import AllProjectsScreen from '../projectdetails/AllProjects'



const FirstStack = createStackNavigator();

const FirstScreen = ({navigation}) =>{

    
    
    return(
        <FirstStack.Navigator headerMode='none'>
            <FirstStack.Screen name="Fhome" component={FHomeScreen}/>
            <FirstStack.Screen name="Fproject" component={AllProjectsScreen}/>
            <FirstStack.Screen name="Fdetails" component={TabsScreen}/>
        </FirstStack.Navigator>
    );
}

export default FirstScreen;
