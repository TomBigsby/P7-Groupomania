import avatarJenny from '../assets/images/avatar-jenny.jpg'
import avatarCody from '../assets/images/avatar-cody.jpg'
import avatarRalph from '../assets/images/avatar-ralph.jpg'

const Messages = () => {
    return (
            <div className="post-container">
                <div className="post-author">
                    <div className="post-author-avatar"><img src={avatarJenny} alt="" /></div>
                    <div><span className="post-author-name">Jenny WILSON <span>&nbsp;</span><span className="post-author-date">il y a 1h</span></span></div>
                </div>
                <div className="post-publication">
                    <div className="post-publication-title">Titre de publication</div>
                    <div className="post-publication-image"><img src="https://picsum.photos/id/237/500/300" alt="" /></div>
                </div>
                <div className="post-interactions">
                    <div className="post-interactions-votes">
                        <div className="post-interactions-votes-up"><i class="far fa-thumbs-up"></i><span className="post-interactions-votes-up-number">25</span></div>
                        <div className="post-interactions-votes-down"><i class="far fa-thumbs-down"></i><span className="post-interactions-votes-down-number">0</span></div>
                    </div>
                    <div className="separatorV"></div>
                    <div className="post-interactions-comments">
                        <div className="post-interactions-comments-picto"><i class="far fa-comment "></i></div>
                        <div className="post-interactions-comments-number">5 commentaires</div>
                    </div>
                </div>
                <div className="post-comments">
                    <div className="post-comment">
                        <div className="post-comment-bloc1">
                            <div className="post-comment-avatar"><img src={avatarCody} alt="" /></div>
                            <div className="post-comment-name">Cody FISHER</div>
                            <div className="post-comment-date"><span>&nbsp;</span>il y a 50 minutes</div>
                        </div>
                        <div className="post-comment-bloc2"> <div className="post-comment-message">Aute anim esse excepteur nulla fugiat occaecat est nisi ut incididunt sint.</div></div>
                    </div>
                </div>
                <div className="post-comments">
                    <div className="post-comment">
                        <div className="post-comment-bloc1">
                            <div className="post-comment-avatar"><img src={avatarRalph} alt="" /></div>
                            <div className="post-comment-name">Ralph EDWARDS</div>
                            <div className="post-comment-date"><span>&nbsp;</span>il y a 50 minutes</div>
                            <div className="post-comment-pictos">
                                <div className="post-comment-picto post-comment-picto-edit"><i class="far fa-edit"></i></div>
                                <div className="post-comment-picto post-comment-picto-delete"><i class="far fa-trash-alt"></i></div>
                            </div>
                        </div>
                        <div className="post-comment-bloc2"> <div className="post-comment-message">Aute anim esse excepteur nulla fugiat occaecat est nisi ut incididunt sint.</div></div>
                    </div>
                </div>
                <div className="post-new-comment">
                    <div className="post-new-comment-avatar"><img src={avatarRalph} alt="" /></div>
                    <input type="text"className="post-new-comment-message" placeholder="Ecrivez un commentaire"/>
                </div>
            </div>
    );
};

export default Messages;