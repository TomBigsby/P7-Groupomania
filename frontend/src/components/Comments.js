import { useState, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import React, { Children } from "react";


import { fr } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';
const { zonedTimeToUtc } = require('date-fns-tz')


const Comments = (props) => {
    const [fieldEnabled, setFieldEnabled] = useState(false);
    const [comment, setComment] = useState(props.comment.commentAuthorMessage);

    const inputMessage = useRef()
    const btEditMessage = useRef()
    const warningDeleteComment = useRef()


    const formData = new FormData();

    const sendCommentEdit = (commentId, messageValue, postId) => {

        formData.append("commentId", commentId);
        formData.append("commentAuthorMessage", messageValue);
        // formData.append("postId", postId);

        fetch('http://localhost:4200/api/publications/comments/' + commentId, {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json()
                .then(json => {
                    // console.log("json.id: " + json.id);
                }
                ))
            .catch((error) => console.error(error));
    }

    const editComment = (commentId) => {
        setFieldEnabled(!fieldEnabled)

        // Mode Edition du commentaire
        if (fieldEnabled === true) {
            sendCommentEdit(commentId, inputMessage.current.value)
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
                {/* message de suppression de commentaire */}
                <div className="comment-cache invisible" ref={warningDeleteComment} >
                    <div className="comment-cache-background"></div>
                    <div className="comment-cache-deleteMsg">
                        <p>Confirmez-vous la suppression de ce commentaire ?</p>
                        <div className="buttons">
                            <button className="bt-cancel" onClick={() => { warningDeleteComment.current.classList.add("invisible") }}>Non</button>
                            <button className="bt" onClick={() => { warningDeleteComment.current.classList.add("invisible"); props.commentToDelete(props.comment._id) }}>Oui, je supprime</button>
                        </div>
                    </div>
                </div>


                <div className="post-comment-bloc1">
                    <div className="post-comment-bloc1-a">
                        <div className="post-comment-avatar"><img src={props.comment.commentAuthorAvatarUrl} alt="" /></div>
                    </div>
                    <div className="post-comment-bloc1-b">
                        <div className="post-comment-name">{props.comment.commentAuthorUserName}</div>
                        <div className="post-comment-date"><span>&nbsp;</span>il y a {elapsedTime(props.comment.commentDate)}</div>
                        <div className="post-comment-pictos">

                            <div className="post-comment-picto-edit" ref={btEditMessage} onClick={() => { editComment(props.comment._id) }}>
                                {fieldEnabled ? <div><i className="fas fa-undo-alt"></i></div> : <div><i className="fas fa-edit"></i></div>}</div>

                            <div className="post-comment-picto-delete" onClick={() => { warningDeleteComment.current.classList.remove("invisible"); }}><i className="far fa-trash-alt"></i></div>
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