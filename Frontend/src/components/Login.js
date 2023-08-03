import { Link } from "react-router-dom";
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { serverUrl } from '../config';


const Login = () => {
    const [user, setUser] = useState(false)
    const [msgAlert, setMsgAlert] = useState({ email_error: "", password_error: "" });
    const history = useHistory();


    //TODO  à utiliser (éviter les problème d'erreur 404 si local storage déjà existant)
    const [localStorageLoaded, setLocalStorageLoaded] = useState(false);
    const [accessGranted, setAccessGranted] = useState(false);


    const inputEmail = useRef()
    const inputPassword = useRef()


    const submit = e => {
        e.preventDefault()

        if (e.target.email.value !== "" && e.target.password.value !== "") {
            setMsgAlert({ email_error: "", password_error: "" })

            fetch(`${serverUrl}/api/auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    email: inputEmail.current.value,
                    password: inputPassword.current.value
                }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json()
                    .then(json => {
                        setUser(json);

                        if (json.userId) {
                            setAccessGranted(true)

                            const currentUserInfos = {
                                userId: json.userId,
                                username: json.username,
                                avatarUrl: json.avatarUrl,
                                isAdmin: json.isAdmin
                            }
                            localStorage.setItem("token", JSON.stringify(json.token));
                            localStorage.setItem("currentUserInfos", JSON.stringify(currentUserInfos));
                            setLocalStorageLoaded(true)
                        }
                    }
                    ));

        } else {
            if (e.target.email.value === "") {
                setMsgAlert({ email_error: "Email manquant", password_error: "" })
            }
            if (e.target.password.value === "") {
                setMsgAlert({ email_error: "", password_error: "Mot de passe manquant" })
            }
            if (e.target.email.value === "" && e.target.password.value === "") {
                setMsgAlert({ email_error: "Email manquant", password_error: "Mot de passe manquant" })
            }
        }
    }


    const handleRedirect = () => {
        // Vérifier si toutes les conditions sont remplies
        if (localStorageLoaded && accessGranted && user && !user.error_login_user && !user.error_login_password) {
            // Utiliser history.push pour effectuer la redirection
            history.push('/publications');
        }
    };



    return (
        <div className="login-container">

            <div className="welcome">Bienvenue</div>
            <div className="filet"></div>
            <div className="connect">Connectez-vous</div>

            <form className="login-form" onSubmit={submit}>
                <div className="field-bloc">
                    <label htmlFor="email">email <span className="red">* </span></label>
                    <input type="email" id="email" name="email" ref={inputEmail} />
                    <div className="error-msg">{msgAlert.email_error}{user.error_login_user && <p>{user.error_login_user}</p>}</div>
                </div>
                <div className="field-bloc">
                    <label htmlFor="password">mot de passe <span className="red">* </span></label>
                    <input type="password" id="password" ref={inputPassword} />
                    <div className="error-msg">{msgAlert.password_error}{user.error_login_password && <p>{user.error_login_password}</p>}</div>

                </div>
                <input type="submit" name="Connexion" value="Connexion" className="bt" onClick={handleRedirect} />

                <div className="signup-link">Vous n'avez pas de compte ? <Link exact to="/inscription">inscrivez-vous</Link></div>
                <div className="required-field"><span className="red">* </span>Champs obligatoires</div>
            </form>
        </div>
    );
};

export default Login;