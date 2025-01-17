import React, { useEffect } from "react";
import selo from "../../assets/img/selo.png";
import LoginForm from "./login-form";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { authStore } from "../../store";
import { ROUTERS } from "../../service/data/constant";
import "./authentication.scss";

const Login = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (authStore.isSigned) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="authentication">
      <div className="container">
        <img src={selo} alt="selo" />
        <h1>Please enter your login details below</h1>

        <LoginForm setToastParams={props.setToastParams} />

        <p className="sign-bottom-text" style={{ marginTop: "100px" }}>
          New to SELO?
          <span
            onClick={() => {
              history.push(ROUTERS.signup);
            }}
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default observer(Login);
