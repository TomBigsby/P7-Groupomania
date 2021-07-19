import { useState, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import Comments from "./Comments";
import Votes from './Votes';

import { fr } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';
const { zonedTimeToUtc } = require('date-fns-tz')

const Publication = (props) => {
    const [comments, setComments] = useState({});
    const [displayComments, setDisplayComments] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState(props.publication.postTitle);
    const [image, setImage] = useState({ preview: props.publication.imageUrl, imageUrl: "" })
    const [newComment, setNewComment] = useState("");

    const cardHeader = useRef()
    const inputTitle = useRef()
    const btEditPublication = useRef()
    const postCommentInput = useRef()
    const deleteMsgWindow = useRef()

    const currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));



    //TODO: seulement si le focus est TRUE
    /*     const onKeyPressed = (e, postId) => {
    
            if (e.key === "Enter") {
                const newTitle = inputTitle.current.value
                setTitle(newTitle)
                setIsEditMode(false)
    
                sendPostEdit(postId, newTitle)
            }
        } */



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


    const submit = (e, postId) => {
        e.preventDefault()

        editPublication()

        
        const formData = new FormData(e.target);
        formData.append("postId", postId);
        setTitle(e.target.postTitle.value)

        fetch('http://localhost:4200/api/publications/' + postId, {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json())
            .catch((error) => console.error(error));
    }


    const getImageUrl = (e) => {
        if (e.target.files.length) {
            setImage({ preview: URL.createObjectURL(e.target.files[0]), imageUrl: e.target.files[0] });
        }
    }




    ///// suppression de la publication 
    const deletePost = (postId) => {

        fetch('http://localhost:4200/api/publications/' + postId, {
            method: 'DELETE',
        })
            // .then(res => res.json(props.style.visibility = "hidden"))
            // .then(res => res.json(props.remove(1)))
            .catch((error) => console.error(error));
    }

    // Envoi d'un commentaire
    const sendComment = (postId, commentId) => {

        const formData = new FormData();
        formData.append("commentAuthorId", currentUserInfos.userId);
        formData.append("commentAuthorUserName", currentUserInfos.username);
        formData.append("commentAuthorAvatarUrl", currentUserInfos.avatarUrl);
        formData.append("commentDate", today);
        formData.append("commentAuthorMessage", postCommentInput.current.value);

        fetch('http://localhost:4200/api/publications/' + postId + '/comments', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json()
                .then(json => {
                    setComments(json);
                    if (res.error === undefined) {
                        // window.location.reload();
                    }

                }
                ))
            .catch((error) => console.error(error));
    }


    // gestion de la date affiché au temps passé
    // Attention : conversion au fomat UTC nécessaire (install package date-fns-tz)
    const today = new Date().toISOString()

    const elapsedTime = (startDate) => {
        return formatDistanceToNow(zonedTimeToUtc(startDate), { locale: fr, includeSeconds: false });
    }


    return (
        <>
            <div className="post-cache invisible" ref={deleteMsgWindow} >
                <div className="post-cache-background"></div>
                <div className="post-cache-deleteMsg">
                    <p>Confirmez-vous la suppression du message ainsi que tous ses commentaires ?</p>
                    <div className="buttons">
                        <button className="bt-cancel" onClick={() => { deleteMsgWindow.current.classList.add("invisible") }}>Non</button>
                        <button className="bt" onClick={() => { deleteMsgWindow.current.classList.add("invisible"); deletePost(props.publication._id) }}>Oui, je supprime</button>
                    </div>
                </div>
            </div>
            <div className="post-author" ref={cardHeader}>
                <div className="post-author-avatar"><img src={props.publication.avatarUrl} alt="" /></div>
                <div><span className="post-author-name">{props.publication.username} <span>&nbsp;</span><span className="post-author-date">il y a {elapsedTime(props.publication.postDate)}</span></span></div>
                <div className="post-author-pictos">
                    <div className="post-author-picto-edit" ref={btEditPublication} onClick={() => { editPublication() }}>{isEditMode ? <div><i className="fas fa-undo-alt"></i></div> : <div><i className="fas fa-edit"></i></div>}</div>
                    <div className="post-author-picto-delete" onClick={() => { deleteMsgWindow.current.classList.remove("invisible"); setDisplayComments(false) }}><i className="fas fa-trash-alt"></i></div>


                </div>
            </div>

            {isEditMode ?
                <form className="post-publication box" onSubmit={(e) => submit(e, props.publication._id)}>

                    <TextareaAutosize className="post-publication-title textareaAutosize" name="postTitle" id="titre" ref={inputTitle} defaultValue={title} />

                    <label htmlFor="upload-button">{
                        <div>
                            <div className="upload-button"><i className="fas fa-file-upload"></i> &nbsp;Charger une nouvelle image</div>
                            <div className="post-publication-image">
                                <img src={image.preview} alt="" />
                            </div>
                        </div>
                    }</label>
                    <input type="file" name="image" id="upload-button" accept=".png, .jpg, .jpeg" onChange={getImageUrl} style={{ display: "none" }} />

                    <input type="submit" name="envoyer-message" value="Envoyer la modification" className="bt" />
                </form>
                :
                <div className="post-publication box">
                    <TextareaAutosize className="post-publication-title textareaAutosize" disabled ref={inputTitle} value={title} />
                    <div className="post-publication-image">
                        <img src={image.preview} alt="" />
                    </div>
                </div>}


            <div className="post-interactions box">

                <Votes publication={props.publication} />

                <div className="separatorV"></div>
                <div className="post-interactions-comments">
                    <div className="post-interactions-comments-picto"><i className="far fa-comment "></i></div>

                    <div className="post-interactions-comments-number">{props.publication.postComments.length} commentaires</div>

                    {/* Si il y a au moins 1 commentaire le bouton s'affiche */}
                    {props.publication.postComments.length > 0 && < div onClick={() => setDisplayComments(!displayComments)}>{displayComments ? <i className="fas fa-caret-square-up" title="Masquer les commentaires"></i> : <i className="fas fa-caret-square-down" title="Afficher les commentaires"></i>}</div>}

                </div>
            </div>

            {
                displayComments &&
                <div className="post-comments box">
                    {props.publication.postComments.map((comments) => (
                        <Comments /* key={comments.commentMessage.commentId} */ commentMessage={comments} postId={props.publication._id} />
                    ))}
                </div>
            }

            <form form className="post-new-comment box" >
                <div className="post-new-comment-avatar"><img src={currentUserInfos.avatarUrl} alt="" /></div>
                <input type="text" className="post-new-comment-message" ref={postCommentInput} placeholder="Ecrire un commentaire" />

                <div className="post-new-comment-send" onClick={(e) => sendComment(props.publication._id)}><i className="fas fa-arrow-circle-right"></i></div>
                {/* <div className="post-new-comment-send">[Retour] pour envoyer</div> */}
            </form>

        </>
    )
}
export default Publication;