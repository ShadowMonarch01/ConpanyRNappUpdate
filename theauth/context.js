import React from 'react';

export const AuthContext = React.createContext();

// import React,{createContext, useState} from 'react';
// // import auth from '@react-native-firebase/auth'
// // import firestore from '@react-native-firebase/firestore';
// // import { error } from 'react-native-gifted-chat/lib/utils';

// export const AuthContext = createContext();

// export const AuthProvider = ({children}) =>{
//     // const [user, setUser] = useState(null);
//     const [status, setStatus] = useState(null);
//     const [reload,setReload] = useState(false);
//     // const [admStats,setAdmStats] = useState(false);

//     // const [duserName,setDuserName] = useState('');
//     // const [dEmail,setDemail] = useState('');

//     const [project_id,seProject_id] = useState('');

//     // const [authFavorites_id,setAuthFavorites_id] = useState('');
//     // const [favoriteAdded,setFavoriteAdded] = useState(true);

//     // const [actType,setActType] = useState('');
//     // const [actDuration,setActDuration] = useState('');


//     return(
//         <AuthContext.Provider
//             value={{
//                 // user,
//                 // setUser,
//                 status,
//                 setStatus,
//                 reload,
//                 setReload,
//                 // admStats,
//                 // setAdmStats,
//                 // actType,
//                 // setActType,
//                 // actDuration,
//                 // setActDuration,
//                 // duserName,
//                 // setDuserName,
//                 // dEmail,
//                 // setDemail,
//                 // authFavorites_id,
//                 // setAuthFavorites_id,
//                 // favoriteAdded,
//                 // setFavoriteAdded,
//                 project_id,
//                 seProject_id,
//                 signIn: () => {
//                     setStatus(false)
//                   },
//                 signOut: () => {
//                 setStatus(true)
//                 },
//                 // login: async (email,password) =>{
//                 //     try{
//                 //         await auth().signInWithEmailAndPassword(email,password)
                        
//                 //     } catch(e){
//                 //         console.log(e);
//                 //     }
//                 // },
//                 // register: async (name,email, password) =>{
//                 //     try{
//                 //         await auth().createUserWithEmailAndPassword(email, password)
//                 //         .then(()=>{

//                 //             firestore().collection('users').doc(auth().currentUser.uid)
//                 //             .set({
//                 //                 name:'',
//                 //                 about:'',
//                 //                 userImage:null,
//                 //                 email:email,
//                 //                 createdAt:firestore.Timestamp.fromDate(new Date())

//                 //             })
//                 //             .catch(error =>{
//                 //                 console.log('Error creating user in firestore: ', error);
//                 //             })
//                 //         })

//                 //         .catch(error =>{
//                 //             console.log('something went wrong signing up: ', error);
//                 //         });
//                 //     } catch(e){
//                 //         console.log(e);
//                 //     }
//                 // },
//                 // logout: async () => {
//                 //     try{
//                 //         await auth().signOut();
//                 //     } catch(e){
//                 //         console.log(e)
//                 //     }
//                 // }

//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// }
