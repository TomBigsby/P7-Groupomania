import { NavLink } from "react-router-dom";
import { useState, useRef } from 'react'

const DeleteProfile = () => {

    const [isVisible, setIsVisible] = useState(true);

    const choiceToQuit = useRef()
    const confirmQuit = useRef()


    const quitMsg = () => {
        console.log('test');
        setIsVisible(!isVisible)
    }


    return (
        <>
            {isVisible ?
                <div ref={choiceToQuit}>
                    <div className="container">
                        <div className="sad-pic"></div>
                        <div className="msg-quit">Vous nous quittez ?</div>
                        <div className="picto-warning"></div>
                        <div className="text">
                            <span><strong>Confirmez-vous la suppression du compte ?</strong></span><br />
                            <span>Cette action est irréversible.</span>
                        </div>
                        <div className="choices">
                            <NavLink exact to="/profil"><button className="bt-cancel">Non, je reste</button></NavLink>
                            <button className="bt bt-quit" onClick={quitMsg} >Oui, je supprime</button>
                        </div>
                    </div>
                </div>
                :
                <div ref={confirmQuit}>
                    <div className="container">
                        <div className="cry-pic"></div>
                        <div className="msg-quit">Votre profil a été supprimé</div>
                        <div className="choices">
                            <NavLink exact to="/"><button className="bt">Retour à l'accueil</button></NavLink>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default DeleteProfile;