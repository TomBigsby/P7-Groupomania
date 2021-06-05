import Header from "../components/Header";
import Login from "../components/Login";

const PageLogin = () => {
    return (
        <div>
            <Header />
            <div className="main">
                <Login />
            </div>
        </div>
    );
};

export default PageLogin;