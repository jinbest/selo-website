import React, { useState } from "react";
import { authStore } from "../store";
import { observer } from "mobx-react";
import { routerItems } from "../service/data/data";
import { useHistory, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { CONSTANTS, ROUTERS } from "../service/data/constant";

const Sidebar = () => {
  const history = useHistory();

  const profile = authStore.profile;

  const [showMenu, setShowMenu] = useState(
    new Array(routerItems.length).fill(false)
  );
  const [showName, setShowName] = useState(false);

  const handleClick = (item) => {
    if (item.action === CONSTANTS.SIGNOUT) {
      authStore.setIsSigned(false);
      history.push(item.route);
    } else {
      history.push(item.route);
    }
  };

  const handleMouseOver = (index) => {
    showMenu[index] = true;
    setShowMenu([...showMenu]);
  };

  const handleMouseLeave = (index) => {
    showMenu[index] = false;
    setShowMenu([...showMenu]);
  };

  return (
    <div className="side-bar">
      <div className="container">
        <div className="profile">
          <Link
            className="avatar"
            onMouseOver={() => setShowName(true)}
            onMouseLeave={() => setShowName(false)}
            to={ROUTERS.profile}
          >
            {profile.avatar ? (
              <Avatar alt={profile.fullname} src={profile.avatar} />
            ) : (
              <Avatar sx={{ bgcolor: "#66023c" }}>{profile.fullname[0]}</Avatar>
            )}
          </Link>
          <p
            className="full-name"
            style={{ visibility: showName ? "visible" : "hidden" }}
          >
            {profile.fullname}
          </p>
          <p
            className="username"
            style={{ visibility: showName ? "visible" : "hidden" }}
          >
            {profile.username}
          </p>
        </div>
        <ul className="nav-container">
          {routerItems.map((item, index) => (
            <li
              key={index}
              onMouseOver={() => handleMouseOver(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{ width: showMenu[index] ? "300px" : "50px" }}
            >
              {showMenu[index] && (
                <>
                  {item.action !== CONSTANTS.NONE ? (
                    <p
                      onClick={() => {
                        handleClick(item);
                      }}
                    >
                      {item.name}
                    </p>
                  ) : (
                    <Link to={item.route}>{item.name}</Link>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default observer(Sidebar);
