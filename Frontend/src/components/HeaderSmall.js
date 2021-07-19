import { NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';



const HeaderSmall = () => {


    // let [currentUserInfos, setCurrentUserInfos] = useState("");
    let [pause, setPause] = useState({ username: "", avatarUrl: "" });

    const avatar = useRef()


    let currentUserInfos = ""

    currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));

    useEffect(() => {
        const timer = setTimeout(() => {
            avatar.current.classList.remove("invisible");
            setPause({ username: currentUserInfos.username, avatarUrl: currentUserInfos.avatarUrl });
        }, 500);
        return () => clearTimeout(timer);
    }, []);


    return (
        <>
            <div className="header bg-small">
                <NavLink className="logo logo-small" exact to="/"></NavLink>

                {currentUserInfos && <div className="bg-username invisible" style={{ color: "black" }} >{pause.username}</div>}
                {currentUserInfos && <NavLink className="bg-avatar invisible" ref={avatar} exact to="/profil"><img src={pause.avatarUrl} alt="" /></NavLink>}
            </div>
            <div className="main-position bg-small"></div>
        </>
    );
};

export default HeaderSmall;