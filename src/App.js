import React, { Fragment } from "react";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Homepage} />
      </Switch>
    </Fragment>
  );
}

export default App;
