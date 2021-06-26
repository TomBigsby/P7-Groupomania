import avatar from '../assets/images/avatar.svg'
import { useState, useRef } from 'react';
import { Redirect } from 'react-router'


const SignUp = () => {

    const [user, setUser] = useState(false);
    const inputEmail = useRef()
    const inputPassword = useRef()
    const inputName = useRef()
    const inputFonction = useRef()
    const inputService = useRef()

    const submit = e => {
        e.preventDefault()

        const currentUserInfos = {
            email: inputEmail.current.value,
            username: inputName.current.value,
            service: inputService.current.value,
            fonction: inputFonction.current.value
        }

        fetch('http://localhost:4200/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                email: inputEmail.current.value,
                password: inputPassword.current.value,
                username: inputName.current.value,
                service: inputService.current.value,
                fonction: inputFonction.current.value
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json()
                .then(json => setUser(json)
                ));

        localStorage.setItem("currentUserInfos", JSON.stringify(currentUserInfos));
    }

    return (
        <div className="login-container">
            <div className="welcome">Inscription</div>
            <div className="filet"></div>
            <div className="connect">Rejoignez-nous</div>
            <div className="signup-avatar">
                <img src={avatar} alt="" />
                <div className="signup-avatar-text-hover">Importer une image</div>
            </div>
            <form className="signup-form" onSubmit={submit}>
                <div className="field-bloc">
                    <label htmlFor="email">Email <span className="red">* </span></label>
                    <input type="email" id="email" name="email" ref={inputEmail} />
                    {/* <div className="corporate-domain">@groupomania.com</div> */}
                    <div className="error-msg"> {user.error && <p>{user.error}</p>}</div>
                </div>
                <div className="field-bloc">
                    <label className="bloc-infobulle" htmlFor="password">mot de passe <span className="red">* </span> <i class="fas fa-info-circle"></i> <div className="infobulle">Doit contenir une majuscule, une minuscule, de 9 à 15 caractères et au moins 1 caractère spécial parmi : ! @ # $ % ^ & *</div></label>

                    <input type="password" id="password" ref={inputPassword} />
                    <div className="error-msg"> {user.error && <p>{user.error}</p>}</div>
                </div>
                <div className="field-bloc">
                    <label htmlFor="username">Nom d'utilisateur <span className="red">* </span></label>
                    <input type="text" id="username" name="user" ref={inputName} />
                    {/* <div className="error-msg">  &lt; message d'erreur &gt; {user.errors.name} && <p>{user.errors.name}</p>}</div> */}
                </div>
                <div className="field-bloc">
                    <label htmlFor="service">Service</label>
                    <input type="text" id="service" ref={inputService} />
                </div>
                <div className="field-bloc">
                    <label htmlFor="fonction">Poste occupé</label>
                    <input type="text" id="fonction" ref={inputFonction} />
                </div>
                <input type="submit" name="Inscription" value="Inscription" className="bt-valid" />
                {user && <Redirect to="/publications" />}
                <div className="required-field"><span className="red">* </span>Champs obligatoires</div>
            </form>
        </div>
    );
};

export default SignUp;