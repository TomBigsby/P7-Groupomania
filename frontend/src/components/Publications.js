import { useState, useEffect } from 'react';
import Publication from "./Publication";
import { serverUrl } from '../config';

const Publications = () => {

    const [publications, setPublications] = useState([]);
    const token = JSON.parse(localStorage.getItem("token"));


    // Récupération des publications
    useEffect(() => {
        fetch(`${serverUrl}/api/publications`, {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                "authorization": "Bearer " + token
            }
        })
            .then((res) => res.json())
            .then((res) => setPublications(res))
            .catch((error) => console.error(error));

    }, [token]);


    // Suppression de la publication
    const deletePost = (postId) => {

        fetch(`${serverUrl}/api/publications/` + postId, {
            method: 'DELETE',
            headers: { "authorization": "Bearer " + token }
        })
            .then((res) => {

                // TODO: vérifier si OK
                if (res.ok) {
                    // Suppression réussie, récupérer les publications mises à jour
                    return fetch(`${serverUrl}/api/publications`, {
                        method: 'GET',
                        headers: { "authorization": "Bearer " + token }
                    });
                } else {
                    throw new Error('Erreur lors de la suppression de la publication');
                }
            })
            .then((res) => res.json())
            .then((data) => setPublications(data))
            .catch((error) => console.error(error));
    }


    return (
        <>
            {publications && publications.map((publication) => (
                <div className="post-container" key={publication._id}>
                    <Publication
                        publication={publication}
                        postToDelete={deletePost} />
                </div >
            ))
            }
        </>
    );
};

export default Publications;