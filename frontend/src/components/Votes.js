import { useState, useEffect, useRef } from 'react';

const Votes = (props) => {

    const currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));

    // vérifie si l'userId est bien présent dans les usersLike/usersDislike pour afficher les likes de l'ulitisateur actuel
    const foundLikes = props.publication.usersLiked.find(element => element === currentUserInfos.userId);
    const foundDislikes = props.publication.usersDisliked.find(element => element === currentUserInfos.userId);

    const [likeValueState, setLikeValue] = useState((foundLikes || foundDislikes) ? props.publication.likeValue : 0);
    const [usersLikeVotes, setUsersLikeVotes] = useState({ usersLikes: props.publication.usersLiked.length, usersDislikes: props.publication.usersDisliked.length });



    const getLikeValue = (likeValue, currentPostId) => {

        console.log(likeValueState);

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


        setLikeValue(likeValue)

        sendLike(likeValue, currentPostId)
    }


    const sendLike = (likeValue, currentPostId) => {


        fetch('http://localhost:4200/api/publications/' + currentPostId + '/like', {
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
                // console.log("likes = " + json.likes + " | dislikes = " + json.dislikes);

            }
            );
        // usersLikeVotes ===  "" ?  Publication.like : usersLikeVotes

        // console.log(usersLikeVotes);

        // console.log(publications[1].username);
    }


    return (
        <>
            <div className="post-interactions-votes">

                <div>{likeValueState}</div>

                <div onClick={(() => {
                    getLikeValue(likeValueState === 1 ? 0 : 1, props.publication._id, props.publication.userId);
                })}
                    className={likeValueState === 1 ? 'post-interactions-votes-like--checked' : 'post-interactions-votes-like'} >
                    {likeValueState === 1 ? <i className="fas fa-thumbs-up"></i> : <i className="far fa-thumbs-up"></i>}
                    <span className="post-interactions-votes-like-number">{usersLikeVotes.usersLikes}</span>
                </div>

                <div onClick={(() => {
                    getLikeValue(likeValueState === -1 ? 0 : -1, props.publication._id, props.publication.userId);
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