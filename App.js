 import 'react-native-gesture-handler';
 import React, {useState, useEffect,useMemo, useContext } from 'react';
 import {View, Text,Image} from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 import  Icon  from 'react-native-vector-icons/Ionicons';
 
 import AsyncStorage from '@react-native-async-storage/async-storage';
//  import {AuthContext} from './theauth/context'
 import { AuthProvider, AuthContext } from './theauth/context';
 import OnboardingScreen from './screens/OnboardingScreen'
 import HomeScreen from './screens/HomeScreen'
 import ProjectScreen from './screens/ProjectScreen'
 import SignUpScreen from './screens/SignUpScreen'
//  import AsyncStorage from '@react-native-community/async-storage';
 import SplashScreen from './screens/SplashScreen';
 import SignInScreen from './screens/SignInScreen';
 import SetPasswordScreen from './screens/SetPasswordScreen';
 import ForgotPassword from './screens/ForgotPasswordScreen';
 import SendScreen from './screens/uploadscreen/SendScreen';
 import TabsScreen from './screens/tabscreens/TabsScreen';
 
 import PhotoTab from './screens/tabscreens/photo/phototab';
 
 import AllProjectsScreen from './screens/projectdetails/AllProjects';
 
 import LinearGradient from 'react-native-linear-gradient';
 
 
 
 const AppStack = createStackNavigator();
 //const Stack = createStackNavigator();
 const Drawer = createDrawerNavigator();
 const RootStack = createStackNavigator();
 const HomeStack = createStackNavigator();
 const AllProjectStack = createStackNavigator();
 const SendStack = createStackNavigator();
 const TabStack = createStackNavigator();
 
 const ProjectStack = createStackNavigator();
 
 
 
 
 //Home screen to navigate between screens
 const HomeStackScreen = ({navigation}) => (
   <HomeStack.Navigator screenOptions={{
     headerStyle:{
       backgroundColor:'#00BFFF'
     },
     headerTintColor:'#fff',
     headerTitleStyle:{
       fontWeight:'bold'
     }
   }}>
     <HomeStack.Screen name="Home" component={HomeScreen} options={{
       title:'Home',
       headerLeft:()=>(
         <Icon.Button name="menu" size={25}
         backgroundColor="#00BFFF" onPress={() =>navigation.openDrawer()}></Icon.Button>
       )
     }}/>
   </HomeStack.Navigator>
 );
 
 //Project screen to navigate between screens
 const ProjectStackScreen = ({navigation}) => (
   <ProjectStack.Navigator screenOptions={{
     headerStyle:{
       backgroundColor:'#00BFFF'
     },
     headerTintColor:'#fff',
     headerTitleStyle:{
       fontWeight:'bold'
     }
   }}>
     <ProjectStack.Screen name="Project" component={ProjectScreen} options={{
       title:'Overview',
       headerLeft:()=>(
         <Icon.Button name="menu" size={25}
         backgroundColor="#00BFFF" onPress={() =>navigation.openDrawer()}></Icon.Button>
       )
     }}/>
   </ProjectStack.Navigator>
 );
 
 // Removed for now screen where file picker was implemented
  const SendStackScreen = ({navigation}) => (
   <SendStack.Navigator screenOptions={{
     headerStyle:{
       backgroundColor:'#00BFFF'
     },
     headerTintColor:'#fff',
     headerTitleStyle:{
       fontWeight:'bold'
     }
   }}>
     <SendStack.Screen name="Send" component={SendScreen} options={{
       title:'Send Data',
       headerLeft:()=>(
         <Icon.Button name="menu" size={25}
         backgroundColor="#00BFFF" onPress={() =>navigation.openDrawer()}></Icon.Button>
       )
     }}/>
   </SendStack.Navigator>
 ); 
 
 //Tab Screens
 const TabStackScreen = ({navigation}) => (
   <TabStack.Navigator screenOptions={{
     headerStyle:{
       backgroundColor:'#00BFFF'
     },
     headerTintColor:'#fff',
     headerTitleStyle:{
       fontWeight:'bold'
     }
   }}>
     <TabStack.Screen name="Tabs" component={TabsScreen} options={{
       title:'Tabs Screen'
     }}/>
   </TabStack.Navigator>
 ); 
 
 //All projects returned
 const DallProjects = ({navigation}) => (
   <AllProjectStack.Navigator screenOptions={{
     headerStyle:{
       backgroundColor:'#00BFFF'
     },
     headerTintColor:'#fff',
     headerTitleStyle:{
       fontWeight:'bold'
     }
   }}>
     <AllProjectStack.Screen name="Tabs" component={AllProjectsScreen} options={{
       title:'All Projects',
       headerLeft:()=>(
         <Icon.Button name="menu" size={25}
         backgroundColor="#00BFFF" onPress={() =>navigation.openDrawer()}></Icon.Button>
       )
     }}/>
   </AllProjectStack.Navigator>
 ); 
 
 
 //Drawer navigation for home and project screen
 // <Drawer.Screen name="SendS" component={SendStackScreen} /> ~ Removed from implimentation for now
 const Mill = () => {
   return(
     <Drawer.Navigator initialRouteName="Home">
         <Drawer.Screen name="HomeS" component={HomeStackScreen} options={{ title: 'Home',
             drawerIcon: ({  size,color }) => (
               <Icon name={"home-sharp"} size={size} color={ color/*'#adafaa'*/}/> )       
             }}/>
         <Drawer.Screen name="ProjectS" component={ProjectStackScreen}  options={{ title: 'New Project',
             drawerIcon: ({  size,color }) => (
               <Icon name={"create-sharp"} size={size} color={ color/*'#adafaa'*/}/> )       
             }}/>
         {/* <Drawer.Screen name="SendS" component={SendStackScreen} /> */}
        {/* <Drawer.Screen name="TabS" component={TabStackScreen} />*/}
         {/* <Drawer.Screen name="Photos" component={PhotoTab} options={{
           drawerLabel: () => null,
           title:null,
           drawerIcon: () => null
         }}/> */}
         <Drawer.Screen name="AllProjectsRe" component={DallProjects}  options={{ title: 'All Projects',
             drawerIcon: ({  size,color }) => (
               <Icon name={"construct-sharp"} size={size} color={ color/*'#adafaa'*/}/> )       
             }}/> 
       </Drawer.Navigator>
   );
 }
 
 
 //HOMETABS
 
 
 
 
 //HOME TABS
 
 const Mulla = () => {
  //  const {status,setStatus} = useContext(AuthContext)
   const [status, setStatus] = useState(null)
   const [reload,setReload] = useState(false);
   const [project_id,seProject_id] = useState('');
 
 
 
   const authcontext = useMemo(() => ({
    reload,
    setReload,
    project_id,
    seProject_id,
     signIn: () => {
       setStatus(false)
     },
     signOut: () => {
       setStatus(true)
     },
   }))
 
   
 
 //   useEffect(() => {
 //     const tok = AsyncStorage.getItem('token')
 //       if (tok == null){
 //         setStatus(true)
 //       } else{
 //         setStatus(false)
 //       }
   
 //  }, []);
 
  useEffect(() => {
   AsyncStorage.getItem('token').then(value => {
    if(value === null) {
      //AsyncStorage.setItem('alreadyLaunched', 'true');
      //AsyncStorage.setItem('token','true')
      setStatus(true);
    } else{
      setStatus(false);
      //AsyncStorage.setItem('token','true')
    }
  });
 }, []);
 
   
   
 
   return(
     <AuthContext.Provider value={authcontext}>
     <RootStack.Navigator headerMode='none'>
        {status ? (
           <>
             <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
             <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
             <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
             <RootStack.Screen name="ForgotPassword" component={ForgotPassword}/>
             <RootStack.Screen name="SetPasswordScreen" component={SetPasswordScreen}/>
             
             
             
           </>
   ) : (
             <>
             <RootStack.Screen name="ElHome" component={Mill}/>
             
             </>
   )}
     </RootStack.Navigator>
     </AuthContext.Provider>
   );
 }
 
 
 const Metab = () => {
   const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
 //Welcome screens that show only when the user first installs the app
   useEffect(() => {
      AsyncStorage.getItem('alreadyLaunched').then(value => {
       if(value === null) {
         AsyncStorage.setItem('alreadyLaunched', 'true');
         //AsyncStorage.setItem('token','false')
         setIsFirstLaunch(true);
       } else{
         setIsFirstLaunch(false);
        // AsyncStorage.setItem('token','false')
       }
     });
   }, []);
 
   if(isFirstLaunch == null){
     return null;
   } else if(isFirstLaunch == true){
     return(
      
        //Starting with welcome screens 
       <AppStack.Navigator
         headerMode="none">
         <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
         <AppStack.Screen name="Root" component={Mulla} />
 
       </AppStack.Navigator>
 
      
     
     );
   } else {
     //Starting without welcome screens
     return <Mulla/>
   }
 
 }
 
 
 
 
 function App (){
 
 //Splash Screen lasts only 2 Seconds
   const [splash, setSplash] = useState(true);
   useEffect(() => {
     setTimeout(() => {
       setSplash(false);
     }, 2000);
   }, []);
 
   //Splash screen implementation would be changed in time Currently takes to longer than it should to load
 
   return splash ? 
   (
    <LinearGradient colors={['#d1f4ff', '#85e0ff', '#38cdff']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Image source={require('./onboardAssets/image_29.png')} style={{alignSelf:'center'}}/>
    
    </LinearGradient>
   ) : (
     <NavigationContainer>
     <Metab/>
   </NavigationContainer>
   );
 
  
   
 }
 
 export default App;
 