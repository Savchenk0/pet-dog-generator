import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Image from "../Image/Image";
import './Gallery.scss';
import {initializeApp} from "firebase/app";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth";
import {getDatabase,set,ref,update,get}  from "firebase/database";
 

const firebaseConfig = {
    apiKey: "AIzaSyD4aX4cCqJVK3dREfsgh4LhxsVPxgoHOqU",
    authDomain: "pet-dog-generator.firebaseapp.com",
    databaseURL: "https://pet-dog-generator-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pet-dog-generator",
    storageBucket: "pet-dog-generator.appspot.com",
    messagingSenderId: "397050747813",
    appId: "1:397050747813:web:06b70361c1cd34ac53664c"
  };
  
  const initFirebase = initializeApp(firebaseConfig);
  const auth = getAuth()
  const database = getDatabase(initFirebase);
  let userId;

function Gallery(){
   function deleteFromDatabase(index,id){
    get(ref(database,'users/'+id))
    .then(rsp =>rsp.toJSON())
    .then(user => user.favourites)
    .then(favourites => {
        console.log(favourites)
        const newFavourites ={}
        const favouritesArray = Object.values(favourites)
        console.log(favouritesArray)
        favouritesArray.splice(index,1)
        console.log(favouritesArray)
           for (let i = 0; i< favouritesArray.length; i++){
               newFavourites[i] = favouritesArray[i]
           }
           
           set(ref(database,'users/'+id+'/favourites'),newFavourites)

    })
   }
    async function getFavourites(){
        const user = await auth.currentUser
        userId = user.uid
        get(ref(database,'users/'+userId))
          .then(rsp => rsp.toJSON())
          .then(user => {
              if (!user.favourites){
                  setUrlArray(null)
              }
              else{
                  setUrlArray(Object.values(user.favourites))
              }
          })
    }
    const [urlArray,setUrlArray] = useState('')
    useEffect(()=>{
        getFavourites()
    },[])
    return (
    <div className="container gallery__wrapper">
        {urlArray ?
         urlArray.map((el,index)=><div className="gallery__slot" key={`slot number ${index}`}> 
        <Image source={el} className="gallery__slot__image" wrapperClassName="gallery__slot__wrapper"/>
         <Button  onClick={async ()=>{ 
             await deleteFromDatabase(index,userId)
             setUrlArray(urlArray.filter((el,ind)=> ind !== index))
             }} variant="warning"  className="gallery__remove-btn"> Remove from favourites</Button>
        </div>)
        :<p className="gallery__no-favourites">No favourites yet!</p> }
        </div>
    )
    }
export default Gallery