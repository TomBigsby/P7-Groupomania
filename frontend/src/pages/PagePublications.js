import { Link } from "react-router-dom";
import HeaderSmall from "../components/HeaderSmall";
import Publications from "../components/Publications";

const PagePublications = () => {


    return (
        <>
            <HeaderSmall />
            <div className="main">
                <div className="intro">Les dernières publications</div>
                <Publications />
                <Link exact to="/nouvelle-publication" className="bt-new-publication"><i className="fas fa-edit"></i></Link>
            </div>

        </>
    );
};

export default PagePublications;
