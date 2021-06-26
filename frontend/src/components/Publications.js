import avatarRalph from '../assets/images/avatar-ralph.jpg';
import { fr } from 'date-fns/locale';
import { formatDistanceStrict } from 'date-fns';
import { useState, useEffect } from 'react';

const { zonedTimeToUtc } = require('date-fns-tz')



// import myDatas from '../data/data.js';


const Publications = () => {

    const [publications, setPublications] = useState([]);

    // const currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));
    // console.log(currentUserInfos.email);


    // chargement des infos utilisateur (Localstorage) au chargement de la page
    // const savedUser = JSON.parse(localStorage.getItem('currentUserInfos'))


    useEffect(() => {
        fetch('http://localhost:4200/api/publications')
            .then((res) => res.json())
            .then((res) => setPublications(res))
            .catch((error) => console.error(error));
    }, []);


    // gestion de la date affiché au temps passé
    // Attention : conversion au fomat UTC nécessaire (install package date-fns-tz)
    const elapsedTime = (startDate) => {
        return formatDistanceStrict(zonedTimeToUtc(startDate), zonedTimeToUtc(new Date()), { locale: fr });
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
                            <div className="post-interactions-votes-up"><i className="far fa-thumbs-up"></i><span className="post-interactions-votes-up-number">{publication.like}</span></div>
                            <div className="post-interactions-votes-down"><i className="far fa-thumbs-down"></i><span className="post-interactions-votes-down-number">{publication.dislike}</span></div>
                        </div>
                        <div className="separatorV"></div>
                        <div className="post-interactions-comments">
                            <div className="post-interactions-comments-picto"><i className="far fa-comment "></i></div>
                            {/* <div className="post-interactions-comments-number">{publication.postComments.length} commentaires</div> */}
                        </div>
                    </div>
                    {/* <div className="post-comments box">
                        {publication.postComments.map((myComments) => (
                            <div className="post-comment">
                                <div className="post-comment-bloc1">
                                    <div className="post-comment-bloc1-a">
                                        <div className="post-comment-avatar"><img src={myComments.commentAuthorAvatarUrl} alt="" /></div>
                                    </div>
                                    <div className="post-comment-bloc1-b">
                                        <div className="post-comment-name">{myComments.commentAuthorUserName}</div>
                                        <div className="post-comment-date"><span>&nbsp;</span>il y a {elapsedTime(new Date(myComments.commentAuthorDate))}</div>
                                        <div className="post-comment-pictos">
                                            <div className="post-comment-picto post-comment-picto-edit"><i className="fas fa-edit"></i></div>
                                            <div className="post-comment-picto post-comment-picto-delete"><i className="far fa-trash-alt"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-comment-bloc2"> <div className="post-comment-message">{myComments.commentAuthorMessage}</div></div>
                            </div>
                        ))}
                    </div> */}
                    <div className="post-new-comment box">
                        <div className="post-new-comment-avatar"><img src={avatarRalph} alt="" /></div>
                        <input type="text" className="post-new-comment-message" placeholder="Ecrivez un commentaire" />
                        <div className="post-new-comment-send">[Retour] pour envoyer</div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Publications;