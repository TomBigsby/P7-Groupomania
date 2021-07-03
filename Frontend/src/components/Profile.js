import { NavLink } from 'react-router-dom';
import avatarRalph from '../assets/images/avatar-ralph.jpg'
import { useRef } from 'react'

const Profile = () => {

    const usernameDiv = useRef();
    const usernameInput = useRef();
    const serviceDiv = useRef();
    const serviceInput = useRef();
    const jobDiv = useRef();
    const jobInput = useRef();


    let currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos")) || [];

    let username
    if (localStorage.getItem("currentUserInfos") === null) {
        username = "bob"
    } else {
        username = currentUserInfos.username
    }


    let userService = "Service Data"
    let userJob = "Data analist"

    const blocDisplay = useRef();
    const blocEdit = useRef();


    const editMode = () => {

        blocDisplay.current.classList.add("invisible");
        blocEdit.current.classList.remove("invisible");

        usernameInput.current.focus();
        usernameInput.current.select();
    }

    const displayMode = () => {
        blocEdit.current.classList.add("invisible");
        blocDisplay.current.classList.remove("invisible");

        username = usernameInput.current.value
        usernameDiv.current.textContent = username
        currentUserInfos={
            username : username
        }

        localStorage.setItem("currentUserInfos", JSON.stringify(currentUserInfos));
    }

    /*     const displayMode = (elementDiv, elementVar, elementInput) => {
            blocEdit.current.classList.add("invisible");
            blocDisplay.current.classList.remove("invisible");
    
            elementVar = elementInput.current.value
            elementDiv.current.textContent = elementVar
        } */



    // ---------   code pour valider les modif avec la touche ENTER  --------
    /* const pressEnter = useKeyPress("Enter");

    function useKeyPress(targetKey) {
        const [keyPressed, setKeyPressed] = useState < boolean > (false);
        function downHandler({ key }) {
            if (key === targetKey) {
                setKeyPressed(true);
            }
        }
        // Add event listeners
        useEffect(() => {
            window.addEventListener("keydown", downHandler);
            // window.addEventListener("keyup", upHandler);
            return () => {
                window.removeEventListener("keydown", downHandler);
                // window.removeEventListener("keyup", upHandler);
            };
        }, []);
        return keyPressed;
    } */
    // ----------------------------------

    return (
        <div className="container">
            <div className="bt-close"><i className="fas fa-times"></i></div>
            <NavLink exact to="/publications" className="bt-close"><i className="fas fa-times"></i></NavLink>
            <div className="avatar-profile"><img src={avatarRalph} alt="" /></div>



            <div className="bloc-display" ref={blocDisplay}>
                <div className="divRow">
                    <div className="username" ref={usernameDiv}>{username} </div>
                    <div className="picto" onClick={editMode}><i className="fas fa-edit"></i></div>
                </div>
            </div>

            <div className="bloc-edit invisible" ref={blocEdit}>
                <div className="divRow">
                    <input className="edit-field" type="text" defaultValue={username} ref={usernameInput} />
                    <div className="picto" onClick={displayMode}><i className="fas fa-check-square picto-surrounded"></i></div>
                </div>
            </div>




            {/* 
            <div className="bloc-display" ref={blocDisplay}>
                <div className="divRow">
                    <div className="service" ref={serviceDiv}>{userService} </div>
                    <div className="picto" onClick={editMode(serviceInput)}><i className="fas fa-edit"></i></div>
                </div>
            </div>

            <div className="bloc-edit invisible" ref={blocEdit}>
                <div className="divRow">
                    <input className="edit-field" type="text" defaultValue={userService} ref={serviceInput} />
                    <div className="picto" onClick={displayMode(serviceDiv, userService, serviceInput)}><i className="fas fa-check-square picto-surrounded"></i></div>
                </div>
            </div>



            <div className="bloc-display" ref={blocDisplay}>
                <div className="divRow">
                    <div className="job" ref={jobDiv}>{userJob} </div>
                    <div className="picto" onClick={editMode(jobInput)}><i className="fas fa-edit"></i></div>
                </div>
            </div>

            <div className="bloc-edit invisible" ref={blocEdit}>
                <div className="divRow">
                    <input className="edit-field" type="text" defaultValue={userJob} ref={jobInput} />
                    <div className="picto" onClick={displayMode(jobDiv, userJob, jobInput)}><i className="fas fa-check-square picto-surrounded"></i></div>
                </div>
            </div> */}






            {/* 
            <div className="service">Equipe web
                <div className="pictos">
                    <div className="picto"><i className="fas fa-edit"></i></div>
                </div>
            </div>

            <div className="service">Développeur
                <div className="pictos">
                    <div className="picto"><i className="fas fa-edit"></i></div>
                </div>
            </div> */}
            <div className="separatorH"></div>
            <div className="signout-delete-account">
                <NavLink exact to="/" className="bt-signout-account"><i className="fas fa-sign-out-alt"></i></NavLink>
                <NavLink exact to="/supression-profil" className="bt-delete-account"><i className="far fa-trash-alt"></i></NavLink>
            </div>
        </div >
    );
};

export default Profile;