import avatarRalph from '../assets/images/avatar-ralph.jpg'

const Profile = () => {
    return (
        <div className="container">
            <div className="avatar-profile"><img src={avatarRalph} alt="" /></div>
            <div className="name">Ralph EDWARDS
                <div className="pictos">
                    <div className="picto picto-edit"><i class="far fa-edit"></i></div>
                </div>
            </div>
            <div className="service">Equipe web
                <div className="pictos">
                    <div className="picto picto-edit"><i class="far fa-edit"></i></div>
                </div>
            </div>
            <div className="fonction">Développeur
                <div className="pictos">
                    <div className="picto picto-edit"><i class="far fa-edit"></i></div>
                </div>
            </div>
            <div className="space"></div>
            <div className="separatorH"></div>
            <div className="delete-account">
                <div className="bt-delete-account"><i class="far fa-trash-alt"></i></div>
            </div>
        </div>
    );
};

export default Profile;