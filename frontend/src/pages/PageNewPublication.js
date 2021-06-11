import HeaderSmall from "../components/HeaderSmall"
import NewPublication from "../components/NewPublication"

const PageNewPublication = () => {
    return (
        <div>
            <HeaderSmall />
            <div className="main">
                <NewPublication />
            </div>
        </div>
    );
};

export default PageNewPublication;