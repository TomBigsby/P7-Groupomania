import avatar from '../assets/images/avatar.svg'
import { useState } from 'react';
import { Redirect } from 'react-router'
import { NavLink } from "react-router-dom";



const SignUp = () => {

    const [user, setUser] = useState(false);
    const [image, setImage] = useState({ preview: "", imageUrl: "" })
    const [msgAlert, setMsgAlert] = useState({ email_error: "", password_error: "", username_error: "" });


    const submit = e => {
        e.preventDefault()


        const formData = new FormData(e.target);


        if (e.target.email.value !== "" && e.target.password.value !== "" && e.target.username.value !== "") {
            setMsgAlert({ email_error: "", password_error: "", username_error: "" })

            fetch('http://localhost:4200/api/auth/signup', {
                method: 'POST',
                body: formData,
                // headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(res => res.json()
                    .then(json => {
                        setUser(json);

                        const currentUserInfos = {
                            userId: json.userId,
                            username: e.target.username.value,
                            userService: e.target.userService.value,
                            userJob: e.target.userService.value,
                            avatarUrl: json.avatarUrl
                        }
                        console.log(json.avatarUrl);

                        localStorage.setItem("currentUserInfos", JSON.stringify(currentUserInfos));

                    }
                    ));

        } else {
            if (e.target.email.value === "") {
                setMsgAlert({ email_error: "Email manquant", password_error: "", username_error: "" })
            }
            if (e.target.password.value === "") {
                setMsgAlert({ email_error: "", password_error: "Mot de passe manquant", username_error: "" })
            }
            if (e.target.username.value === "") {
                setMsgAlert({ email_error: "", password_error: "", username_error: "Nom d'utilisateur manquant" })
            }

            // TODO: A optimiser > réduire le nombre de combinaisons
            if (e.target.email.value === "" && e.target.password.value === "") {
                setMsgAlert({ email_error: "Email manquant", password_error: "Mot de passe manquant", username_error: "" })
            }
            if (e.target.email.value === "" && e.target.username.value === "") {
                setMsgAlert({ email_error: "Email manquant", password_error: "", username_error: "Nom d'utilisateur manquant" })
            }
            if (e.target.password.value === "" && e.target.username.value === "") {
                setMsgAlert({ password_error: "Mot de passe manquant", username_error: "Nom d'utilisateur manquant" })
            }
            if (e.target.email.value === "" && e.target.password.value === "" && e.target.username.value === "") {
                setMsgAlert({ email_error: "Email manquant", password_error: "Mot de passe manquant", username_error: "Nom d'utilisateur manquant" })
            }
        }
    }


    const getImageUrl = (e) => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                imageUrl: e.target.files[0]
            });
        }
    }

    return (
        <div className="login-container">
            <div className="welcome">Inscription</div>
            <div className="filet"></div>
            <div className="connect">Rejoignez-nous</div>

            <form className="signup-form" onSubmit={submit}>
                <div className="signup-avatar">
                    <div className="signup-avatar-text-hover">Importer une image</div>
                    <label htmlFor="upload-button">{image.preview ? <img src={image.preview} alt='' /> : (
                        <img src={avatar} alt="" />
                    )}</label>
                    <input type="file" name="image" id="upload-button" accept=".png, .jpg, .jpeg" onChange={getImageUrl} style={{ display: "none" }} />
                </div>
                <div className="field-bloc">
                    <label htmlFor="email">Email <span className="red">* </span></label>
                    <input type="email" id="email" name="email" />
                    <div className="error-msg" >{msgAlert.email_error}{user.error_signup_email && <p>{user.error_signup_email}</p>}</div>
                    {user.error_signup_email && <NavLink exact to="/" style={{ fontSize: "0.8em", color: "white", textDecoration: "underline" }}> <i class="fas fa-long-arrow-alt-right"></i> Page de connexion</NavLink>}
                </div>
                <div className="field-bloc">
                    <label htmlFor="password">mot de passe <span className="red">* </span> <i className="fas fa-info-circle"></i> <div className="infobulle">Doit contenir une majuscule, une minuscule, plus de 8 caractères et au moins 1 caractère spécial parmi : ! @ # $ % ^ & *</div></label>
                    <input type="password" id="password" name="password" />
                    <div className="error-msg"> {msgAlert.password_error}{user.error_signup_password && <p>{user.error_signup_password}</p>}</div>
                </div>
                <div className="field-bloc">
                    <label htmlFor="username">Nom d'utilisateur <span className="red">* </span></label>
                    <input type="text" id="username" name="username" />
                    <div className="error-msg"> {msgAlert.username_error}</div>


                </div>
                <div className="field-bloc">
                    <label htmlFor="service">Service</label>
                    <input type="text" id="service" name="userService" />
                    <div className="error-msg"></div>
                </div>
                <div className="field-bloc">
                    <label htmlFor="job">Poste occupé</label>
                    <input type="text" id="job" name="userJob" />
                    <div className="error-msg"></div>
                </div>
                <input type="submit" name="Inscription" value="Inscription" className="bt" />
                {user && !user.error && !user.error_signup_email && !user.error_signup_password && <Redirect to="/publications" />}
                <div className="required-field"><span className="red">* </span>Champs obligatoires</div>
            </form>
        </div >
    );
};

export default SignUp;
