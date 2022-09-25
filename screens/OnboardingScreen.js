import React from 'react';
import {View, Text, Button, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';




const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);




const OnboardingScreen = ({navigation}) =>{
    return(
        <Onboarding

        
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.navigate('Root')}
        onDone={() => navigation.navigate('Root')}

        pages={[
           {
            backgroundColor: '#fff',
            image: <Image source={require('../onboardAssets/image_on_screen_2.png')} />,
            title: 'POST TASK',
            subtitle: 'Register as a company, post your task and leave the rest to the spekre team',
            },
            {
                backgroundColor: '#fff',
                image: <Image source={require('../onboardAssets/image_on_screen_3.png')} />,
                title: 'ASSIGN TASK',
                subtitle: 'Register as a company, post your task and the task is assigned to assigned to a staff',
            },
            {
                backgroundColor: '#fff',
                image: <Image source={require('../onboardAssets/image_on_screen_4.png')} />,
                title: 'READY TO WORK!',
                subtitle: 'Register as a company post your task and leave the rest to the speakre team',
            },
            
        ]}
     />
    );
};

export default OnboardingScreen;
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});