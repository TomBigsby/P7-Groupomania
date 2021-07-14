import Comments from "./Comments";
import { useState, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { fr } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';
const { zonedTimeToUtc } = require('date-fns-tz')




// let currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos")) || [];
// import myDatas from '../data/data.js';


const Publications = () => {

    const [publications, setPublications] = useState([]);
    const [likeValue, setLikeValue] = useState("");
    const [usersLikeVotes, setUsersLikeVotes] = useState({ usersLikes: "", usersDislikes: "" });
    const [comments, setComments] = useState({});
    const [displayComments, setDisplayComments] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const cardHeader = useRef()
    const inputTitle = useRef()
    const btEditTitle = useRef()
    const postCommentInput = useRef()



    const [userData, setUserData] = useState("");



    let postId

    const currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));


    const getLikeValue = (likeValue, currentPostId) => {

        setLikeValue(likeValue)

        postId = currentPostId
        sendLike(likeValue)
    }

    

    const editPublication = (publicationId) => {
        setIsEditMode(!isEditMode)


        if (isEditMode === true) {
            cardHeader.current.classList.toggle("post-author-edit")
            // FETCH
            // sendCommentEdit(publicationId, inputTitle.current.value)

        } else {
            cardHeader.current.classList.toggle("post-author-edit")
            inputTitle.current.disabled = false;
            inputTitle.current.focus()
            inputTitle.current.select()
        }

        // BUG: le changement de classe n'est pas appliqué - Si OK > mettre un toogle

    }



    // chargement des infos utilisateur (Localstorage) au chargement de la page
    // const savedUser = JSON.parse(localStorage.getItem('currentUserInfos'))

    // on récupère les publications
    useEffect(() => {
        fetch('http://localhost:4200/api/publications')
            .then((res) => res.json())
            .then((res) => setPublications(res))
            .catch((error) => console.error(error));

        const currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));
        // console.log("userId = " + currentUserInfos.userId);

        // récupération des infos utilisateur (depuis login)
        fetch('http://localhost:4200/api/auth/login/' + currentUserInfos.userId)
            .then((res) => res.json())
            .then((res) => {
                setUserData(res);


                const userDatas = {
                    avatarUrl: res.avatarUrl,
                    userJob: res.userJob,
                    userService: res.userService,
                    username: res.username,
                    userId: res._id
                }


                // BUG post ID = undefined parfois > voir d'où ça vient
                if (!res.error) {
                    localStorage.setItem("currentUserInfos", JSON.stringify(userDatas));

                }
            })
            .catch((error) => console.error(error));
    }, []);



    const sendLike = (likeValue) => {
        // console.log('likeValue : ' + likeValue);
        fetch('http://localhost:4200/api/publications/' + postId + '/like', {
            method: 'POST',
            body: JSON.stringify({
                like: likeValue,
                userId: currentUserInfos.userId
            }),
            headers: { 'Content-Type': 'application/json' }
        })

            .then(res => res.json())
            // BUG : à modifier
            .then(json => {
                // setUsersLikeVotes({ usersLikes: res.likes, usersDislikes: res.dislikes })
                console.log("likes = " + json.likes + " | dislikes = " + json.dislikes);


            }
            );

        // usersLikeVotes ===  "" ?  Publication.like : usersLikeVotes

        // console.log(usersLikeVotes);

        // console.log(publications[1].username);
    }


    // détecter le champs d'ajout d'un commentaire
    let writeComment
    const handleChange = (e) => {
        // Pourquoi je ne peux pas récupérer le contenu ce ce champ avec current.value??
        // console.log(postCommentInput.current.value); 
        // postCommentInput est un useRef
        writeComment = e.target.value
    }




    const today = new Date().toISOString()

    // Commentaires
    const getComment = (e, postId, commentId) => {
        e.preventDefault()

        // console.log(commentId);

        const formData = new FormData();

        formData.append("commentAuthorId", currentUserInfos.userId);
        formData.append("commentAuthorUserName", currentUserInfos.username);
        formData.append("commentAuthorAvatarUrl", currentUserInfos.avatarUrl);
        formData.append("commentDate", today);
        formData.append("commentAuthorMessage", writeComment);



        // Post des commentaires
        fetch('http://localhost:4200/api/publications/' + postId + '/comments', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json()
                .then(json => {
                    setComments(json);
                    console.log(res.error);
                    if (res.error === undefined) {
                        // window.location.reload();
                    }

                }
                ))
            .catch((error) => console.error(error));
    }


    // gestion de la date affiché au temps passé
    // Attention : conversion au fomat UTC nécessaire (install package date-fns-tz)

    const elapsedTime = (startDate) => {
        return formatDistanceToNow(zonedTimeToUtc(startDate), { locale: fr, includeSeconds: false });
    }

    // affiche et masque les commentaire et change le bouton 
    const displayComments2 = () => setDisplayComments(!displayComments)



    return (
        <>
            {publications.map((publication) => (
                // key={user.id}
                <div className="post-container">

                    <div className="post-author" ref={cardHeader}>
                        <div className="post-author-avatar"><img src={publication.avatarUrl} alt="" /></div>
                        <div><span className="post-author-name">{publication.username} <span>&nbsp;</span><span className="post-author-date">il y a {elapsedTime(publication.postDate)}</span></span></div>
                        <div className="post-author-pictos">
                            <div className="post-author-picto-edit" ref={btEditTitle} onClick={() => (editPublication(publication._id, publication.userId))}>{isEditMode ? <div><i className="fas fa-check-square"></i></div> : <div><i className="fas fa-edit"></i></div>}</div>
                            <div className="post-author-picto-delete"><i className="fas fa-trash-alt"></i></div>
                        </div>
                    </div>


                    <div className="post-publication box">
                        {isEditMode ?
                            <TextareaAutosize className="post-publication-title textareaAutosize" ref={inputTitle} defaultValue={publication.postTitle} />
                            :
                            <TextareaAutosize className="post-publication-title textareaAutosize" disabled ref={inputTitle} value={publication.postTitle} />}

                        <div className="post-publication-image"><img src={publication.imageUrl} alt="" /></div>
                    </div>
                    <div className="post-interactions box">
                        <div className="post-interactions-votes">

                            <div>{likeValue !== "" ? likeValue : publication.likeValue}</div>

                            {/* Quand récup UserID OK > Dans le JSX, remplacer likeValue par publication.likes / publication.dislikes */}
                            <div onClick={(() => { getLikeValue((likeValue === "" && publication.likeValue === 1) || (likeValue === 1) ? 0 : 1, publication._id) })} className={(likeValue === "" && publication.likeValue === 1) || (likeValue === 1) ? 'post-interactions-votes-like--checked' : 'post-interactions-votes-like'} >{(likeValue === "" && publication.likeValue === 1) || (likeValue === 1) ? <i className="fas fa-thumbs-up"></i> : <i className="far fa-thumbs-up"></i>}<span className="post-interactions-votes-like-number">{usersLikeVotes.usersLikes === "" ? publication.likes : usersLikeVotes.usersLikes}</span></div>

                            <div onClick={(() => { getLikeValue((likeValue === "" && publication.likeValue === -1) || (likeValue === -1) ? 0 : -1, publication._id) })} className={(likeValue === "" && publication.likeValue === -1) || (likeValue === -1) ? 'post-interactions-votes-dislike--checked' : 'post-interactions-votes-dislike'} >{(likeValue === "" && publication.likeValue === -1) || (likeValue === -1) ? <i className="fas fa-thumbs-down"></i> : <i className="far fa-thumbs-down"></i>}<span className="post-interactions-votes-dislike-number">{usersLikeVotes.usersDislikes === "" ? publication.dislikes : usersLikeVotes.usersDislikes}</span> </div>


                        </div>
                        <div className="separatorV"></div>
                        <div className="post-interactions-comments">
                            <div className="post-interactions-comments-picto"><i className="far fa-comment "></i></div>

                            <div className="post-interactions-comments-number">{publication.postComments.length} commentaires</div>


                            {/* Si il y a au moins 1 commentaire le bouton s'affiche */}
                            {publication.postComments.length > 0 && < div onClick={() => displayComments2()}>{displayComments ? <i class="fas fa-caret-square-up" title="Masquer les commentaires"></i> : <i class="fas fa-caret-square-down" title="Afficher les commentaires"></i>}</div>}


                        </div>
                    </div>


                    {displayComments &&
                        <div className="post-comments box">
                            {publication.postComments.map((comments) => (
                                <Comments commentMessage={comments} postId={publication._id} />
                            ))}
                        </div>
                    }


                    <form form className="post-new-comment box" onSubmit={getComment} >
                        <div className="post-new-comment-avatar"><img src={currentUserInfos.avatarUrl} alt="" /></div>
                        <input type="text" className="post-new-comment-message" name="postCommentInput" ref={postCommentInput} placeholder="Ecrire un commentaire" onChange={handleChange} />

                        <div className="post-new-comment-send" onClick={(e) => getComment(e, publication._id)}><i class="fas fa-arrow-circle-right"></i></div>
                        {/* <div className="post-new-comment-send">[Retour] pour envoyer</div> */}
                    </form>
                </div >
            ))
            }
        </>
    );
};

export default Publications;