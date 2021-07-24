import { NavLink } from "react-router-dom";
import HeaderSmall from "../components/HeaderSmall";
import Publications from "../components/Publications";
import UserInfos from "../components/UserInfos";
// import TokenCheck from "../components/TokenCheck";

import { useEffect, useState } from 'react';

const PagePublications = () => {

    const [userData, setUserData] = useState(false);






    return (
        <>
            <UserInfos />

            {/* <TokenCheck /> */}

            <HeaderSmall />
            <div className="main">
                <div className="intro">Les dernières publications</div>
                <Publications />
                <NavLink exact to="/nouvelle-publication" className="bt-new-publication"><i className="fas fa-edit"></i></NavLink>
            </div>

        </>
    );
};

export default PagePublications;
