import React from "react";
import { observer } from "mobx-react";
import { authStore } from "../../store";
import { Redirect } from "react-router-dom";
import "./homepage.scss";

const HomePage = () => {
  if (!authStore.isSigned) {
    return <Redirect to="/login" />;
  }

  return <div className="homepage">home page</div>;
};

export default observer(HomePage);
