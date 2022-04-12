import React from "react";
import { Formik } from 'formik';
import './SignInForm.scss';
import {initializeApp} from "firebase/app";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth";
import {getDatabase,set,ref}  from "firebase/database";   
import { Link } from "react-router-dom";



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

const SignInForm = function({onClick}){

    return(
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (values.password.length < 6){
            errors.password = 'Pass 6 digits plus'
          }
          return errors;
        }}
        onSubmit={({email,password}, { setSubmitting,resetForm }) => {
            console.log(email,password) 
            setSubmitting(false);
            createUserWithEmailAndPassword(auth,email,password)
            .then((userCredential) =>{
            const user = userCredential.user
            console.log(user)
            set(ref(database,'users/'+user.uid),{
              email
            })
            onClick(user.uid)
            })
            .catch((error)=>{
            alert(error.message)
            })
          resetForm({values:''})
           ;
           }
          }
          
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => ( 
          <form onSubmit={handleSubmit} className="sign-in-form">
            <input
              className="sign-in-form__input"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              className="sign-in-form__input"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting} className="sign-in-form__submit" >
             Sign in!
            </button>
            <p >Already have an account? <Link to='/login'>Log in</Link></p>
            <p ><Link to='/'>Home</Link></p>
          </form>
        )}
      </Formik>
    )
};
  
  export default SignInForm;