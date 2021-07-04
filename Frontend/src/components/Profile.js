import { NavLink } from 'react-router-dom';
import avatarRalph from '../assets/images/avatar-ralph.jpg'
import { useRef } from 'react'

const Profile = () => {


    // const [isEditMode, setIsEditMode] = useState(false);
    // const [userData, setUserData] = useState({ username: "", service: "", job: "" });

    const usernameDiv = useRef();
    const usernameInput = useRef();
    const userServiceDiv = useRef();
    const userServiceInput = useRef();
    const userJobDiv = useRef();
    const userJobInput = useRef();

    const blocDisplay1 = useRef();
    const blocEdit1 = useRef();
    const blocDisplay2 = useRef();
    const blocEdit2 = useRef();
    const blocDisplay3 = useRef();
    const blocEdit3 = useRef();


    let currentUserInfos = JSON.parse(localStorage.getItem("currentUserInfos"));

    let username = currentUserInfos.username
    let userService = "Service"
    let userJob = "Poste occupé"

   

    const editMode = (blocEdit, blocDisplay) => {
        blocDisplay.current.classList.add("invisible");
        blocEdit.current.classList.remove("invisible");

        usernameInput.current.focus();
        usernameInput.current.select();
    }

    const displayMode = (blocDisplay, blocEdit, valueInput, valueDiv, valueVar, LSValue) => {

        blocEdit.current.classList.add("invisible");
        blocDisplay.current.classList.remove("invisible");

        valueVar = valueInput.current.value
        valueDiv.current.textContent = valueVar

        console.log(LSValue + " = " + valueVar);
        console.log(valueVar);

        currentUserInfos = {
            username: usernameDiv.current.textContent,
            userservice: userServiceDiv.current.textContent,
            userJob: userJobDiv.current.textContent
        }

        localStorage.setItem("currentUserInfos", JSON.stringify(currentUserInfos));

        sendProfileData()
    }


    


    const sendProfileData = () => {

        fetch('http://localhost:4200/api/auth/login', {
            method: 'PUT',
            body: JSON.stringify({
                username: currentUserInfos.username,
                userService: currentUserInfos.userService,
                userJob: currentUserInfos.userJob
            }),
            headers: { 'Content-Type': 'application/json' },
        })


    }


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


            <div className="blocDisplay" ref={blocDisplay1}>
                <div className="divRow">
                    <div className="username" ref={usernameDiv}>{username} </div>
                    <div className="picto" onClick={() => editMode(blocEdit1, blocDisplay1)}><i className="fas fa-edit"></i></div>
                </div>
            </div>
            <div className="bloc-edit invisible" ref={blocEdit1}>
                <div className="divRow">
                    <input className="edit-field" type="text" defaultValue={username} ref={usernameInput} />
                    <div className="picto" onClick={() => displayMode(blocDisplay1, blocEdit1, usernameInput, usernameDiv, username, currentUserInfos.username)}><i className="fas fa-check-square picto-surrounded"></i></div>
                </div>
            </div>


            <div className="blocDisplay" ref={blocDisplay2}>
                <div className="divRow">
                    <div className="username" ref={userServiceDiv}>{userService} </div>
                    <div className="picto" onClick={() => editMode(blocEdit2, blocDisplay2)}><i className="fas fa-edit"></i></div>
                </div>
            </div>
            <div className="bloc-edit invisible" ref={blocEdit2}>
                <div className="divRow">
                    <input className="edit-field" type="text" defaultValue={userService} ref={userServiceInput} />
                    <div className="picto" onClick={() => displayMode(blocDisplay2, blocEdit2, userServiceInput, userServiceDiv, userService)}><i className="fas fa-check-square picto-surrounded"></i></div>
                </div>
            </div>


            <div className="blocDisplay" ref={blocDisplay3}>
                <div className="divRow">
                    <div className="username" ref={userJobDiv}>{userJob} </div>
                    <div className="picto" onClick={() => editMode(blocEdit3, blocDisplay3)}><i className="fas fa-edit"></i></div>
                </div>
            </div>
            <div className="bloc-edit invisible" ref={blocEdit3}>
                <div className="divRow">
                    <input className="edit-field" type="text" defaultValue={userJob} ref={userJobInput} />
                    <div className="picto" onClick={() => displayMode(blocDisplay3, blocEdit3, userJobInput, userJobDiv, userJob)}><i className="fas fa-check-square picto-surrounded"></i></div>
                </div>
            </div>

            <div className="separatorH"></div>
            <div className="signout-delete-account">
                <NavLink exact to="/" className="bt-signout-account"><i className="fas fa-sign-out-alt"></i></NavLink>
                <NavLink exact to="/supression-profil" className="bt-delete-account"><i className="far fa-trash-alt"></i></NavLink>
            </div>
        </div >
    );
};

export default Profile;