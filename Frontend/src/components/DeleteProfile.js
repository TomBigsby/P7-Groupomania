const DeleteProfile = () => {
    return (
        <div>
            <div className="container">
                <div className="sad-pic"></div>
                <div className="msg-quit">Vous nous quittez ?</div>
                <div className="picto-warning"></div>
                <div className="text">
                    <span><strong>Confirmez-vous la suppression du compte ?</strong><br/>
                    Cette action est irréversible.<br/>
                    Tous vos messages seront supprimés. </span>
                </div>
                <div className="choices">
                    <button className="bt bt-stay">Non, je reste</button>
                    <button className="bt bt-quit">Oui, je supprime</button>
                </div>

            </div>
        </div>
    );
};

export default DeleteProfile;