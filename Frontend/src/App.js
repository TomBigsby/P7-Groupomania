import { BrowserRouter, Switch, Route } from "react-router-dom";

import PageLogin from "./pages/PageLogin";
import PageSignUp from "./pages/PageSignUp";
import PageProfile from "./pages/PageProfile";
import PageDeleteProfile from "./pages/PageDeleteProfile";
import PageMessages from "./pages/PageMessages";
import PageNewMessage from "./pages/PageNewMessage";
// import Page404 from "./pages/Page404";
import { useEffect } from 'react';


// Test Front to back
function App() {

  const data = () => {

    const order = {
      firstName: "bob",
      lastName: "smith",
      address: "formAdress",
      city: "formCity",
      email: "formEmail"
    };

    //appel de notre url en backend
    fetch("http://localhost:4200/api/publication", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json()
        .then(response => console.log(response)))
  }

 //  -------------------


  return (
    // <div className="App" onClick={data}>
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={PageLogin} />
          <Route path="/inscription" exact component={PageSignUp} />
          <Route path="/profil" exact component={PageProfile} />
          <Route path="/supression-profil" exact component={PageDeleteProfile} />
          <Route path="/messages" exact component={PageMessages} />
          <Route path="/nouveau-message" exact component={PageNewMessage} />
          {/* <Route component={Page404} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
