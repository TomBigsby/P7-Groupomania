
import React from 'react';
import { Redirect } from 'react-router'
import { useEffect, useState } from 'react';

const TokenCheck = () => {
    const [userToken, setUserToken] = useState(false)

    /* useEffect(() => {
        if (localStorage.getItem("token") === null) {
            setUserToken(false)
 
            console.log("TOKEN false: " + userToken);
        } else {
            JSON.parse(localStorage.getItem("token"));
 
            setUserToken(true)
            console.log("TOKEN true: " + userToken);
        }
    }, [userToken]) */



    return (
        <>
            {localStorage.getItem("token") === null && <Redirect to="/page404" />}
        </>
    )
};

export default TokenCheck;