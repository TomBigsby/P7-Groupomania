import { Link } from 'react-router-dom';
import { useRef } from 'react'
import avatarPlaceHolder from '../assets/images/avatar.svg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Profile = ({ setIsLoggedIn }) => {

    const history = useHistory();

    const usernameDiv = useRef();
    const usernameInput = useRef();

    const blocDisplay1 = useRef();
    const blocEdit1 = useRef();
    // const history = useHistory();

    let currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));

    let username = currentUserInfos.username


    // Fonction pour gérer la déconnexion de l'utilisateur
    const handleLogout = () => {
        // Supprimer le token du localStorage ou effectuer d'autres actions de déconnexion
        localStorage.removeItem('token');
        localStorage.removeItem('currentUserInfos');
        // Mettre à jour l'état isLoggedIn à false après la déconnexion
        setIsLoggedIn(false);
        // Rediriger vers la page de connexion ("/login")
        history.push('/login');
    };



    return (
        <div className="container">
            <div className="bt-close"><i className="fas fa-times"></i></div>
            <Link exact to="/publications" className="bt-close"><i className="fas fa-times"></i></Link>
            <div className="avatar-profile"><img src={currentUserInfos.avatarUrl === "undefined" ? avatarPlaceHolder : currentUserInfos.avatarUrl} alt="" /></div>


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
                <div className="bt-signout-account"><i className="fas fa-sign-out-alt" onClick={handleLogout}></i></div>
                <Link exact to="/supression-profil" className="bt-delete-account"><i className="far fa-trash-alt"></i></Link>
            </div>
        </div >
    );
};

export default Profile;