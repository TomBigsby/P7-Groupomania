import { useState, useRef, useEffect } from 'react'
// import ToggleButton from '../components/ToggleButton'

const PageTest = () => {



    const inputTest = useRef()
    const reponse = useRef()
    let answer

    const verifcode = () => {
        let emailFilter = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)

        console.log(emailFilter.test(inputTest.current.value));

        answer = emailFilter.test(inputTest)
    }


    return (
        <>
            <div>
                <input type="text" ref={inputTest} style={{ width: "300px", height: "25px" }} />
                <button onClick={verifcode}>Valider</button>
                <div ref={reponse} style={{ color: 'white' }}>{answer}</div>
            </div>

        </>
    )
};

export default PageTest;