import React, { Fragment, useEffect } from "react";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import { Route, Switch, Redirect } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInSignUp from "./pages/auth/sign-in-sign-up.component";
import {
  auth,
  createUserProfileDocument,
  addCollectionAndDocuments,
} from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser, checkUserSession } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import CheckoutPage from "./pages/checkout/checkout.component";
import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";
function App(props) {
  let unsubscribeFromAuth = null;

  // useEffect(() => {
  //   unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
  //     if (userAuth) {
  //       const userRef = await createUserProfileDocument(userAuth);

  //       userRef.onSnapshot((snapshot) => {
  //         props.setCurrentUser({
  //           id: snapshot.id,
  //           ...snapshot.data(),
  //         });
  //       });
  //     }
  //     props.setCurrentUser(userAuth);
  //     //it's done so that we can add data to our store
  //     // addCollectionAndDocuments(
  //     //   "collections",
  //     //   props.collectionsArray.map(({ title, items }) => ({ title, items }))
  //     // );
  //   });
  //   return function cleanup() {
  //     unsubscribeFromAuth();
  //   };
  // }, []);

  useEffect(() => {
    const { checkUserSession } = props;
    checkUserSession();
  }, []);
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route
          exact
          path="/signin"
          render={() =>
            props.currentUser ? <Redirect to="/" /> : <SignInSignUp />
          }
        />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
      </Switch>
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    checkUserSession: () => dispatch(checkUserSession()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
