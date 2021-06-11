// import { NavLink } from 'react-router-dom'
import avatarRalph from '../assets/images/avatar-ralph.jpg'
import { useState, useRef } from 'react';
import { Route, Redirect } from 'react-router'
import PagePublications from "../pages/PagePublications";

const NewPublication = () => {

    const [publication, setPublication] = useState({});
    const inputTitle = useRef()
    
    // const inputImageUrl = useRef()


    const submit = e => {
        e.preventDefault()
        fetch('http://localhost:4200/api/publication', {
            method: 'POST',
            body: JSON.stringify({
                postTitle: inputTitle.current.value,
                // imageUrl: inputImageUrl.current.value
            }),

            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => setPublication(json.publication));

// window.location.href = "/publications"
// FIXME: problème de redirection
<Route path="/publications" exact component={PagePublications} />
    }

    return (
        <div className="post-container new-post-container">
            <div className="post-author">
                <div className="post-author-avatar"><img src={avatarRalph} alt="" /></div>
                <div><span className="post-author-name">Ralph EDWARDS</span></div>
            </div>
            <form className="post-new-publication" onSubmit={submit}>
                <input type="text" id="titre" placeholder="Titre de la publication" ref={inputTitle} />
                <button className="new-post-load-image">Charger une image</button>
                <div className="new-post-image"><img src="https://picsum.photos/id/1025/500/300" alt="" /></div>
                <input type="submit" name="Inscription" value="Envoyer publication" className="bt-valid" />
                {/* <NavLink className="navlink-bt-valid" exact to="/publications"><button className="bt-valid">Envoyer publication</button></NavLink> */}
            </form>
        </div>
    );
};

export default NewPublication;