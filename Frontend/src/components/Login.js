import { NavLink } from "react-router-dom";
// import { useState, useRef } from 'react';


const Login = () => {
/*     const [user, setUser] = useState(props.user)

    const submit = e => {
        e.preventDefault()
        fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ user }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => setUser(json.user))
    } */

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
                    <input type="email" id="email" />
                    <div className="corporate-domain">@groupomania.com</div>
                    <div className="error-msg"> &lt; message d'erreur &gt;</div>
                </div>
                <div className="field-bloc">
                    <label htmlFor="password">mot de passe <span className="red">* </span></label>
                    <input type="password" id="password" />
                    <div className="error-msg"> &lt; message d'erreur &gt;</div>
                </div>
                <NavLink className="navlink-bt-valid" exact to="/messages"><button className="bt-valid">Connexion</button></NavLink>
                <div className="signup-link">Vous n'avez pas de compte ? <NavLink exact to="/inscription">inscrivez-vous</NavLink></div>
                <div className="required-field"><span className="red">* </span>Champs obligatoires</div>
            </form>
        </div>
    );
};

export default Login;