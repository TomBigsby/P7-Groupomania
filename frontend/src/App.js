import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router'


import PageLogin from "./pages/PageLogin";
import PageSignUp from "./pages/PageSignUp";
import PageProfile from "./pages/PageProfile";
import PageDeleteProfile from "./pages/PageDeleteProfile";
import PagePublications from "./pages/PagePublications";
import PageNewPublication from "./pages/PageNewPublication";
import Page404 from "./pages/Page404";


function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Switch>


          <Route path="/" exact component={PageLogin} />
          
          {localStorage.getItem("token") === null ?
            <>
              <Redirect to="/page404" />
              <Route path="/page404" exact component={Page404} />
            </>
            :
            <>
              <Route path="/inscription" exact component={PageSignUp} />
              <Route path="/profil" exact component={PageProfile} />
              <Route path="/supression-profil" exact component={PageDeleteProfile} />
              <Route path="/publications" exact component={PagePublications} />
              <Route path="/nouvelle-publication" exact component={PageNewPublication} />
            </>
          }
          



        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
