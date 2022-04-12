import React from 'react';
import './PhotoGeneratorPage.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import PhotoGenerator from '../../components/PhotoGenerator/PhotoGenerator';



function PhotoGeneratorPage({source,onClick,isLoggedIn,userId}){
    return(
      <PhotoGenerator source={source} userId={userId} isLoggedIn={isLoggedIn} onClick={onClick}/>
    )
}




export default PhotoGeneratorPage