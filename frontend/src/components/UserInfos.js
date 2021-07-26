import { useEffect } from 'react';

const UserInfos = () => {

    // const [userData, setUserData] = useState("");

    // récupération des infos utilisateur (depuis login)
    useEffect(() => {
        const currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));
        // const token = JSON.parse(localStorage.getItem("token"));


        fetch('http://localhost:4200/api/auth/login/' + currentUserInfos.userId, {
            method: 'GET',
            // headers: { "authorization": "Bearer " + token }
        })
            .then((res) => res.json())
            .then((res) => {
                // setUserData(res);

                const userInfos = {
                    avatarUrl: res.avatarUrl,
                    userJob: res.userJob,
                    userService: res.userService,
                    username: res.username,
                    userId: res._id,
                    isAdmin: res.isAdmin,
                }

                
                if (!res.error) {
                    localStorage.setItem("currentUserInfos", JSON.stringify(userInfos));

                    // Si le localStorage est bien chargé, il envoi la confirmation au composant parent pour afficher les publications
                    // props.dataLoaded(true)

                    
                }
            })
            .catch((error) => console.error(error));
    }, []);

    return null
};

export default UserInfos;



