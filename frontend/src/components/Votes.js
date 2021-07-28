import { useState, useEffect } from 'react';

const Votes = (props) => {

    const [likes, setLikes] = useState(false);

    const currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));
    const token = JSON.parse(localStorage.getItem("token"))

    // vérifie si l'userId est bien présent dans les usersLike/usersDislike pour afficher les likes de l'ulitisateur actuel
    const foundLikes = props.publication.usersLiked.find(element => element === currentUserInfos.userId);
    const foundDislikes = props.publication.usersDisliked.find(element => element === currentUserInfos.userId);


    let likeValue
    if (foundLikes !== undefined) {
        likeValue = 1
    } else if (foundDislikes !== undefined) {
        likeValue = -1
    }


    // const [likeValueState, setLikeValueState] = useState((foundLikes || foundDislikes) ? props.publication.likeValue : 0);
    const [likeValueState, setLikeValueState] = useState((foundLikes !== undefined || foundDislikes !== undefined) ? likeValue : 0);
    const [usersLikeVotes, setUsersLikeVotes] = useState({ usersLikes: props.publication.usersLiked.length, usersDislikes: props.publication.usersDisliked.length });


    // Modification du nombre de likes / dislikes suite au clic
    const getLikeValue = (likeValue, currentPostId) => {
        if (likeValue === 1) {
            if (likeValueState === 0) {
                setUsersLikeVotes({ usersLikes: usersLikeVotes.usersLikes += 1, usersDislikes: usersLikeVotes.usersDislikes })
            }
            if (likeValueState === -1) {
                setUsersLikeVotes({ usersLikes: usersLikeVotes.usersLikes += 1, usersDislikes: usersLikeVotes.usersDislikes -= 1 })
            }
        }
        if (likeValue === 0) {
            if (likeValueState === 1) {
                setUsersLikeVotes({ usersLikes: usersLikeVotes.usersLikes -= 1, usersDislikes: usersLikeVotes.usersDislikes })
            }
            if (likeValueState === -1) {
                setUsersLikeVotes({ usersLikes: usersLikeVotes.usersLikes, usersDislikes: usersLikeVotes.usersDislikes -= 1 })
            }
        }
        if (likeValue === -1) {
            if (likeValueState === 1) {
                setUsersLikeVotes({ usersLikes: usersLikeVotes.usersLikes -= 1, usersDislikes: usersLikeVotes.usersDislikes += 1 })
            }
            if (likeValueState === 0) {
                setUsersLikeVotes({ usersLikes: usersLikeVotes.usersLikes, usersDislikes: usersLikeVotes.usersDislikes += 1 })
            }
        }
        // Modification de la valeur du likeValue (0, 1 ou - 1)
        setLikeValueState(likeValue)

        // Envoie des infos au backend
        sendLike(likeValue, currentPostId)
    }

    // Envoi du vote
    const sendLike = (likeValue, currentPostId) => {
        fetch('http://localhost:4200/api/publications/' + currentPostId + '/like', {
            method: 'POST',
            body: JSON.stringify({
                like: likeValue,
                userId: currentUserInfos.userId
            }),
            headers: { 'Content-Type': 'application/json', "authorization": "Bearer " + token }
        })
            .catch((error) => console.error(error))
        // .then(res => res.json())
    }


    return (
        <>
            <div className="post-interactions-votes">

                <div onClick={(() => {
                    getLikeValue(likeValueState === 1 ? 0 : 1, props.publication.postId, props.publication.userId);
                })}
                    className={likeValueState === 1 ? 'post-interactions-votes-like--checked' : 'post-interactions-votes-like'} >
                    {likeValueState === 1 ? <i className="fas fa-thumbs-up"></i> : <i className="far fa-thumbs-up"></i>}
                    <span className="post-interactions-votes-like-number">{usersLikeVotes.usersLikes}</span>
                </div>

                <div onClick={(() => {
                    getLikeValue(likeValueState === -1 ? 0 : -1, props.publication.postId, props.publication.userId);
                })}
                    className={likeValueState === -1 ? 'post-interactions-votes-dislike--checked' : 'post-interactions-votes-dislike'} >
                    {likeValueState === -1 ? <i className="fas fa-thumbs-down"></i> : <i className="far fa-thumbs-down"></i>}
                    <span className="post-interactions-votes-dislike-number">{usersLikeVotes.usersDislikes}</span>
                </div>
            </div >
        </>
    );
}
export default Votes;