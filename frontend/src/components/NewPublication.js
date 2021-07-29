import { useState } from 'react';
import { Redirect } from 'react-router'
import { NavLink } from 'react-router-dom';
import avatarPlaceHolder from '../assets/images/avatar.svg'

const NewPublication = () => {

    const [image, setImage] = useState({ preview: "", imageUrl: "" })
    const [publication, setPublication] = useState(false);
    // const [error, setError] = useState({});
    const [msgAlert, setMsgAlert] = useState({ title_error: "", image__error: "" });



    // chargement des infos utilisateur (Localstorage) au chargement de la page
    const currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));
    const token = JSON.parse(localStorage.getItem("token"));

    // action  à la validation du formulaire
    const submit = e => {
        e.preventDefault()

        const today = new Date()

        // FormData prends en paramètre l'élément html du formulaire et vas chercher les "name" donc nous donne un objet ayant les mêmes noms que ceux précisés dans le html
        const formData = new FormData(e.target);
        formData.append("postDate", today);
        formData.append("username", currentUserInfos.username);
        formData.append("avatarUrl", currentUserInfos.avatarUrl);
        formData.append("userId", currentUserInfos.userId);

        if ((e.target.postTitle.value !== "") && (e.target.image.files[0] !== undefined)) {

            fetch('http://localhost:4200/api/publications', {
                method: 'POST',
                body: formData,
                // headers: { 'Content-Type': 'multipart/form-data' },
                headers: { "authorization": "Bearer " + token }
            })
                .then(res => res.json()
                    .then(json => { setPublication(json) }
                    ));

        } else {
            if (e.target.postTitle.value === "") {
                setMsgAlert({ title_error: "Titre manquant", image_error: "" })
            }
            if (e.target.image.files[0] === undefined) {
                setMsgAlert({ title_error: "", image_error: "Image manquante" })
            }
            if ((e.target.postTitle.value === "") && (e.target.image.files[0] === undefined)) {
                setMsgAlert({ title_error: "Titre manquant", image_error: "Image manquante" })
            }
        }
    }

    // Création de l'url de l'image et sa preview
    const getImageUrl = (e) => {
        if (e.target.files.length) {
            setImage({ preview: URL.createObjectURL(e.target.files[0]), imageUrl: e.target.files[0] });
        }
    }

    return (
        <>
            <div className="post-container new-post-container">
                <div className="post-author">
                    <div className="post-author-avatar"><img src={currentUserInfos.avatarUrl === undefined ? avatarPlaceHolder : currentUserInfos.avatarUrl} alt="" /></div>
                    <div><span className="post-author-name">{currentUserInfos.username}</span></div>
                    <NavLink exact to="/publications" className="bt-close"><i className="fas fa-times"></i></NavLink>
                </div>
                <form className="post-new-publication" onSubmit={submit}>
                    <input type="text" name="postTitle" id="titre" placeholder="Titre de la publication" />
                    <div className="error-msg"> <p>{msgAlert.title_error}</p></div>

                    <label htmlFor="upload-button">{
                        image.preview ?
                            <img src={image.preview} alt='' />
                            :
                            <div className="upload-button"><i className="fas fa-file-upload"></i> &nbsp;Charger une image</div>
                    }</label>
                    <input type="file" name="image" id="upload-button" accept=".png, .jpg, .jpeg" onChange={getImageUrl} style={{ display: "none" }} />
                    <div className="error-msg"> <p>{msgAlert.image_error}</p></div>
                    {/* <div className="error-msg"> {user.error && <p>{user.error}</p>}</div> */}

                    <input type="submit" name="envoyer-message" value="Envoyer la publication" className="bt" />
                    {publication.message !== undefined && <Redirect to="/publications" />}
                </form>
            </div>
        </>
    );
};

export default NewPublication;