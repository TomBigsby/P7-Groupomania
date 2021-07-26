import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import avatarPlaceHolder from '../assets/images/avatar.svg'
// import Avatar from "./Avatar";




const HeaderSmall = () => {

    const [avatarDelay, setAvatarDelay] = useState(avatarPlaceHolder)
    let currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));


    const delay = () => {
        const timer = setTimeout(() => {
            setAvatarDelay(currentUserInfos.avatarUrl);
        }, 100);
        return () => clearTimeout(timer);
    }
    delay()


    console.log("headerSmall");

    return (
        <>
            <div className="header bg-small">
                <NavLink className="logo logo-small" exact to="/"></NavLink>

                <NavLink className="bg-avatar" exact to="/profil"><img src={avatarDelay ? avatarDelay : avatarPlaceHolder} alt="" /></NavLink>


            </div>
            <div className="main-position bg-small"></div>
        </>
    );
};

export default HeaderSmall;