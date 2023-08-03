import { Link } from "react-router-dom";
import Header from "../components/Header";

const Page404 = () => {
    return (
        <>
           <Header />
            <div className="main">
                <div className="page404">
                    <h1>Erreur 404</h1>
                    <div className="message404">page non trouvée</div>
                    <Link exact to="/">Retour à l'accueil</Link>
                </div>
            </div>
        </>
    );
};

export default Page404;