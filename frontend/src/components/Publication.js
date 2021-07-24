import { useState, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import Comments from "./Comments";
import Votes from './Votes';

import { fr } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';

const { zonedTimeToUtc } = require('date-fns-tz')

const Publication = (props) => {
    const [comments, setComments] = useState([]);
    // const [comments2, setComments2] = useState([]);
    const [displayComments, setDisplayComments] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    // const [deletePostState, setDeletePostState] = useState(false);
    const [title, setTitle] = useState(props.publication.postTitle);
    const [image, setImage] = useState({ preview: props.publication.imageUrl, imageUrl: "" })
    // const [newComment, setNewComment] = useState("");

    const cardHeader = useRef()
    const inputTitle = useRef()
    const btEditPublication = useRef()
    const postCommentInput = useRef()
    const warningDeleteMsg = useRef()

    const currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));
    const token = JSON.parse(localStorage.getItem("token"));


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
            body: formData,
            headers: { "authorization": "Bearer " + token }
        })
            .then(res => res.json())
            .catch((error) => console.error(error));
    }

    // Affichage de la preview
    const getImageUrl = (e) => {
        if (e.target.files.length) {
            setImage({ preview: URL.createObjectURL(e.target.files[0]), imageUrl: e.target.files[0] });
        }
    }

    // Récupération des commentaires
    useEffect(() => {
        fetch('http://localhost:4200/api/publications/' + props.publication._id + '/comments', {
            method: 'GET',
            headers: { "authorization": "Bearer " + token }
        })
            .then((res) => res.json())
            .then((res) => setComments(res))
            .catch((error) => console.error(error));
    }, []);


    // Ajout d'un nouveau commentaire
    const sendComment = (postId) => {

        // DEBUG
        /*     let newComment = [...comments]
    
            newComment.push({
                commentAuthorId: currentUserInfos.userId,
                commentAuthorUserName: currentUserInfos.username,
                commentAuthorAvatarUrl: currentUserInfos.avatarUrl,
                commentDate: today,
                commentAuthorMessage: postCommentInput.current.value
            }) */
        // --------------

        if (postCommentInput.current.value !== "") {

        } else {
            postCommentInput.current.classList.add("warning-field")
        }

        const formData = new FormData();
        formData.append("commentAuthorId", currentUserInfos.userId);
        formData.append("commentAuthorUserName", currentUserInfos.username);
        formData.append("commentAuthorAvatarUrl", currentUserInfos.avatarUrl);
        formData.append("commentDate", today);
        formData.append("commentAuthorMessage", postCommentInput.current.value);

        postCommentInput.current.value = ""

        fetch('http://localhost:4200/api/publications/' + postId + '/comments', {
            method: 'POST',
            body: formData,
            headers: { "authorization": "Bearer " + token }
        })
            .then((res) => res.json())
            .catch((error) => console.error(error))
            .then(() => {


                //DEBUG
                // console.log(newComment);

                /*      setComments(newComment)
                     setComments(comments) */
                // setComments2(!comments2)
            })
    }

    const typingField = (e) => {
        e.target.classList.remove("warning-field")
    }
    // FIXME
    // onBlur{e.target.classList.remove("warning-field")}



    // compteur de commentaires
    let commentsCount = [];
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].postId === props.publication._id) {
            commentsCount.push(comments[i]);
        }
    }


    // Suppression du commentaire
    const deleteComment = (commentId) => {
        fetch('http://localhost:4200/api/publications/comments/' + commentId, {
            method: 'DELETE',
        })
            .catch((error) => console.error(error))
            // MAJ des commentaires dans le DOM
            .then((res) => {
                if (!res.error) {
                    setComments(comments.filter(comment => comment._id !== commentId))
                }
            })
    }


    // gestion de la date affiché au temps passé
    // Attention : conversion au fomat UTC nécessaire (install package date-fns-tz)
    const today = new Date().toISOString()

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
                <div className="post-author-avatar"><img src={props.publication.avatarUrl} alt="" onClick={() => { props.getThisPost(props.publication._id) }} /></div>
                <div><span className="post-author-name">{props.publication.username} <span>&nbsp;</span><span className="post-author-date">il y a {elapsedTime(props.publication.postDate)}</span></span></div>

                {/* Si la publication a été créée par l'utilisateur actuel ou si c'est un admin, les boutons de modif/suppr s'affichent  */}
                {(currentUserInfos.isAdmin || currentUserInfos.userId === props.publication.userId) && <div className="post-author-pictos">
                    <div className="post-author-picto-edit" ref={btEditPublication} onClick={() => { editPublication() }}>{isEditMode ? <div><i className="fas fa-undo-alt"></i></div> : <div><i className="fas fa-edit"></i></div>}</div>
                    <div className="post-author-picto-delete" onClick={() => { warningDeleteMsg.current.classList.remove("invisible"); setDisplayComments(false) }}><i className="fas fa-trash-alt"></i></div>
                </div>}

            </div>

            {
                isEditMode ?
                    <form className="post-publication box" onSubmit={(e) => submit(e, props.publication._id)}>

                        <TextareaAutosize className="post-publication-title textareaAutosize highlight" name="postTitle" id="titre" ref={inputTitle} defaultValue={title} />

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


            <div className="post-interactions box">

                <Votes publication={props.publication} />

                <div className="separatorV"></div>
                <div className="post-interactions-comments">
                    <div className="post-interactions-comments-picto"><i className="far fa-comment "></i></div>
                    <div className="post-interactions-comments-number">{commentsCount.length} commentaires</div>

                    {/* Si il y a au moins 1 commentaire le bouton s'affiche */}
                    {commentsCount.length > 0 && < div onClick={() => setDisplayComments(!displayComments)}>{displayComments ? <i className="fas fa-caret-square-up" title="Masquer les commentaires"></i> : <i className="fas fa-caret-square-down" title="Afficher les commentaires"></i>}</div>}

                </div>
            </div>
            {/* Masquage des commentaires par défaut - clic fleche pour les afficher */}
            {displayComments && comments.map((comment) => (
                <>
                    {comment.postId === props.publication._id &&
                        <div className="post-comments box" >
                            < Comments key={comment._id} comment={comment} commentPostId={comment.postId} commentToDelete={deleteComment} /* addNewComment={ } */ />
                        </div>
                    }
                </>
            ))
            }
            <form form className="post-new-comment box" >
                <div className="post-new-comment-avatar"><img src={currentUserInfos.avatarUrl} alt="" /></div>
                <input type="text" className="post-new-comment-message" ref={postCommentInput} placeholder="Ecrire un commentaire" onChange={(e) => typingField(e)} />

                <div className="post-new-comment-send" onClick={() => sendComment(props.publication._id)}><i className="fas fa-arrow-circle-right"></i></div>
                {/* <div className="post-new-comment-send">[Retour] pour envoyer</div> */}
            </form>

        </>
    )
}
export default Publication;