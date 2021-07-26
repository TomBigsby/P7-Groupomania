import { BrowserRouter, Switch, Route } from "react-router-dom";

import PageLogin from "./pages/PageLogin";
import PageSignUp from "./pages/PageSignUp";
import PageProfile from "./pages/PageProfile";
import PageDeleteProfile from "./pages/PageDeleteProfile";
import PagePublications from "./pages/PagePublications";
import PageNewPublication from "./pages/PageNewPublication";
import Page404 from "./pages/Page404";
import UserInfos from "./components/UserInfos";

import { useEffect, useState } from 'react';
import { Redirect } from 'react-router'

// DEBUG
import PageTest1 from "./pages/PageTest1";
import PageTest2 from "./pages/PageTest2";



function App() {

 


  /*   const [userToken, setUserToken] = useState(false)
  
    useEffect(() => {
      if (localStorage.getItem("token") === null) {
        setUserToken(false)
  
        console.log("TOKEN false: " + userToken);
      } else {
        JSON.parse(localStorage.getItem("token"));
  
        setUserToken(true)
        console.log("TOKEN true: " + userToken);
      }
    }, [userToken]) */




  //TODO 
  // Token OK > /publication  -> publications  (OK)
  // Token NOK > /publication  ->  404  (OK)
  // Token OK > /dfgsdfg  ->  page vide > (NOK)
  // Si pas de token et connexion > ne charge pas assez vite le token > mettre un Set Timeout





  return (
    <div className="App">

      {/* <UserInfos /> */}
      <BrowserRouter>
        <Switch>

          <Route path="/" exact component={PageLogin} />
          <Route path="/inscription" exact component={PageSignUp} />
          {/* <Route component={Page404} /> */}

          {(!localStorage.getItem("token")) ?
            <>
              <Redirect to="/page404" />
              <Route component={Page404} />
            </>
            :
            <>
              <Route path="/profil" exact component={PageProfile} />
              <Route path="/supression-profil" exact component={PageDeleteProfile} />
              <Route path="/publications" exact component={PagePublications} />
              <Route path="/nouvelle-publication" exact component={PageNewPublication} />
              {/* <Route component={Page404} /> */}
            </>
          }






        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
