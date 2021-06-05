import DeleteProfile from "../components/DeleteProfile"
import HeaderSmall from "../components/HeaderSmall";

const PageDeleteProfile = () => {
    return (
        <div>
            <HeaderSmall />
            <div className="main">
                <DeleteProfile />
            </div>
        </div>
    );
};

export default PageDeleteProfile;