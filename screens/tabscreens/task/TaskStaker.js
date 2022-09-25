import React from 'react';
import {View, Text, Button,Image,TextInput,StyleSheet} from 'react-native';
import TaskTab from './tasktab';
import UploadTask from './UploadTask';
import WorkTask from './WorkTask';
import { createStackNavigator } from '@react-navigation/stack';

// import AsyncStorage from '@react-native-async-storage/async-storage';


const TStack = createStackNavigator();

const TaskStaker = ({route,navigation,name}) =>{


    
    return(
        <View style={{ flex: 1}}>
            <TStack.Navigator headerMode='none'>
                <TStack.Screen name="Tscreen" children={(props)=> <TaskTab {...props} name={name}/>}/>
                <TStack.Screen name="UTscreen" component={UploadTask}/>
                <TStack.Screen name="WTscreen" component={WorkTask}/>
            </TStack.Navigator>
       </View>
    );
}

export default TaskStaker;