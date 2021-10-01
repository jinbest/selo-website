import React, { useEffect } from "react";
import selo from "../../assets/img/selo.png";
import SignupForm from "./signup-form";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { authStore } from "../../store";
import { ROUTERS } from "../../service/data/constant";
import "./authentication.scss";

const Signup = (props) => {
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
        <h1>create an account by entering your details below</h1>

        <SignupForm setToastParams={props.setToastParams} />

        <p className="sign-bottom-text" style={{ marginTop: "50px" }}>
          Already on SELO?
          <span
            onClick={() => {
              history.push(ROUTERS.login);
            }}
          >
            log in here
          </span>
        </p>
      </div>
    </div>
  );
};

export default observer(Signup);
