import React from "react";
import SignUpForm from "../../components/SignInForm/SignInForm";
import './SignInPage.scss'


const SignInPage = function({onClick}){
    return(
        <div className="login-form__background">
        <div className="container">    
        <div className="login-form__wrapper" >
        <SignUpForm onClick={onClick}/>
        </div>
        </div>
        </div>
    )
}

export default SignInPage