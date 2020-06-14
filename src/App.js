import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import { Route, Switch } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInSignUp from "./pages/auth/sign-in-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
function App() {
  const [currentUser, setCurrentUser] = useState(null);

  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
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
