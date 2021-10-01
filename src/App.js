import React, { useState } from "react";
import { Provider, observer } from "mobx-react";
import { authStore } from "./store";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { ROUTERS } from "./service/data/constant";

import HomePage from "./pages/homepage";
import Login from "./pages/authentication/login";
import Signup from "./pages/authentication/signup";
import Toast from "./components/Toast";
import Sidebar from "./components/Sidebar";

import TrendsStatisTics from "./pages/trends-statistics";
import Comparables from "./pages/comparables";
import YourActivity from "./pages/your-activity";
import Privacy from "./pages/privacy";
import AboutSelo from "./pages/about-selo";
import MyProfile from "./pages/my-profile";

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
        <div className="main">
          {authStore.isSigned && <Sidebar />}

          <Switch>
            <Route exact path={ROUTERS.home} component={HomePage} />

            <Route
              path={ROUTERS.login}
              render={() => <Login setToastParams={setToastParams} />}
            />
            <Route
              path={ROUTERS.signup}
              render={() => <Signup setToastParams={setToastParams} />}
            />
            {!authStore.isSigned && (
              <Redirect to={{ pathname: ROUTERS.login }} />
            )}

            <Route path={ROUTERS.trends} component={TrendsStatisTics} />
            <Route path={ROUTERS.comparables} component={Comparables} />
            <Route path={ROUTERS.activity} component={YourActivity} />
            <Route path={ROUTERS.privacy} component={Privacy} />
            <Route path={ROUTERS.about} component={AboutSelo} />
            <Route path={ROUTERS.profile} component={MyProfile} />
          </Switch>

          <Toast params={toastParams} resetStatuses={resetStatuses} />
        </div>
      </Router>
    </Provider>
  );
}

export default observer(App);
