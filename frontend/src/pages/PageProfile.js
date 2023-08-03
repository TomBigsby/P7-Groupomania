import HeaderSmall from "../components/HeaderSmall"
import Profile from "../components/Profile"

const PageProfile = ({ setIsLoggedIn }) => {
    return (
        <>
            <HeaderSmall />
            <div className="main">
                <Profile setIsLoggedIn={setIsLoggedIn} />
            </div>
        </>
    );
};

export default PageProfile;