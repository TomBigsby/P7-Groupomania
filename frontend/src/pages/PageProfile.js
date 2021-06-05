import HeaderSmall from "../components/HeaderSmall"
import Profile from "../components/Profile"

const PageProfile = () => {
    return (
        <div>
            <HeaderSmall />
            <div className="main">
                <Profile />
            </div>
        </div>
    );
};

export default PageProfile;