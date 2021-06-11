import avatarRalph from '../assets/images/avatar-ralph.jpg';
import { fr } from 'date-fns/locale'
import { formatDistanceStrict } from 'date-fns'
import { useState, useRef, useEffect } from 'react';

import myDatas from '../data/data.js';


const Publications = () => {

    const [publications, setPublications] = useState({});

    /*    fetch('http://localhost:4200/api/auth/signup', {
           method: 'POST',
           body: JSON.stringify({
               email: inputEmail.current.value,
               password: inputPassword.current.value
           }),
           // body: JSON.stringify({ email: inputEmail.current.value,username: inputName.current.value, password: inputPassword.current.value, service: inputService.current.value, fonction: inputFonction.current.value }),
           headers: { 'Content-Type': 'application/json' },
       })
           .then(res => res.json())
           .then(json => setUser(json.user)) */

    useEffect(() => {
        fetch('http://localhost:4200/api/publications')
            .then((res) => res.json())
            .then((res) => setPublications(res))
            .catch((e) => console.error(e));
    }, []);


    const elapsedTime = (startDate) => {
        // calcule le temps écoulé depuis la date (du post)
        return formatDistanceStrict(startDate, new Date(), { locale: fr });
    }

    return (
        <div>
            {myDatas.map((myData) => (
                // key={user.id}
                <div className="post-container">
                    <div className="post-author box">
                        <div className="post-author-avatar"><img src={myData.avatarUrl} alt="" /></div>
                        <div><span className="post-author-name">{myData.userId} <span>&nbsp;</span><span className="post-author-date">il y a {elapsedTime(new Date(myData.postDate))}</span></span></div>
                    </div>
                    <div className="post-publication box">
                        <div className="post-publication-title">{myData.postTitle}</div>
                        <div className="post-publication-image"><img src={myData.imageUrl} alt="" /></div>
                    </div>
                    <div className="post-interactions box">
                        <div className="post-interactions-votes">
                            <div className="post-interactions-votes-up"><i class="far fa-thumbs-up"></i><span className="post-interactions-votes-up-number">{myData.like}</span></div>
                            <div className="post-interactions-votes-down"><i class="far fa-thumbs-down"></i><span className="post-interactions-votes-down-number">{myData.dislike}</span></div>
                        </div>
                        <div className="separatorV"></div>
                        <div className="post-interactions-comments">
                            <div className="post-interactions-comments-picto"><i class="far fa-comment "></i></div>
                            <div className="post-interactions-comments-number">{myData.postComments.length} commentaires</div>
                        </div>
                    </div>
                    <div className="post-comments box">
                        {myData.postComments.map((myComments) => (
                            <div className="post-comment">
                                <div className="post-comment-bloc1">
                                    <div className="post-comment-bloc1-a">
                                        <div className="post-comment-avatar"><img src={myComments.commentAuthorAvatarUrl} alt="" /></div>
                                    </div>
                                    <div className="post-comment-bloc1-b">
                                        <div className="post-comment-name">{myComments.commentAuthorUserName}</div>
                                        <div className="post-comment-date"><span>&nbsp;</span>il y a {elapsedTime(new Date(myComments.commentAuthorDate))}</div>
                                        <div className="post-comment-pictos">
                                            <div className="post-comment-picto post-comment-picto-edit"><i class="fas fa-edit"></i></div>
                                            <div className="post-comment-picto post-comment-picto-delete"><i class="far fa-trash-alt"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-comment-bloc2"> <div className="post-comment-message">{myComments.commentAuthorMessage}</div></div>
                            </div>
                        ))}
                    </div>
                    <div className="post-new-comment box">
                        <div className="post-new-comment-avatar"><img src={avatarRalph} alt="" /></div>
                        <input type="text" className="post-new-comment-message" placeholder="Ecrivez un commentaire" />
                        <div className="post-new-comment-send">[Retour] pour envoyer</div>
                    </div>
                </div>

            ))}
        </div>
    );
};

export default Publications;