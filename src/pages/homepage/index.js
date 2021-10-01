import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { authStore } from "../../store";
import { useHistory } from "react-router-dom";
import seloRed from "../../assets/img/selo-red.png";
import { Grid } from "@material-ui/core";
import Chart from "../../components/Chart";
import ss from "../../assets/img/ss.png";
import helper from "../../assets/img/helper.png";
import ReactTooltip from "react-tooltip";
import { HelperTexts, ROUTERS } from "../../service/data/constant";
import AutoCounter from "../../components/AutoCounter";
import "./homepage.scss";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    if (!authStore.isSigned) {
      history.push(ROUTERS.login);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="homepage">
      <div className="container">
        <img src={seloRed} alt="selo-red" />
        <Grid container spacing={2} className="current-peak">
          <Grid item xs={6} className="left-text">
            <p>current</p>
          </Grid>
          <Grid item xs={6} className="right-text">
            <AutoCounter from={0} to={2926} duration={1} className="current" />
            <div className="badge">
              <img src={ss} alt="ss-peak" />
              <span className="liner-helper">
                <span data-tip data-for="ss-helper">
                  <img src={helper} alt="ss-helper" />
                </span>
              </span>
            </div>
          </Grid>
        </Grid>
        <div className="liner" />
        <Grid container spacing={2} className="current-peak">
          <Grid item xs={6} className="left-text">
            <p>peak</p>
          </Grid>
          <Grid item xs={6} className="right-text">
            <AutoCounter from={0} to={3055} duration={1.05} className="peak" />
            <div className="badge peak-badge">
              <img src={ss} alt="ss-peak" />
            </div>
          </Grid>
        </Grid>
        <Chart />
      </div>
      <ReactTooltip
        className="custom-tooptip large-tip"
        arrowColor="transparent"
        id="ss-helper"
        place="right"
        effect="solid"
      >
        {HelperTexts.SeloScore}
      </ReactTooltip>
    </div>
  );
};

export default observer(HomePage);
