const Login = () => {
    return (
        <div className="main">
            <div className="welcome">Bienvenue</div>
            <div className="filet"></div>
            <div className="connect">Connectez-vous</div>
            <form className="login-form">
                <label htmlFor="email">email <span className="red">* </span></label>
                <input type="email" id="email" />
                <div className="error-email"></div>
                <label htmlFor="password">mot de passe <span className="red">* </span></label>
                <input type="password" id="password" />
                <div className="error-password"> &lt; message d'erreur &gt;</div>
                <button className="bt-valid">Connexion</button>
                <div className="signin-link">Vous n'avez pas de compte ? <a href="signin.html"> inscrivez-vous</a></div>
                <div className="required-field"><span className="red">* </span>Champs obligatoires</div>
            </form>
        </div>
    );
};

export default Login;