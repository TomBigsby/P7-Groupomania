import HeaderSmall from "../components/HeaderSmall"
import NewMessage from "../components/NewMessage"

const PageNewMessage = () => {
    return (
        <div>
            <HeaderSmall />
            <div className="main">
                <NewMessage />
            </div>
        </div>
    );
};

export default PageNewMessage;