
import { useState, useEffect } from 'react';
import Publication from "./Publication";


const Publications = () => {

    const [publications, setPublications] = useState([]);

    // const [userData, setUserData] = useState("");
    // const [items, setItems] = useState([]);

    // const currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));
    // const token = JSON.parse(localStorage.getItem("token"));

    // chargement des infos utilisateur (Localstorage) au chargement de la page
    // const savedUser = JSON.parse(localStorage.getItem('currentUserInfos'))

    // Récupération des publications
    useEffect(() => {
        fetch('http://localhost:4200/api/publications', {
            method: 'GET',
            // headers: { 'Content-Type': 'multipart/form-data' },
            // headers: { "authorization": "Bearer " + token }
        })
            .then((res) => res.json())
            .then((res) => setPublications(res))
            .catch((error) => console.error(error));

            // console.log(publications[0])

    }, []);


    // Suppression de la publication
        const deletePost = (postId) => {
    
            fetch('http://localhost:4200/api/publications/' + postId, {
                method: 'DELETE',
                // headers: { "authorization": "Bearer " + token }
            })
                .catch((error) => console.error(error))
    
                // suppression de la publication via son ID et MAJ du tableau
                .then(() => {
                    setPublications(publications.filter(publication => publication._id !== postId))
                })
            deletePostComments(postId)
        }


    // Suppression des commentaires liés à la publication
        const deletePostComments = (postId) => {
    
            fetch('http://localhost:4200/api/publications/' + postId + "/comments", {
                method: 'DELETE',
                // headers: { "authorization": "Bearer " + token }
            })
                .catch((error) => console.error(error))
        }


    return (


        <>
            {publications && publications.map((publication) => (
                <div className="post-container">
                       <Publication
                    key={publication.postId}
                    publication={publication}
                    postToDelete={deletePost} />

                    {/* <div>{publication.username}</div> */}
                </div >
            ))
            }
        </>
    );
};

export default Publications;