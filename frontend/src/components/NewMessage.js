import { NavLink } from 'react-router-dom'
import avatarRalph from '../assets/images/avatar-ralph.jpg'

const NewMessage = () => {
    return (
        <div className="post-container new-post-container">
            <div className="post-author">
                <div className="post-author-avatar"><img src={avatarRalph} alt="" /></div>
                <div><span className="post-author-name">Ralph EDWARDS</span></div>
            </div>
            <div className="post-new-message">
                <input type="text" id="titre" placeholder="Votre titre" />
                <button className="new-post-load-image">Charger une image</button>
                <div className="new-post-image"><img src="https://picsum.photos/id/1025/500/300" alt="" /></div>
                <NavLink className="navlink-bt-valid" exact to="/messages"><button className="bt-valid">Envoyer message</button></NavLink>
            </div>
        </div>
    );
};

export default NewMessage;