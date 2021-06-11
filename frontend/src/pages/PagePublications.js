import { NavLink } from "react-router-dom";
import HeaderSmall from "../components/HeaderSmall";
import Publications from "../components/Publications";

const PagePublications = () => {
    return (
        <div>
            <HeaderSmall />
            <div className="main">
                <div className="intro">Les dernières publications</div>
                <Publications />
                <NavLink exact to="/nouvelle-publication" className="bt-new-publication"><i class="fas fa-edit"></i></NavLink>
            </div>
        </div>
    );
};

export default PagePublications;