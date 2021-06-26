import {NavLink} from "react-router-dom";
import avatarRalph from '../assets/images/avatar-ralph.jpg'

const HeaderSmall = () => {
    return (
        <>
            <div className="header bg-small">
                <NavLink className="logo logo-small" exact to="/"></NavLink>
                <NavLink className="bg-avatar" exact to="/profil"><img src={avatarRalph} alt="" /></NavLink>
            </div>
            <div className="main-position bg-small"></div>
        </>
    );
};

export default HeaderSmall;