import { useState, useEffect, useRef } from 'react';
import { serverUrl } from '../config';
import TextareaAutosize from 'react-textarea-autosize';
import Comments from "./Comments";
import avatarPlaceHolder from '../assets/images/avatar.svg'
// import Votes from './Votes';


import { fr } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';
import { format } from 'date-fns'



const { zonedTimeToUtc } = require('date-fns-tz')

const Publication = (props) => {

    const [comments, setComments] = useState([]);
    // const [comments2, setComments2] = useState([]);
    const [displayComments, setDisplayComments] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState(props.publication.postTitle);
    const [image, setImage] = useState({ preview: props.publication.imageUrl, imageUrl: "" })
    const [commentsCount, setCommentsCount] = useState(0);

    const cardHeader = useRef()
    const inputTitle = useRef()
    const btEditPublication = useRef()
    const postCommentInput = useRef()
    const warningDeleteMsg = useRef()

    const currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));
    const token = JSON.parse(localStorage.getItem("token"));

    // edition de la publication 
    const editPublication = () => {
        setIsEditMode(!isEditMode)

        // Au moment du clic, d'état de isEditMode actuel est...
        if (isEditMode === true) {
            cardHeader.current.classList.toggle("post-author-edit")

        } else {
            cardHeader.current.classList.toggle("post-author-edit")

            inputTitle.current.disabled = false;
            inputTitle.current.focus()
            inputTitle.current.select()
        }
    }

    const submit = (event, postId) => {
        event.preventDefault()

        editPublication()

        const formData = new FormData(event.target);
        formData.append("postId", postId);

        setTitle(event.target.postTitle.value)

        fetch(`${serverUrl}/api/publications/` + postId, {
            method: 'PUT',
            body: formData,
            headers: { "authorization": "Bearer " + token }
        })
            .then(res => res.json())
            .catch((error) => console.error(error));
    }

    // Affichage de la preview
    const getImageUrl = (event) => {
        if (event.target.files.length) {
            setImage({ preview: URL.createObjectURL(event.target.files[0]), imageUrl: event.target.files[0] });
        }
    }


    // Récupération des commentaires
    useEffect(() => {
        fetch(`${serverUrl}/api/publications/' + props.publication._id + '/comments`, {
            method: 'GET',
            headers: { "authorization": "Bearer " + token }
        })
            .then((res) => res.json())
            .then((res) => {
                setComments(res);
                setCommentsCount(res.filter(comment => comment.postId === props.publication._id).length);
            })
            .catch((error) => console.error(error));
    }, [props.publication._id, token]);


    // Ajout d'un nouveau commentaire
    const sendComment = (postId) => {
        // Avertisseur visuel si le champ est vide à la validation
        if (postCommentInput.current.value !== "") {
            const formData = new FormData();
            formData.append("commentAuthorId", currentUserInfos.userId);
            formData.append("commentAuthorUserName", currentUserInfos.username);
            formData.append("commentAuthorAvatarUrl", currentUserInfos.avatarUrl);
            formData.append("commentDate", today);
            formData.append("commentAuthorMessage", postCommentInput.current.value);

            // réinitialisation du champ de texte
            postCommentInput.current.value = "";

            fetch(`${serverUrl}/api/publications/` + postId + '/comments', {
                method: 'POST',
                body: formData,
                headers: { "authorization": "Bearer " + token }
            })
                .then((res) => {
                    if (res.ok) {
                        // Le nouveau commentaire a été ajouté avec succès, récupérer la réponse JSON avec les détails du nouveau commentaire (si besoin)
                        return res.json();
                    } else {
                        throw new Error('Une erreur est survenue lors de l\'ajout du commentaire.');
                    }
                })
                .then((data) => {
                    // Mettre à jour l'état comments en ajoutant le nouveau commentaire à la liste existante
                    setComments([...comments, data]);
                    setCommentsCount(commentsCount + 1);
                    setDisplayComments(true);
                })
                .catch((error) => console.error(error));


        } else {
            postCommentInput.current.classList.add("warning-field")
            postCommentInput.current.blur();
        }
    }

    // envoi du message en tapant la touche Entrer
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendComment(props.publication._id);
        }
    };

    // Permet d'éviter que la page se recharge à la validation du formulaire
    const handleFormSubmit = (event) => {
        event.preventDefault(); // Empêche le rechargement de la page par défaut
        sendComment(props.publication._id);
        postCommentInput.current.blur(); // Supprime le focus de l'élément input

    };

    // supprime la bordure de warning si le champ n'est plus vide
    const typingField = (event) => {
        event.target.classList.remove("warning-field")
    }

    // supprime la bordure de warning si le champ n'a plus le focus
    const handleBlur = () => {
        if (postCommentInput.current.value === "") {
            postCommentInput.current.classList.remove("warning-field");
        }
    };




    // Suppression du commentaire
    const deleteComment = (_id) => {
        fetch(`${serverUrl}/api/publications/comments/` + _id, {
            method: 'DELETE',
            headers: { "authorization": "Bearer " + token }
        })
            .then((res) => {
                if (res.ok) {
                    // La suppression a réussi, mettre à jour l'état comments en filtrant les commentaires pour exclure celui supprimé
                    setComments(comments.filter(comment => comment._id !== _id));
                    setCommentsCount(commentsCount - 1);
                } else {
                    throw new Error('Une erreur est survenue lors de la suppression du commentaire.');
                }
            })
            .catch((error) => console.error(error));
    }


    // gestion de la date affiché au temps passé
    // Attention : conversion au fomat UTC nécessaire (install package date-fns-tz)
    const today = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")

    const elapsedTime = (startDate) => {
        return formatDistanceToNow(zonedTimeToUtc(startDate), { locale: fr, includeSeconds: false });
    }



    return (
        <>
            {/* panneau de suppression de publication */}
            <div className="post-cache invisible" ref={warningDeleteMsg} >
                <div className="post-cache-background"></div>
                <div className="post-cache-deleteMsg">
                    <p>Confirmez-vous la suppression du message ainsi que tous ses commentaires ?</p>
                    <div className="buttons">
                        <button className="bt-cancel" onClick={() => { warningDeleteMsg.current.classList.add("invisible") }}>Non</button>
                        <button className="bt" onClick={() => { warningDeleteMsg.current.classList.add("invisible"); props.postToDelete(props.publication._id) }}>Oui, je supprime</button>
                    </div>
                </div>
            </div>


            <div className="post-author" ref={cardHeader}>
                <div className="post-author-avatar"><img src={props.publication.avatarUrl === "undefined" ? avatarPlaceHolder : props.publication.avatarUrl} alt="" /></div>
                <div>
                    <span className="post-author-name">{props.publication.username} <span>&nbsp;</span>
                        <span className="post-author-date">il y a {elapsedTime(props.publication.postDate)}</span>
                    </span>
                </div>

                {/* Si la publication a été créée par l'utilisateur actuel ou si c'est un admin, les boutons de modif/suppr s'affichent  */}
                {(currentUserInfos.isAdmin || currentUserInfos.userId === props.publication.userId) && <div className="post-author-pictos">
                    <div className="post-author-picto-edit" ref={btEditPublication} onClick={() => editPublication()}>{isEditMode ? <div><i className="fas fa-undo-alt"></i></div> : <div><i className="fas fa-edit"></i></div>}</div>
                    <div className="post-author-picto-delete" onClick={() => { warningDeleteMsg.current.classList.remove("invisible"); setDisplayComments(false) }}><i className="fas fa-trash-alt"></i></div>
                </div>}

            </div>

            {
                isEditMode ?
                    <form className="post-publication box" onSubmit={(e) => submit(e, props.publication._id)}>

                        <TextareaAutosize className="post-publication-title textareaAutosize highlights" name="postTitle" id="titre" ref={inputTitle} defaultValue={title} />

                        <label htmlFor="upload-button">{
                            <div>
                                <div className="upload-button"><i className="fas fa-file-upload"></i> &nbsp;Charger une nouvelle image</div>
                                <div className="post-publication-image">
                                    <img src={image.preview} alt="" />
                                </div>
                            </div>
                        }</label>
                        <input type="file" name="image" id="upload-button" accept=".png, .jpg, .jpeg" onChange={getImageUrl} style={{ display: "none" }} />

                        <input type="submit" name="envoyer-message" value="Valider la modification" className="bt" />
                    </form>
                    :
                    <div className="post-publication box">
                        <TextareaAutosize className="post-publication-title textareaAutosize" disabled ref={inputTitle} value={title} />
                        <div className="post-publication-image">
                            <img src={image.preview} alt="" />
                        </div>
                    </div>
            }


            <form form="true" className="post-new-comment box" onSubmit={handleFormSubmit} >
                <div className="post-new-comment-avatar"><img src={currentUserInfos.avatarUrl === undefined ? avatarPlaceHolder : currentUserInfos.avatarUrl} alt="" /></div>
                <input
                    type="text"
                    className="post-new-comment-message"
                    ref={postCommentInput} placeholder="Ecrire un commentaire"
                    onChange={(e) => typingField(e)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                />

                <div className="post-new-comment-send" onClick={() => sendComment(props.publication._id)}><i className="fas fa-arrow-circle-right"></i></div>
                {/* <div className="post-new-comment-send">[Retour] pour envoyer</div> */}
            </form>

            <div className="post-interactions box">
                <div className="separatorV"></div>
                <div className="post-interactions-comments">
                    <div className="post-interactions-comments-picto"><i className="far fa-comment "></i></div>
                    <div className="post-interactions-comments-number">{commentsCount < 2 ? commentsCount + " commentaire" : commentsCount + " commentaires"} </div>

                    {/* Si il y a au moins 1 commentaire le bouton s'affiche */}
                    {commentsCount > 0 && < div onClick={() => setDisplayComments(!displayComments)}>{displayComments ?
                        <>
                            <i className="fas fa-caret-square-up" title="Masquer les commentaires"></i>
                        </>
                        :
                        <i className="fas fa-caret-square-down" title="Afficher les commentaires"></i>}
                    </div>}
                </div>
            </div>

            {/* Masquage des commentaires par défaut - clic fleche pour les afficher */}
            {displayComments && comments
                // tri du plus récent au plus ancien commentaire
                .filter(comment => comment.postId === props.publication._id)
                .sort((a, b) => new Date(b.commentDate) - new Date(a.commentDate))
                .map((comment) => (
                    <div key={comment._id} >
                        {
                            comment.postId === props.publication._id &&
                            <div className="post-comments box">
                                < Comments comment={comment} commentPostId={comment.postId} commentToDelete={deleteComment} />
                            </div>
                        }
                    </div >
                ))
            }
            <div className={displayComments ? 'close-comments' : 'close-comments hidden'} title="Fermer le volet des commentaires" onClick={() => setDisplayComments(!displayComments)}>
                <i className="fas fa-caret-up" title="Masquer les commentaires"></i>
            </div>

        </>
    )
}
export default Publication;