import React, { useState } from "react";
import { chartData } from "../service/data/data";
import helper from "../assets/img/helper.png";
import MouseOverPopover from "./MouseOverPopover";
import _ from "lodash";

const Chart = () => {
  const maxVal = _.maxBy(chartData, (o) => o.value).value,
    rate = maxVal > 0 ? 350 / maxVal : 1,
    topVal = 65;

  const [anchorElBar, setAnchorElBar] = useState(null);
  const [anchorElChart, setAnchorElChart] = useState(null);
  const [anchorElTop, setAnchorElTop] = useState(null);
  const [anchorEls, setAnchorEls] = useState(
    new Array(chartData.length).fill(null)
  );

  const handlePopoverOpenBar = (event) => {
    setAnchorElBar(event.currentTarget);
  };

  const handlePopoverCloseBar = () => {
    setAnchorElBar(null);
  };

  const handlePopoverOpenChart = (event) => {
    setAnchorElChart(event.currentTarget);
  };

  const handlePopoverCloseChart = () => {
    setAnchorElChart(null);
  };

  const barOptions = {
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center",
    },
  };

  return (
    <div className="custom-chart">
      <div
        className="chart-element"
        style={{ width: `${100 / (chartData.length + 1)}%` }}
      >
        <div
          className="chart-bar"
          style={{ height: topVal * rate }}
          aria-owns="top-helper"
          aria-haspopup="true"
          onMouseEnter={(e) => {
            setAnchorElTop(e.currentTarget);
          }}
          onMouseLeave={() => {
            setAnchorElTop(null);
          }}
        />
        <p className="rotate-45" style={{ marginTop: "10px" }}>
          top
          <br />
          500
        </p>
      </div>
      <MouseOverPopover
        id="top-helper"
        anchorEl={anchorElTop}
        handleCloseAnchorEl={() => {
          setAnchorElTop(null);
        }}
        text={`Top: ${topVal}`}
        options={barOptions}
      />
      {chartData.map((item, index) => (
        <div
          className="chart-element"
          style={{ width: `${100 / (chartData.length + 1)}%` }}
          key={index}
        >
          {item.avatar && (
            <div className="avatar-chart">
              <img src={item.avatar} alt="chart-avatar" />
              <div className="line-box">
                <img
                  src={helper}
                  alt="helper"
                  aria-owns="chart-bar-helper"
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpenBar}
                  onMouseLeave={handlePopoverCloseBar}
                />
              </div>
            </div>
          )}
          <div
            className="chart-bar"
            style={{ height: item.value * rate }}
            aria-owns={`chart-bar-${index}`}
            aria-haspopup="true"
            onMouseEnter={(e) => {
              anchorEls[index] = e.currentTarget;
              setAnchorEls([...anchorEls]);
            }}
            onMouseLeave={() => {
              anchorEls[index] = null;
              setAnchorEls([...anchorEls]);
            }}
          />
          <p className="rotate-45">
            {item.label}
            {index === chartData.length - 1 && (
              <span className="chart-helper rotate45">
                <img
                  src={helper}
                  alt="helper"
                  aria-owns="chart-helper"
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpenChart}
                  onMouseLeave={handlePopoverCloseChart}
                />
              </span>
            )}
          </p>
          <MouseOverPopover
            id={`chart-bar-${index}`}
            anchorEl={anchorEls[index]}
            handleCloseAnchorEl={() => {
              anchorEls[index] = null;
              setAnchorEls([...anchorEls]);
            }}
            text={`${item.label}: ${item.value}`}
            options={barOptions}
          />
        </div>
      ))}
      <div className="selo-leaderboard">
        <p>selo leaderboard</p>
      </div>
      <MouseOverPopover
        id="chart-bar-helper"
        anchorEl={anchorElBar}
        handleCloseAnchorEl={handlePopoverCloseBar}
        text="this is a visual representation of your SELO Score and overall position on the global SELO Leaderboard"
      />
      <MouseOverPopover
        id="chart-helper"
        anchorEl={anchorElChart}
        handleCloseAnchorEl={handlePopoverCloseChart}
        text="users are assigned tiers depending on their SELO score, and can move between each one based on your latest current score"
      />
    </div>
  );
};

export default Chart;
