import { useState, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

import { fr } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';
const { zonedTimeToUtc } = require('date-fns-tz')


const Comments = (props) => {
    const [fieldEnabled, setFieldEnabled] = useState(false);
    const [comment, setComment] = useState(props.commentMessage.commentAuthorMessage);

    const inputMessage = useRef()
    const btEditMessage = useRef()



    const formData = new FormData();

    const sendCommentEdit = (commentId, messageValue, postId) => {

        // console.log(commentId);

        formData.append("commentId", commentId);
        formData.append("commentMessage", messageValue);
        formData.append("postId", postId);

        fetch('http://localhost:4200/api/publications/comments/' + commentId, {
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




    const editComment = (commentId, postId) => {
        setFieldEnabled(!fieldEnabled)


        if (fieldEnabled === true) {
            sendCommentEdit(commentId, inputMessage.current.value, postId)
            btEditMessage.current.classList.replace("isEditMode", "post-comment-picto");

            const newComment = inputMessage.current.value
            setComment(newComment)

        } else {
            inputMessage.current.disabled = false;
            inputMessage.current.focus()
            inputMessage.current.select()

            btEditMessage.current.classList.replace("post-comment-picto", "isEditMode");

        }
    }


    const onKeyPressed = (e) => {
        const key = e.key
        if (key === "Enter") {
            const newComment = inputMessage.current.value
            setComment(newComment)
            setFieldEnabled(false)
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
                            <div className="post-comment-picto-edit" ref={btEditMessage} onClick={() => { editComment(props.commentMessage.commentId, props.postId) }}>
                                {fieldEnabled ? <i className="fas fa-check-square"></i> : <i className="fas fa-edit"></i>}
                            </div>
                            <div className="post-comment-picto-delete"><i className="far fa-trash-alt"></i></div>
                        </div>
                    </div>
                </div>
                <div className="post-comment-bloc2">
                    {fieldEnabled ?
                        <TextareaAutosize className="post-comment-message textareaAutosize" onKeyDown={(e) => onKeyPressed(e)} ref={inputMessage} defaultValue={comment} />
                        :
                        <TextareaAutosize className="post-comment-message textareaAutosize" disabled ref={inputMessage} value={comment} />}

                </div>
            </div>

        </>
    )
}
export default Comments;