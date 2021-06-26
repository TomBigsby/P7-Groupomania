import { useState, useRef, useEffect } from 'react'

const PageTest = () => {


    /* const monsteraPrice = 8
    const [cart, updateCart] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    return isOpen ? (
        <div className='lmj-cart'>
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

    const [isEditMode, setIsEditMode] = useState(false)

    const champModif = useRef();
    const username = useRef();


/*     useEffect(() => {
        // console.log(champModif);
        let myValue = champModif;
    }, [isEditMode])


    Utiliser e.target.value avec un onCLick sur le bouton

    
 */
    const modif = () => {
        
        
        // champModif.current.value = "username.current.textContent";
        setIsEditMode(true)
        // champModif.current.focus();
        // champModif.current.select();

    }



    return (
        <div className='container' style={{ width: "200px", height: "200px" }}>

            {isEditMode ? (
                <>
                    <button onClick={() => setIsEditMode(false)}><i className="fas fa-check-square" style={{ padding: "5px" }}></i></button>
                    <input type="text" defaultValue={username} className="edit-field" ref={champModif} />

                </>
            ) : (
                <>
                    <button onClick={modif}><i className="fas fa-edit" style={{ padding: "5px" }}></i></button>
                    <div ref={username}>Edward</div>
                </>
            )}
        </div>
    );
};

export default PageTest;