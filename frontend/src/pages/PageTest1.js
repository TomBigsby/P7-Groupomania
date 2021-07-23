// import { useState, useRef, useEffect } from 'react'
// import ToggleButton from '../components/ToggleButton'

const PageTest = () => {


    // let state = false
    // const [isPressed, setIsPressed] = useState(state);

    /* const monsteraPrice = 8
    const [cart, updateCart] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    return isOpen ? (
        <div className='lm-cart'>
            <button onClick={() => setIsOpen(false)}>Fermer</button>
            <h2>Panier</h2>
            <div>
                Monstera : {monsteraPrice}€
                <button onClick={() => updateCart(cart + 1)}>
                    Ajouter
                </button>
            </div>
            <h3>Total : {monsteraPrice * cart}€</h3>
        </div>
    ) : (
        <button onClick={() => setIsOpen(true)}>Ouvrir le Panier</button>
    ) */

    // const [isEditMode, setIsEditMode] = useState(false)
/* 
    const usernameInput = useRef();
    const usernameDiv = useRef();
    const blocDisplay = useRef();
    const blocEdit = useRef();

    let username = "Edwardo" */


    /*     useEffect(() => {
            // console.log(champModif);
            let myValue = champModif;
        }, [isEditMode])
    
        
        
     */
    /*     const modif = (e) => {
            if (champModif) {
                console.log(champModif);
            } else {
                console.log("nope");
            }
    
            console.log(champModif);
    
            // username = champModif.current.value;
            setIsEditMode(true)
            // champModif.current.focus();
            // champModif.current.select();
        } */

 /*    const editMode = (e) => {
        blocDisplay.current.classList.add("invisible");
        blocEdit.current.classList.remove("invisible");

        usernameInput.current.focus();
        usernameInput.current.select();
    }
    const displayMode = (e) => {
        blocEdit.current.classList.add("invisible");
        blocDisplay.current.classList.remove("invisible");

        username = usernameInput.current.value
        usernameDiv.current.textContent = username
    } */


    // récup la valeur d'un input
/*     const getInputValue = (e) => {
        e.preventDefault()
        console.log(e.target['my_input'].value)

     
    } */





 /*    return (
        <div className='container' style={{ width: "200px", height: "200px" }}>

            <div className="bloc-display" ref={blocDisplay}>
                <button onClick={editMode}><i className="fas fa-edit" style={{ padding: "5px" }}></i></button>
                <div ref={usernameDiv}>{username} </div>
            </div>


            <button onClick={toggle} className={isPressed ? 'wrg-toggle--checked' : 'wrg-toggle'}>
                {isPressed ? <span>False</span> : <span>True</span>}
            </button>


            <ToggleButton defaultChecked={true} />



            <div className="bloc-edit invisible" ref={blocEdit}>
                <button onClick={displayMode}><i className="fas fa-check-square" style={{ padding: "5px" }}></i></button>
                <input type="text" defaultValue={username} name="usernameEdit" ref={usernameInput} />
            </div>


        </div >
    ); */
};

export default PageTest;