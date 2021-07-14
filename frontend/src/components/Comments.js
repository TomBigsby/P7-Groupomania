import { useState, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

import { fr } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';
const { zonedTimeToUtc } = require('date-fns-tz')


const Comments = (props) => {
    const [fieldEnabled, setFieldEnabled] = useState(false);

    const inputMessage = useRef()
    const btEditMessage = useRef()



    const formData = new FormData();

    const sendCommentEdit = (commentId, messageValue) => {

        console.log(commentId);

        formData.append("commentId", commentId);
        formData.append("commentMessage", messageValue);

        fetch('http://localhost:4200/api/publications/' + props.postId,  {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json()
                .then(json => {
                    if (json.error === undefined) {
                        // window.location.reload();
                    }
                }
                ))
            .catch((error) => console.error(error));
    }



    const editComment = (commentId) => {
        setFieldEnabled(!fieldEnabled)

        if (fieldEnabled === true) {
            sendCommentEdit(commentId, inputMessage.current.value)
            btEditMessage.current.classList.replace("isEditMode", "post-comment-picto");

            // console.log(inputMessage.current.value);

        } else {
            inputMessage.current.disabled = false;
            inputMessage.current.focus()
            inputMessage.current.select()

            console.log(btEditMessage.current);
            btEditMessage.current.classList.replace("post-comment-picto", "isEditMode");

        }
    }


    const elapsedTime = (startDate) => {
        return formatDistanceToNow(zonedTimeToUtc(startDate), { locale: fr, includeSeconds: false });
    }

    return (
        <>
            <div className="post-comment">
                <div className="post-comment-bloc1">
                    <div className="post-comment-bloc1-a">
                        <div className="post-comment-avatar"><img src={props.commentMessage.commentAuthorAvatarUrl} alt="" /></div>
                    </div>
                    <div className="post-comment-bloc1-b">
                        <div className="post-comment-name">{props.commentMessage.commentAuthorUserName}</div>
                        <div className="post-comment-date"><span>&nbsp;</span>il y a {elapsedTime(props.commentMessage.commentDate)}</div>
                        <div className="post-comment-pictos">
                            <div className="post-comment-picto-edit" ref={btEditMessage} onClick={() => { editComment(props.commentMessage.commentId) }}>
                                {fieldEnabled ? <i className="fas fa-check-square"></i> : <i className="fas fa-edit"></i>}
                            </div>
                            <div className="post-comment-picto-delete"><i className="far fa-trash-alt"></i></div>
                        </div>
                    </div>
                </div>
                <div className="post-comment-bloc2">
                    {fieldEnabled ?
                        <TextareaAutosize className="post-comment-message textareaAutosize" ref={inputMessage} defaultValue={props.commentMessage.commentAuthorMessage} />
                        :
                        <TextareaAutosize className="post-comment-message textareaAutosize" disabled ref={inputMessage} value={props.commentMessage.commentAuthorMessage} />}

                </div>
            </div>

        </>
    )
}
export default Comments;