import avatarRalph from '../assets/images/avatar-ralph.jpg'
import { useState } from 'react';
import { Redirect } from 'react-router'


const NewPublication = () => {

    const [image, setImage] = useState({ preview: "", imageUrl: "" })
    const [publication, setPublication] = useState(false);
    const [error, setError] = useState({});

    // chargement des infos utilisateur (Localstorage) au chargement de la page
    const savedUser = JSON.parse(localStorage.getItem('currentUserInfos'))

    // action  à la validation du formulaire
    const submit = e => {
        e.preventDefault()

        const today = new Date()


        // FormData prends en paramètre l'élément html du formulaire et vas chercher les "name" donc nous donne un objet ayant les mêmes noms que ceux précisés dans le html
        const formData = new FormData(e.target);
        formData.append("postDate", today);
        formData.append("username", savedUser.username);

        if (e.target.postTitle.value !== "" && e.target.image.files[0] !== undefined) {

            fetch('http://localhost:4200/api/publication', {
                method: 'POST',
                body: formData,
                // headers: { 'Content-Type': 'multipart/form-data' },
            })
        } else {
            let msgAlert = ""
            if (e.target.postTitle.value === "") {
                msgAlert = "Titre manquant";
            }
            if (e.target.image.files[0] === undefined) {
                msgAlert = "Image manquante";

            }

        }

    }

    const getImageUrl = (e) => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                imageUrl: e.target.files[0]
            });
        }
    }


    return (
        <>
            <div className="post-container new-post-container">
                <div className="post-author">
                    <div className="post-author-avatar"><img src={avatarRalph} alt="" /></div>
                    <div><span className="post-author-name">{savedUser.username}</span></div>
                    {/* <div className="error-msg"> <p>{msgAlert}</p></div> */}
                </div>
                <form className="post-new-publication" onSubmit={submit}>
                    <input type="text" name="postTitle" id="titre" placeholder="Titre de la publication" />

                    <label htmlFor="upload-button">{image.preview ? <img src={image.preview} alt='' /> : (
                        <div>Charger une image</div>
                    )}</label>
                    <input type="file" name="image" id="upload-button" accept=".png, .jpg, .jpeg" onChange={getImageUrl} style={{ display: "none" }} />

                    <input type="submit" name="envoyer-message" value="Envoyer la publication" className="bt-valid" />
                    {/* {publication && <Redirect to="/publications" />} */}
                </form>
            </div>
        </>
    );
};

export default NewPublication;