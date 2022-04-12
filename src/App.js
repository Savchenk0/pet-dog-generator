import React,{ useEffect, useState } from 'react';
import {Route, Routes,Navigate} from 'react-router-dom' 
import PhotoGeneratorPage from './pages/PhotoGenerator/PhotoGeneratorPage.js';
import FavouritesPage from './pages/FavouritesPage/FavouritesPage.js';
import Header from './components/Header/Header';
import LoginPage from './pages/LoginPage/LoginPage.js';
import SignInPage from './pages/SignInPage/SignInPage.js';
import { getAuth,setPersistence,browserLocalPersistence,signOut } from "firebase/auth";
import {initializeApp} from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyD4aX4cCqJVK3dREfsgh4LhxsVPxgoHOqU",
  authDomain: "pet-dog-generator.firebaseapp.com",
  databaseURL: "https://pet-dog-generator-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pet-dog-generator",
  storageBucket: "pet-dog-generator.appspot.com",
  messagingSenderId: "397050747813",
  appId: "1:397050747813:web:06b70361c1cd34ac53664c"
};


function App() {
  const initFirebase = initializeApp(firebaseConfig);
  const auth = getAuth();
  const user = auth.currentUser   
  setPersistence(auth,browserLocalPersistence)

  const [source,setSource] = useState('')
  const [userId,setUserId] = useState('')
  const getImageURL = async function(){
    await fetch('https://dog.ceo/api/breeds/image/random')
    .then(rsp => rsp.json())
    .then(rsp => setSource(rsp.message))
  }
    useEffect(()=>{
      getImageURL() ;
    },[])
    useEffect(()=>{
      setUserId(user?.uid)
    },[user])
    console.log(user)
  return (
    <>
    <Header isLoggedIn={!!userId} signOut={()=> {
      signOut(auth)
      setUserId(null)
      }}/>
    <Routes>
    <Route path='/' element={<PhotoGeneratorPage isLoggedIn={!!userId} userId={userId} source={source} onClick={getImageURL}/>}/>
   {!userId && <>
    <Route path='/login' element ={<LoginPage isLoggedIn={!!userId} onClick={(id)=> { 
      setUserId(id)
    }}/>}/>
    <Route path='/signin' element={<SignInPage onClick={(id) =>{
            setUserId(id)
    }}/>}/>
    </>
}
{ userId &&
    <Route path='/favourites' element={<FavouritesPage userId={{userId}}/>}/>
}
    <Route
        path="*"
        element={<Navigate to="/" replace />}
    />
    </Routes>
    </>
  );
}

export default App;
