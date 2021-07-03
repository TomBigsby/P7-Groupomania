import React from 'react';
import { useState } from 'react'

const ToggleButton = () => {

    const [stateUp, setStateUp] = useState(false);
    const [stateDown, setStateDown] = useState(false);
    const [stateZero, setStateZero] = useState(false);
    const [stateValue, setStateValue] = useState(0);


    const triggerToggleUp = () => {
        setStateUp(!stateUp)
        setStateValue(1)
    }

    const triggerToggleDown = () => {
        setStateDown(!stateDown)
        setStateValue(-1)
    }

    const triggerToggleZero = () => {
        setStateZero(!stateZero)
        setStateValue(0)
    }





    /*  const likeValue = () => {
         if (stateUp) {
             setStateValue(1)
         }
         else if (stateDown) {
             setStateValue(-1)
         }
         else {
             setStateValue(0)
         }
     }
 
 
     const triggerToggleUp = () => {
         setStateUp(!stateUp)
         likeValue()
     }
 
 
     const triggerToggleDown = () => {
         setStateDown(!stateDown)
         likeValue()
     } */



    // let newToggleUp = state.toggleUp === false ? true : false
    // let newValue = state.cpt === 0 ? 1 : 0;

    // setState(!state)

    // setState({ toggle: 1, cpt: 1 })



    // setState({ toggleUp: newToggleUp, toggleDown: newToggleDown, cptUp: newValue })


    /*  if (state === "yes") {
         console.log("yes");
         triggerToggle(1)
     }
     if (toggle === 0 && state === "no") {
         triggerToggle(-1)
         // e.target.style.backgroundColor = "red"
     } else {
         triggerToggle(0)
         // e.target.style.backgroundColor = "green"
     }
*/



    // if (toggle !== 0) {
    //     triggerToggle(0)
    //     console.log(0);
    // }
    // if (e.target.value === "yes") {
    //     triggerToggle(1)
    // }
    // if (e.target.value === "no") {
    //     triggerToggle(-1)
    // }

    // Si like = 0 > si up =1 alors 0 ET on décrémente le nombre de likes
    //               si down =-1 alors 0 ET on décrémente le nombre de dislikes
    // Si 

    return (
        <div>

            <button onClick={triggerToggleUp} style={stateUp ? { backgroundColor: "green" } : { backgroundColor: "White" }}>UP</button>

            <div>{stateValue}</div>

            <button onClick={triggerToggleDown} style={stateDown ? { backgroundColor: "red" } : { backgroundColor: "White" }}>DOWN
            </button>

            <button onClick={triggerToggleZero} >ZERO
            </button>

        </div >
    );
};

export default ToggleButton;