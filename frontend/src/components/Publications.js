
import { useState, useEffect } from 'react';
import Publication from "./Publication";


const Publications = () => {

    const [publications, setPublications] = useState([]);
    const [userData, setUserData] = useState("");

    const [items, setItems] = useState([]);

    // let postId


    // chargement des infos utilisateur (Localstorage) au chargement de la page
    // const savedUser = JSON.parse(localStorage.getItem('currentUserInfos'))

    // Récupération des publications
    useEffect(() => {
        fetch('http://localhost:4200/api/publications')
            .then((res) => res.json())
            .then((res) => setPublications(res))
            .catch((error) => console.error(error));

        const currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));

        // récupération des infos utilisateur (depuis login)
        fetch('http://localhost:4200/api/auth/login/' + currentUserInfos.userId)
            .then((res) => res.json())
            .then((res) => {
                setUserData(res);

                const userDatas = {
                    avatarUrl: res.avatarUrl,
                    userJob: res.userJob,
                    userService: res.userService,
                    username: res.username,
                    userId: res._id,
                    isAdmin: res.isAdmin
                }

                // BUG post ID = undefined parfois > voir d'où ça vient
                if (!res.error) {
                    localStorage.setItem("currentUserInfos", JSON.stringify(userDatas));

                }
            })
            .catch((error) => console.error(error));
    }, []);



    // Suppression de la publication
    const deletePost = (postId) => {

        fetch('http://localhost:4200/api/publications/' + postId, {
            method: 'DELETE',
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
        })
        .catch((error) => console.error(error))


    }


    return (
        <>
            {publications && publications.map((publication) => (
                <div className="post-container">
                    <Publication key={publication._id} publication={publication} mysPost={publication} postToDelete={deletePost} />
                </div >
            ))
            }
        </>
    );
};

export default Publications;