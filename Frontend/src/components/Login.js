import { NavLink } from "react-router-dom";
import { useState, useRef } from 'react';
import { Redirect } from 'react-router'

const Login = () => {
    const [user, setUser] = useState(false)

    const inputEmail = useRef()
    const inputPassword = useRef()

    const submit = e => {
        e.preventDefault()



        
        fetch('http://localhost:4200/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: inputEmail.current.value,
                password: inputPassword.current.value
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json()
                .then(json => setUser(json)
                ));

    }

    return (
        <div className="login-container">
            <div className="welcome">Bienvenue</div>
            <div className="filet"></div>
            <div className="connect">Connectez-vous</div>
            <form className="login-form" onSubmit={submit}>
                <div className="field-bloc">
                    <label htmlFor="email">email <span className="red">* </span></label>
                    <input type="email" id="email" name="email" ref={inputEmail} />
                    <div className="corporate-domain">@groupomania.com</div>
                    <div className="error-msg"> {user.error && <p>{user.error}</p>}</div>
                </div>
                <div className="field-bloc">
                    <label htmlFor="password">mot de passe <span className="red">* </span></label>
                    <input type="password" id="password" ref={inputPassword} />
                    <div className="error-msg"> {user.error && <p>{user.error}</p>}</div>
                </div>
                <input type="submit" name="Connexion" value="Connexion" className="bt-valid" />
                {/* <NavLink className="navlink-bt-valid" exact to="/publications"><button className="bt-valid">Connexion</button></NavLink> */}
                {/* {user && <Redirect to="/publications" />} */}
            </form>
            <div className="signup-link">Vous n'avez pas de compte ? <NavLink exact to="/inscription">inscrivez-vous</NavLink></div>
            <div className="required-field"><span className="red">* </span>Champs obligatoires</div>
        </div>
    );
};

export default Login;