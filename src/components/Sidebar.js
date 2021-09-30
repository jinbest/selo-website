import React, { useState, useRef } from "react";
import { authStore } from "../store";
import { observer } from "mobx-react";
import { routerItems } from "../service/data/data";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const Sidebar = () => {
  const history = useHistory();

  const profile = authStore.profile;

  const [showSidebar, setShowSidebar] = useState(false);

  const handleClick = (item) => {
    if (item.action === "signout") {
      authStore.setIsSigned(false);
      history.push(item.route);
    } else {
      history.push(item.route);
    }
  };

  const handleMouseOver = () => {
    setShowSidebar(true);
  };

  const handleMouseLeave = () => {
    setShowSidebar(false);
  };

  return (
    <div
      className="side-bar"
      style={{ width: showSidebar ? "300px" : "50px" }}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container">
        <div
          className="profile"
          style={{ visibility: showSidebar ? "visible" : "hidden" }}
        >
          {profile.avatar ? (
            <Avatar alt={profile.fullname} src={profile.avatar} />
          ) : (
            <Avatar sx={{ bgcolor: "#66023c" }}>{profile.fullname[0]}</Avatar>
          )}
          <p className="full-name">{profile.fullname}</p>
          <p className="username">{profile.username}</p>
        </div>
        <ul
          className="nav-container"
          style={{ marginTop: showSidebar ? "25px" : "0px" }}
        >
          {routerItems.map((item, index) => (
            <li key={index}>
              {showSidebar && (
                <p
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  {item.name}
                </p>
              )}
            </li>
          ))}
        </ul>
        {showSidebar && (
          <div className="sidebar-footer">
            <p>Selo Leaderboard</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(Sidebar);
