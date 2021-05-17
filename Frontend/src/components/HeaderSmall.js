import avatarRalph from '../assets/images/avatar-ralph.jpg'

const HeaderSmall = () => {
    return (
        <div>
            <div className="header bg-small">
                <div className="logo logo-small"></div>
                <div className="bg-avatar"><img src={avatarRalph} alt="" /></div>
            </div>
            <div className="main-position bg-small"></div>
        </div>
    );
};

export default HeaderSmall;