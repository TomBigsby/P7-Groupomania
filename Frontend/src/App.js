import { useEffect, useState } from "react";
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

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));


  useEffect(() => {
    // Vérifier la présence du token dans le localStorage au montage du composant
    const hasToken = localStorage.getItem("token");
    setIsLoggedIn(!!hasToken);

    // Vérifier la présence du token dans le localStorage à intervalles réguliers (toutes les 1 seconde par exemple)
    const interval = setInterval(() => {
      const hasToken = localStorage.getItem("token");
      setIsLoggedIn(!!hasToken);
    }, 1000);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          {/* Redirection vers "/publications" si l'utilisateur est connecté ou accède à "/" */}
          {isLoggedIn && <Redirect exact from="/login" to="/publications" />}
          {!isLoggedIn && <Redirect exact from="/" to="/login" />}

          <Route path="/page404" exact component={Page404} />

          {/* Routes pour l'utilisateur connecté */}
          {isLoggedIn ? (
            <>
              {/* Redirection vers "/publications" si l'utilisateur accède à "/login" */}
              <Route path="/login">
                <Redirect to="/publications" />
              </Route>
              <Route exact path="/">
                <Redirect to="/publications" />
              </Route>
              <Route path="/profil" exact>
                <PageProfile setIsLoggedIn={setIsLoggedIn} />
              </Route>
              <Route path="/publications" exact component={PagePublications} />
              <Route path="/suppression-profil" exact component={PageDeleteProfile} />
              <Route path="/nouvelle-publication" exact component={PageNewPublication} />


            </>
          ) : (
            // Routes pour l'utilisateur non connecté
            <>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/login" exact component={PageLogin} />
              <Route path="/inscription" exact component={PageSignUp} />
              {/* Redirection vers la page de connexion ("/login") si l'utilisateur accède à une URL privée */}
              <Redirect to="/login" />
            </>
          )}

          {/* Route pour la page 404 - Capturer toutes les URL inconnues */}
          <Route path="*" component={Page404} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
