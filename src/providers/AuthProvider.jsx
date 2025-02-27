import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   // STATE VALUES
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [darkMood, setDarkMood] = useState(false);

   console.log(loading);

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

   // UPDATE USER PROFILE INFO
   function updateUserInfo(userInfoObj) {
      setLoading(true);
      return updateProfile(auth.currentUser, userInfoObj);
   }

   // DELETE USER FROM THE FIREBASE
   function deleteUserFromFirebae() {
      setLoading(true);
      return deleteUser(auth.currentUser);
   }

   // REFETCH USER DATA FROM DATA BASE
   const refetchUser = async () => {
      const userEmail = user?.email;
      if (userEmail) {
         const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users?email=${user?.email}`);

         const userInfo = data[0]
         console.log('user info -->', userInfo)
         const newUser = {
            ...user,
            displayName: userInfo.name,
            photoURL: userInfo.photoURL,
            district: userInfo.district,
            upazila: userInfo.upazila,
            blood: userInfo.blood
         }
         setUser(newUser);
         console.log('newUser in refechUser -->', newUser)
      }

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
      logOut,
      updateUserInfo,
      refetchUser
   }

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         const email = currentUser?.email;

         if (email) {
            // when user exists with email
            axios.get(`${import.meta.env.VITE_API_URL}/users?email=${email}`)
               .then(response => {
                  const data = response.data[0];
                  console.log('user data from db -->', data)
                  currentUser.displayName = data.name;
                  currentUser.photoURL = data.photoURL;
                  currentUser.blood = data.blood;
                  currentUser.district = data.district;
                  currentUser.upazila = data.upazila;
                  currentUser.role = data.role;
                  currentUser.status = data.status;
                  currentUser.isAdmin = data.role === 'admin';
                  currentUser.isDonor = data.role === 'donor';
                  currentUser.isVolunteer = data.role === 'volunteer'
                  currentUser.isBlocked = data.status === 'blocked';

                  setUser(currentUser);
                  setLoading(false);
               }).catch(error => {
                  console.log(error.message);
               })
         } else {
            // when user does not exists
            setUser(currentUser);
            setLoading(false);
         }

      })

      return () => {
         return unsubscribe();
      }
   }, [])

   console.log('user in the auth provider -->', user);
   console.log("loading state from AuthProvider -->", loading);

   return (
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   )

}

export default AuthProvider;
