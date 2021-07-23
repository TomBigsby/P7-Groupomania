import { BrowserRouter, Switch, Route } from "react-router-dom";

import PageLogin from "./pages/PageLogin";
import PageSignUp from "./pages/PageSignUp";
import PageProfile from "./pages/PageProfile";
import PageDeleteProfile from "./pages/PageDeleteProfile";
import PagePublications from "./pages/PagePublications";
import PageNewPublication from "./pages/PageNewPublication";

// DEBUG
import PageTest1 from "./pages/PageTest1";
import PageTest2 from "./pages/PageTest2";


// import Page404 from "./pages/Page404";
// import { useEffect } from 'react';



function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <Route path="/test1" exact component={PageTest1} />
          <Route path="/test2" exact component={PageTest2} />


          <Route path="/" exact component={PageLogin} />
          <Route path="/inscription" exact component={PageSignUp} />
          <Route path="/profil" exact component={PageProfile} />
          <Route path="/supression-profil" exact component={PageDeleteProfile} />
          <Route path="/publications" exact component={PagePublications} />
          <Route path="/nouvelle-publication" exact component={PageNewPublication} />
          {/* <Route component={Page404} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
