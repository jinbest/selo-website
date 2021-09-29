import React, { useState } from "react";
import { Provider, observer } from "mobx-react";
import { authStore } from "./store";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import HomePage from "./pages/homepage";
import Login from "./pages/authentication/login";
import Signup from "./pages/authentication/signup";
import Toast from "./components/Toast";
import "./assets/style/index.scss";

function App() {
  const [toastParams, setToastParams] = useState({});

  const resetStatuses = () => {
    setToastParams({
      msg: "",
      isError: false,
      isWarning: false,
      isInfo: false,
      isSuccess: false,
    });
  };

  return (
    <Provider authStore={authStore}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/login"
            render={() => <Login setToastParams={setToastParams} />}
          />
          <Route
            path="/signup"
            render={() => <Signup setToastParams={setToastParams} />}
          />
          {!authStore.isSigned && <Redirect to={{ pathname: "/login" }} />}
        </Switch>
      </Router>

      <Toast params={toastParams} resetStatuses={resetStatuses} />
    </Provider>
  );
}

export default observer(App);
