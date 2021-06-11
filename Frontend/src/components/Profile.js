import { NavLink } from 'react-router-dom';
import avatarRalph from '../assets/images/avatar-ralph.jpg'
import { useRef } from 'react'

const Profile = () => {

    const champModif = useRef();
    const username = useRef();
    const btEditUsername = useRef();
    const iconEdit = useRef();

    const modif = () => {
        btEditUsername.current.classList.replace("fa-edit", "fa-check-square")
        iconEdit.current.classList.replace("picto", "picto-surrounded")
        champModif.current.classList.remove("hide")
        champModif.current.value = username.current.textContent;
        champModif.current.focus()
        champModif.current.select()
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
            <div className="bt-close"><i class="fas fa-times"></i></div>
            <NavLink exact to="/publications" className="bt-close"><i class="fas fa-times"></i></NavLink>
            <div className="avatar-profile"><img src={avatarRalph} alt="" /></div>
            <div className="username" ref={username}>Ralph EDWARDS
                    <div className="pictos">
                    <div className="picto" ref={iconEdit} ><i class="fas fa-edit" onClick={modif} ref={btEditUsername}></i></div>

                </div>
                <input type="text" className="edit-field hide" ref={champModif} />
            </div >
            <div className="service">Equipe web
                    <div className="pictos">
                    <div className="picto"><i class="fas fa-edit"></i></div>
                </div>
            </div>

            <div className="service">Développeur
                    <div className="pictos">
                    <div className="picto"><i class="fas fa-edit"></i></div>
                </div>
            </div>
            <div className="separatorH"></div>
            <div className="signout-delete-account">
                <NavLink exact to="/" className="bt-signout-account"><i class="fas fa-sign-out-alt"></i></NavLink>
                <NavLink exact to="/supression-profil" className="bt-delete-account"><i class="far fa-trash-alt"></i></NavLink>
            </div>
        </div >
    );
};

export default Profile;