import { NavLink } from 'react-router-dom';
import { useRef } from 'react'

const Profile = () => {

    const usernameDiv = useRef();
    const usernameInput = useRef();

    const blocDisplay1 = useRef();
    const blocEdit1 = useRef();



    let currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));

    let username = currentUserInfos.username


    return (
        <div className="container">
            <div className="bt-close"><i className="fas fa-times"></i></div>
            <NavLink exact to="/publications" className="bt-close"><i className="fas fa-times"></i></NavLink>
            <div className="avatar-profile"><img src={currentUserInfos.avatarUrl} alt="" /></div>


            <div className="blocDisplay" ref={blocDisplay1}>
                <div className="divRow">
                    <div className="username" ref={usernameDiv}>{username} </div>
                </div>
            </div>
            <div className="bloc-edit invisible" ref={blocEdit1}>
                <div className="divRow">
                    <input className="edit-field" type="text" defaultValue={username} ref={usernameInput} />
                </div>
            </div>


            <div className="separatorH"></div>
            <div className="signout-delete-account">
                {/*  en cliquant sur le bouton on supprime le token du localStorage et on redirection page login */}
                <NavLink exact to="/" className="bt-signout-account"><i className="fas fa-sign-out-alt" onClick={() => localStorage.removeItem('token')}></i></NavLink>
                <NavLink exact to="/supression-profil" className="bt-delete-account"><i className="far fa-trash-alt"></i></NavLink>
            </div>
        </div >
    );
};

export default Profile;