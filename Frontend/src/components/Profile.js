import avatar from '../assets/images/avatar.svg'

const Profile = () => {
    return (
        <div className="container">
            <div className="avatar-profile"><img src={avatar} alt="" /></div>
            <div className="name">BOB RAZOWSKI
                <div className="pictos">
                    <div className="picto picto-edit"></div>
                    <div className="picto picto-delete"></div>
                </div>
            </div>
            <div className="service">Equipe web
                <div className="pictos">
                    <div className="picto picto-edit"></div>
                </div>
            </div>
            <div className="fonction">Développeur
                <div className="pictos">
                    <div className="picto picto-edit"></div>
                </div>
            </div>
        </div>
    );
};

export default Profile;