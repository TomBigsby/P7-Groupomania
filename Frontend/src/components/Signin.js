import avatar from '../assets/images/avatar.svg'

const Signin = () => {
    return (
        <div className="login-container">
            <div className="welcome">Inscription</div>
            <div className="filet"></div>
            <div className="connect">Rejoignez-nous</div>
            <div className="avatar">
                <img src={avatar} alt="" />
            </div>
            <form className="signin-form">
                <div className="signin-form_line">
                    <div className="signin-form_line_bloc">
                        <label htmlFor="email">Email / nom d’utilisateur <span className="red">* </span></label>
                        <input type="email" id="email" />
                        <div className="corporate-domain">@groupomania</div>
                        <div className="error-email">&lt; message d'erreur &gt;</div>
                    </div>
                    <div className="signin-form_line_bloc">
                        <label htmlFor="password">mot de passe <span className="red">* </span></label>
                        <input type="password" id="password" />
                        <div className="error-password"> &lt; message d'erreur &gt;</div>
                    </div>
                </div>
                <div className="signin-form_line">
                    <div className="signin-form_line_bloc">
                        <label htmlFor="service">Service</label>
                        <input type="text" id="service" />
                    </div>
                    <div className="signin-form_line_bloc">
                        <label htmlFor="fonction">Poste occupé</label>
                        <input type="text" id="fonction" />
                    </div>
                </div>

                <button className="bt-valid">Inscription</button>
                <div className="required-field"><span className="red">* </span>Champs obligatoires</div>
            </form>
        </div>
    );
};

export default Signin;