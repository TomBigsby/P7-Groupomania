import avatarRalph from '../assets/images/avatar-ralph.jpg';
import { useState, useEffect } from 'react';
import { fr } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';

const { zonedTimeToUtc } = require('date-fns-tz')


// let currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos")) || [];
// import myDatas from '../data/data.js';


const Publications = () => {

    const [publications, setPublications] = useState([]);
    const [likeValue, setLikeValue] = useState("");

    let postId

    const currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));


    const triggerToggle = (likeValue, currentPostId) => {

        setLikeValue(likeValue)

        postId = currentPostId
        sendLike(likeValue)
    }



    // console.log(currentUserInfos.email);


    // chargement des infos utilisateur (Localstorage) au chargement de la page
    // const savedUser = JSON.parse(localStorage.getItem('currentUserInfos'))


    // on récupère les publications
    useEffect(() => {
        fetch('http://localhost:4200/api/publications')
            .then((res) => res.json())
            .then((res) => setPublications(res))
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

        /*    .then(res => res.json()
               .then(json => setLikeDisplay(json)
               )); */


        // console.log(publications[1].username);
    }





    // Commentaires
    const today = new Date()


    const getComment = (e) => {
        e.preventDefault()

        // const postId2 = currentPostId

        const formData = new FormData(e.target);
        // formData.append("commentId", postId2);
        formData.append("commentAuthorId", currentUserInfos.userId);
        formData.append("commentAuthorUserName", currentUserInfos.username);
        formData.append("commentAuthorAvatarUrl", currentUserInfos.avatarUrl);
        formData.append("commentAuthorCommentDate", today);
        // formData.append("commentAuthorMessage", e.target.postCommentInput.value);

        // sendComment()

        console.log(formData);

    }


    const sendComment = () => {

        fetch('http://localhost:4200//api/publications/' + postId + '/comments', {
            method: 'POST',
            // body: formData,

        })
        /* .then(res => res.json()
            .then(json => setPublication(json)
            )); */
    }



    //---------------




    // gestion de la date affiché au temps passé
    // Attention : conversion au fomat UTC nécessaire (install package date-fns-tz)
    const elapsedTime = (startDate) => {
        return formatDistanceToNow(zonedTimeToUtc(startDate), { locale: fr, includeSeconds: false });
    }

    return (
        <>
            {publications.map((publication) => (
                // key={user.id}
                <div className="post-container">

                    <div className="post-author box">
                        <div className="post-author-avatar"><img src={publication.avatarUrl} alt="" /></div>
                        <div><span className="post-author-name">{publication.username} <span>&nbsp;</span><span className="post-author-date">il y a {elapsedTime(publication.postDate)}</span></span></div>
                        <div className="icon-edit">
                            <div><i className="fas fa-edit"></i></div>
                            <div><i className="fas fa-trash-alt"></i></div>
                        </div>
                    </div>
                    <div className="post-publication box">
                        <div className="post-publication-title" key={publication.postId}>{publication.postTitle}</div>
                        <div className="post-publication-image"><img src={publication.imageUrl} alt="" /></div>
                    </div>
                    <div className="post-interactions box">
                        <div className="post-interactions-votes">


                            <div>{likeValue}</div>

                            {/* Quand récup UserID OK > Dans le JSX, remplacer likeValue par publication.likes / publication.dislikes */}
                            <div onClick={((e) => { triggerToggle(likeValue === 1 ? 0 : 1, publication._id) })} className={likeValue === 1 ? 'post-interactions-votes-like--checked' : 'post-interactions-votes-like'} >{likeValue === 1 ? <i className="fas fa-thumbs-up"></i> : <i className="far fa-thumbs-up"></i>}<span className="post-interactions-votes-like-number">{publication.likes}</span></div>

                            <div onClick={((e) => { triggerToggle(likeValue === -1 ? 0 : -1, publication._id) })} className={likeValue === -1 ? 'post-interactions-votes-dislike--checked' : 'post-interactions-votes-dislike'} >{likeValue === -1 ? <i className="fas fa-thumbs-down"></i> : <i className="far fa-thumbs-down"></i>}<span className="post-interactions-votes-dislike-number">{publication.dislikes}</span> </div>


                        </div>
                        <div className="separatorV"></div>
                        <div className="post-interactions-comments">
                            <div className="post-interactions-comments-picto"><i className="far fa-comment "></i></div>

                            {/* <div className="post-interactions-comments-number">{publication.postComments.length} commentaires</div> */}
                        </div>
                    </div>
                    <div className="post-comments box">
                        {/* {publication.postComments.map((comments) => ( */}
                        <div className="post-comment">
                            <div className="post-comment-bloc1">
                                <div className="post-comment-bloc1-a">
                                    {/* <div className="post-comment-avatar"><img src={comments.commentAuthorAvatarUrl} alt="" /></div> */}
                                </div>
                                <div className="post-comment-bloc1-b">
                                    {/* <div className="post-comment-name">{comments.commentAuthorUserName}</div> */}
                                    {/* <div className="post-comment-date"><span>&nbsp;</span>il y a {elapsedTime(new Date(comments.commentAuthorDate))}</div> */}
                                    <div className="post-comment-pictos">
                                        <div className="post-comment-picto post-comment-picto-edit"><i className="fas fa-edit"></i></div>
                                        <div className="post-comment-picto post-comment-picto-delete"><i className="far fa-trash-alt"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ))} */}
                    </div>
                    {/* <form className="post-new-comment box"> */}
                    <form className="post-new-comment box" onSubmit={getComment}>
                        <div className="post-new-comment-avatar"><img src={avatarRalph} alt="" /></div>
                        <input type="text" className="post-new-comment-message" name="postCommentInput" placeholder="Ecrivez un commentaire" />

                        <div className="post-new-comment-send" onClick={(e) => sendComment(e, publication._id)}><i class="fas fa-arrow-circle-right"></i></div>
                        {/* <div className="post-new-comment-send">[Retour] pour envoyer</div> */}
                    </form>
                </div >
            ))
            }
        </>
    );
};

export default Publications;