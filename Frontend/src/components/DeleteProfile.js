import { NavLink } from "react-router-dom";
const DeleteProfile = () => {
    return (
        <div className="container">
            <div className="sad-pic"></div>
            <div className="msg-quit">Vous nous quittez ?</div>
            <div className="picto-warning"></div>
            <div className="text">
                <span><strong>Confirmez-vous la suppression du compte ?</strong></span><br />
                <span>Cette action est irréversible.<br />
                    Toutes vos publications seront supprimés. </span>
            </div>
            <div className="choices">
                <NavLink exact to="/profil"><button className="bt bt-stay">Non, je reste</button></NavLink>
                <NavLink exact to="/"><button className="bt bt-quit">Oui, je supprime</button></NavLink>
            </div>
        </div>
    );
};

export default DeleteProfile;