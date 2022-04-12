import React from "react";
import './Header.scss';
import { Link } from "react-router-dom";
import Image from "../Image/Image";


const Header = function({isLoggedIn,signOut}){
    return(
        <header className="header">
        <div className="container">
            <div className="navbar">
                <Image source="./dogPng.png" className="navbar__logo"/>
            <ul className="navbar__list">
                <li className="navbar__list__item"><Link to="/" className="navbar__list__link">Doggo Generator</Link></li>
               { isLoggedIn ? <li className="navbar__list__item"><Link to="/favourites" className="navbar__list__link">Favourites!</Link></li> :<li className="navbar__list__item"><Link  to='/login'  className="log-btn"> Log in/Sign in</Link></li>
}
                {isLoggedIn && <li className="navbar__list__item"><span onClick={()=> signOut()} className="log-btn"> Log out</span></li> }
            </ul>
            </div>
        </div>
    </header>
    )
}
export default Header