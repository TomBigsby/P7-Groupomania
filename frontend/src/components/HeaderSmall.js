import { NavLink } from "react-router-dom";
import { useState } from 'react';
import avatarPlaceHolder from '../assets/images/avatar.svg'



const HeaderSmall = () => {

    const [avatarDelay, setAvatarDelay] = useState("")
    let currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));


    const placeHolder = currentUserInfos.avatarUrl === "undefined" ? avatarPlaceHolder : currentUserInfos.avatarUrl




    const delay = () => {
        const timer = setTimeout(() => {
            currentUserInfos.avatarUrl !== "undefined" && setAvatarDelay(currentUserInfos.avatarUrl);

        }, 100);
        return () => clearTimeout(timer);
    }
    delay()


    return (
        <>
            <div className="header bg-small">
                <NavLink className="logo logo-small" exact to="/"></NavLink>0

                <NavLink className="bg-avatar" exact to="/profil"><img src={avatarDelay ? avatarDelay : placeHolder} alt="" /></NavLink>



            </div>
            <div className="main-position bg-small"></div>
        </>
    );
};

export default HeaderSmall;