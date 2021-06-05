import { NavLink } from 'react-router-dom';
import avatarRalph from '../assets/images/avatar-ralph.jpg'

const Profile = () => {
    return (
        <div className="container">
            <div className="bt-close"><i class="fas fa-times"></i></div>
            <NavLink exact to="/messages" className="bt-close"><i class="fas fa-times"></i></NavLink>
            <div className="avatar-profile"><img src={avatarRalph} alt="" /></div>
            <div className="name">Ralph EDWARDS
                    <div className="pictos">
                    <div className="picto picto-edit"><i class="far fa-edit"></i></div>
                </div>
            </div>
            <div className="subscription-date">Inscrit depuis 1 mois et 5 jours</div>
            <div className="service">Equipe web
                    <div className="pictos">
                    <div className="picto picto-edit"><i class="far fa-edit"></i></div>
                </div>
            </div>
            <div className="fonction">Développeur
                    <div className="pictos">
                    <div className="picto picto-edit"><i class="far fa-edit"></i></div>
                </div>
            </div>
            <div className="separatorH"></div>
            <div className="signout-delete-account">
                <NavLink exact to="/" className="bt-signout-account"><i class="fas fa-sign-out-alt"></i></NavLink>
                <NavLink exact to="/supression-profil" className="bt-delete-account"><i class="far fa-trash-alt"></i></NavLink>
            </div>
        </div>
    );
};

export default Profile;