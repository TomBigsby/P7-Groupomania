import { NavLink } from "react-router-dom";
import HeaderSmall from "../components/HeaderSmall";
import Messages from "../components/Messages";

const PageMessages = () => {
    return (
        <div>
            <HeaderSmall />
            <div className="main">
                <div className="intro">Les derniers messages</div>
                <Messages />
                <Messages />
                <NavLink exact to="/nouveau-message" className="bt-new-message"><i class="far fa-edit"></i></NavLink>
            </div>
        </div>
    );
};

export default PageMessages;