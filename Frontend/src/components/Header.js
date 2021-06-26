import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <>
            <div className="header bg-big">
            <NavLink exact to="/"><div className="logo logo-big"></div></NavLink>
            </div>
            <div className="main-position bg-big"></div>
        </>
    );
};

export default Header;