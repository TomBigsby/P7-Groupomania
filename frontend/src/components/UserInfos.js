import { useEffect, useState } from 'react';

const UserInfos = () => {

    const [userData, setUserData] = useState("");

    // récupération des infos utilisateur (depuis login)
    useEffect(() => {
        const currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));

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
                    token: currentUserInfos.token
                }

                // BUG post ID = undefined parfois > voir d'où ça vient
                if (!res.error) {
                    localStorage.setItem("currentUserInfos", JSON.stringify(userDatas));

                }
            })
            .catch((error) => console.error(error));
    }, []);




    return null
};

export default UserInfos;