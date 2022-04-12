import Image from '../../components/Image/Image';
import React from 'react';
import './PhotoGenerator.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import {initializeApp} from "firebase/app";
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


function PhotoGenerator({source,onClick,isLoggedIn,userId}){
    const initFirebase = initializeApp(firebaseConfig);
    const database = getDatabase(initFirebase);
    return(
    <div className='content-wrapper'>
        <Image className="content-image"source={source} wrapperClassName="image-wrapper"/>
      <div className='buttons-wrapper'>   
      <Button  variant="primary" onClick={()=>onClick()} className="content-generation__btn"> Get me another doggo!</Button>
        {isLoggedIn && <Button  variant="primary"  className="content-save-btn" onClick={()=>{
          get(ref(database,'users/'+userId))
          .then(rsp => rsp.toJSON())
          .then(rsp => {
            if (rsp.favourites){
              const favourites = rsp.favourites;
              const favouritesAmount = Object.keys(favourites).length
              for (let url of Object.values(favourites)){
                if (url === source){
                  return
                }
                }
                const newFavourites = {...favourites,[favouritesAmount]:source}
                console.log(newFavourites)
                update(ref(database,'users/'+userId+'/favourites'),newFavourites)
              } 
            else{
              set(ref(database,'users/'+userId+'/favourites'),{0:source})
            }
          }
          )
        }}> To Favourites</Button>}
        </div>
    </div>
    )
}




export default PhotoGenerator