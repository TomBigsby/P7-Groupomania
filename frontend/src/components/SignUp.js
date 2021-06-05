// import { NavLink } from "react-router-dom";
import avatar from '../assets/images/avatar.svg'
import { useState, useRef } from 'react';



const SignUp = (props) => {

    const [user, setUser] = useState({});
    const inputEmail = useRef()
    const inputName = useRef()
    

    const submit = e => {
        e.preventDefault()
        fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({email: inputEmail.current.value, username: inputName.current.value}),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => setUser(json.user))
    }

    return (
        <div className="login-container">
            <div className="welcome">Inscription</div>
            <div className="filet"></div>
            <div className="connect">Rejoignez-nous</div>
            <div className="signup-avatar">
                <img src={avatar} alt="" />
            </div>
            <form className="signup-form" onSubmit={submit}>
                <div className="field-bloc">
                    <label htmlFor="email">Email / nom d’utilisateur <span className="red">* </span></label>
                    <input type="email" id="email" name="user[email]" defaultValue={user.email} ref={inputEmail} />
                    <div className="corporate-domain">@groupomania.com</div>
                    <div className="error-msg">&lt; message d'erreur &gt;</div>
                </div>
                <div className="field-bloc"><label htmlFor="username">Nom d'utilisateur <span className="red">* </span></label>
                    <input type="text" id="username" name="user[name]" defaultValue={user.name} />
                    <div className="error-msg">  &lt; message d'erreur &gt; {user.errors.name && <p>{user.errors.name}</p>}</div>
                </div>
                <div className="field-bloc"><label htmlFor="password">mot de passe <span className="red">* </span></label>
                    <input type="password" id="password" />
                    <div className="error-msg"> &lt; message d'erreur &gt;</div>
                </div>
                <div className="field-bloc">
                    <label htmlFor="service">Service</label>
                    <input type="text" id="service" />
                </div>
                <div className="field-bloc">
                    <label htmlFor="fonction">Poste occupé</label>
                    <input type="text" id="fonction" />
                </div>
                <input type="submit" name="Inscription" />
                {/* <NavLink className="navlink-bt-valid" exact to="/messages"><button className="bt-valid">Inscription</button></NavLink> */}
                <div className="required-field"><span className="red">* </span>Champs obligatoires</div>
            </form>
        </div>
    );
};

export default SignUp;