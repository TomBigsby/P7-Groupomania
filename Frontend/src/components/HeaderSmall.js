import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import avatarPlaceHolder from '../assets/images/avatar.svg'



const HeaderSmall = () => {

    let currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));


    console.log(currentUserInfos.avatarUrl);

    return (
        <>
            <div className="header bg-small">
                <NavLink className="logo logo-small" exact to="/"></NavLink>

                <NavLink className="bg-avatar" exact to="/profil"><img src={currentUserInfos.avatarUrl === undefined ? avatarPlaceHolder : currentUserInfos.avatarUrl} alt="" /></NavLink>


            </div>
            <div className="main-position bg-small"></div>
        </>
    );
};

export default HeaderSmall;