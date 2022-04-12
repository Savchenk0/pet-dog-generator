import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import './LoginPage.scss'


const LoginPage = function({onClick,loggedIn}){
    return(
        
        <div className="login-form__background">
        <div className="container">    
        <div className="login-form__wrapper" >
        <LoginForm onClick={onClick}/>
        </div>
        </div>
        </div>
        
    )
}

export default LoginPage