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
            .then((json) => {
                // setUserData(json);

                console.log("<UserInfos>");
                console.log("json", json);

                const userInfos = {
                    avatarUrl: json.avatarUrl,
                    userJob: json.userJob,
                    userService: json.userService,
                    username: json.username,
                    userId: json._id,
                    isAdmin: json.isAdmin,
                }


                if (!json.error) {
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



