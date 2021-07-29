
import { useState, useEffect } from 'react';
import Publication from "./Publication";


const Publications = () => {

    const [publications, setPublications] = useState([]);
    const token = JSON.parse(localStorage.getItem("token"));


    // Récupération des publications
    useEffect(() => {
        fetch('http://localhost:4200/api/publications', {
            method: 'GET',
            // headers: { 'Content-Type': 'multipart/form-data' },
            headers: { "authorization": "Bearer " + token }
        })
            .then((res) => res.json())
            .then((res) => setPublications(res))
            .catch((error) => console.error(error));

    }, []);


    // Suppression de la publication
    const deletePost = (postId) => {

        fetch('http://localhost:4200/api/publications/' + postId, {
            method: 'DELETE',
            headers: { "authorization": "Bearer " + token }
        })
            .catch((error) => console.error(error))


            // suppression de la publication via son ID et MAJ du tableau
            .then(() => {
                setPublications(publications.filter(publication => publication.postId !== postId))
            })
    }


    return (
        <>
            {publications && publications.map((publication) => (
                <div className="post-container">
                    <Publication
                        key={publication.postId}
                        publication={publication}
                        postToDelete={deletePost} />
                </div >
            ))
            }
        </>
    );
};

export default Publications;