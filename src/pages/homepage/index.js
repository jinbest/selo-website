import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { authStore } from "../../store";
import { useHistory } from "react-router-dom";
import seloRed from "../../assets/img/selo-red.png";
import { Grid } from "@material-ui/core";
import Chart from "../../components/Chart";
import ss from "../../assets/img/ss.png";
import helper from "../../assets/img/helper.png";
import MouseOverPopover from "../../components/MouseOverPopover";
import "./homepage.scss";

const HomePage = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (!authStore.isSigned) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="homepage">
      <div className="container">
        <img src={seloRed} alt="selo-red" />
        <Grid container spacing={2} className="current-peak">
          <Grid item xs={7} className="left-text">
            <p>current</p>
          </Grid>
          <Grid item xs={5} className="right-text">
            <p className="current">
              2926
              <span className="badge">
                <img src={ss} alt="ss-peak" />
                <span className="liner-helper">
                  <span
                    aria-owns="ss-helper"
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    <img src={helper} alt="ss-helper" />
                  </span>
                </span>
              </span>
            </p>
          </Grid>
        </Grid>
        <div className="liner" />
        <Grid container spacing={2} className="current-peak">
          <Grid item xs={7} className="left-text">
            <p>peak</p>
          </Grid>
          <Grid item xs={5} className="right-text">
            <p className="peak">
              3055
              <span className="badge">
                <img src={ss} alt="ss-peak" />
              </span>
            </p>
          </Grid>
        </Grid>
        <Chart />
      </div>
      <MouseOverPopover
        id="ss-helper"
        anchorEl={anchorEl}
        handleCloseAnchorEl={handlePopoverClose}
        text="This is your SELO Score (SS), which is a standardized representation of your social footprint. it is on a scale of 1-5000 and the greater it is, the greater your social media outreach is."
      />
    </div>
  );
};

export default observer(HomePage);
