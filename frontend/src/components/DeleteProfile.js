import { NavLink } from "react-router-dom";
import { useState, useRef } from 'react'
import { baseUrl } from '../config'

const DeleteProfile = () => {

    const [confirmDeleted, setConfirmDeleted] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const choiceToDelete = useRef()
    const confirmDelete = useRef()

    const currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));


    const quitMsg = () => {

        // Suppression de l'utilisateur
        fetch(`${baseUrl}/api/auth/delete/` + currentUserInfos.userId, {
            method: 'DELETE',
        })
            .catch((error) => console.error(error))
            .then(res => {

                if (res.status === 200) {
                    setIsDelete(true)
                    setConfirmDeleted(!confirmDeleted)
                }
            })
    }


    return (
        <>
            {confirmDeleted ?
                <div ref={confirmDelete}>
                    <div className="container">
                        <div className="cry-pic"></div>
                        <div className="msg-quit">Votre profil a été supprimé</div>
                        <div className="choices">
                            {isDelete === true && <NavLink exact to="/"><button className="bt">Retour à l'accueil</button></NavLink>}
                        </div>
                    </div>
                </div>
                :
                <div ref={choiceToDelete}>
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
            }
        </>
    );
};

export default DeleteProfile;