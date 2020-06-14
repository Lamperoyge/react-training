import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import { Route, Switch } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInSignUp from "./pages/auth/sign-in-sign-up.component";
import { auth } from "./firebase/firebase.utils";
function App() {
  const [currentUser, setCurrentUser] = useState(null);

  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(user);
    });
    return function cleanup() {
      unsubscribeFromAuth();
    };
  }, []);
  return (
    <Fragment>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/signin" component={SignInSignUp} />
        <Route path="/shop" component={ShopPage} />
      </Switch>
    </Fragment>
  );
}

export default App;
