import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
   // STATE VALUES
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [darkMood, setDarkMood] = useState(false);

   // CREATE USER WITH EMAIL AND PASSWORD
    const signUp = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    }

   // SIGN-IN EXISTING USER
   const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   }

   // SIGN-OUT USER
   const logOut = () => {
      setLoading(true);
      return signOut(auth)
   }

   // INFORMATION PASSED THROUCH THE AUTH CONTEXT
   const authInfo = {
      user,
      setUser,
      loading, 
      setLoading,
      darkMood, 
      setDarkMood,
      signUp,
      signIn,
      logOut
   }

   useEffect(()=> {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         setLoading(false);
      })

      return () => {
         unsubscribe();
      }
   }, [])

   console.log(`user in the auth provider --> ${user}`);

   return(
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   )

}

export default AuthProvider;
