import React, { useContext, useEffect } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState, createContext } from "react";
import { Link, Route, Redirect } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

//--------------Custom Hooks and Context Api-----------
//create Context
const AuthContext = createContext();
export const AuthContextProvider =(props)=>{
      const auth = Auth();
      return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>

}
//use Context
  export const useAuth =()=> {
    return useContext(AuthContext);
   }
//----------------------------------------------------
//------------Declare private route-------------------
export const PrivateRoute = ({ children, ...rest })=> {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
         auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
//----------------------------------------------------
const getUser = user => {
  const {displayName, email, photoURL} = user;
  return {name: displayName, email, photo: photoURL};
}
const Auth =()=>{
   const [user, setUser]=useState(null)
    const signInWithGoogle = ()=>{
      const provider = new firebase.auth.GoogleAuthProvider();
       return firebase.auth().signInWithPopup(provider)
        .then(res =>{
            // const {displayName, email, photoURL} = res.user;
            // const signInUser = {name: displayName, email, photo: photoURL};
            const signInUser=getUser(res.user);
            setUser(signInUser);
            return res.user       
          })
          .catch(err =>{
            setUser(null);
             return err.message;
          })
    }
    const signOut=()=>{
     return firebase.auth().signOut()
      .then(function() {
           setUser(null);
           return true;
      })
      .catch(function(error) {
         console.log(error)
         return false
      });
    }
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(function(usr){
          if(usr){
            const currUser = getUser(usr);
            setUser(currUser);
          }else{

          }
        });
    },[])
    return{
        signInWithGoogle,
        user,
        signOut        
    }
}
export default Auth;