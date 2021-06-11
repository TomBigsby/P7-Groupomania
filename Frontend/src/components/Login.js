import { NavLink } from "react-router-dom";
import { useState, useRef } from 'react';


const Login = () => {
    const [user, setUser] = useState({})
    // const [user, setUser] = useState(props.user)
    const inputEmail = useRef()
    const inputPassword = useRef()

    const submit = e => {
        e.preventDefault()
        fetch('http://localhost:4200/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email: inputEmail.current.value, password: inputPassword.current.value }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => setUser(json.user))
    }


    /*     return (
          <form ref={form} onSubmit={submit}>
            <input type="text" name="user[name]" defaultValue={user.name} />
            {user.errors.name && <p>{user.errors.name}</p>}
      
            <input type="email" name="user[email]" defaultValue={user.email} />
            {user.errors.email && <p>{user.errors.email}</p>}
      
            <input type="submit" name="Sign Up" />
          </form>
        ) */


    return (
        <div className="login-container">
            <div className="welcome">Bienvenue</div>
            <div className="filet"></div>
            <div className="connect">Connectez-vous</div>
            <form className="login-form">
                <div className="field-bloc">
                    <label htmlFor="email">email <span className="red">* </span></label>
                    <input type="email" id="email" name="user[email]" defaultValue={user.email} ref={inputEmail} />
                    <div className="corporate-domain">@groupomania.com</div>
                    {/* <div className="error-msg" {user.errors.name && <p>{user.errors.name}> &lt; message d'erreur &gt;</div> */}
                </div>
                <div className="field-bloc">
                    <label htmlFor="password">mot de passe <span className="red">* </span></label>
                    <input type="password" id="password" ref={inputPassword} />
                    {/* <div className="error-msg" {user.errors.password && <p>{user.errors.password}> &lt; message d'erreur &gt;</div> */}
                    
                </div>
                <input type="submit" name="Connexion" value="Connexion" className="bt-valid" onSubmit={submit} />
                {/* <NavLink className="navlink-bt-valid" exact to="/publications"><button className="bt-valid">Connexion</button></NavLink> */}
                <div className="signup-link">Vous n'avez pas de compte ? <NavLink exact to="/inscription">inscrivez-vous</NavLink></div>
                <div className="required-field"><span className="red">* </span>Champs obligatoires</div>
            </form>
        </div>
    );
};

export default Login;