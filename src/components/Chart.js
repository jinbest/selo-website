import React, { useState, useLayoutEffect } from "react";
import { chartData } from "../service/data/data";
import helper from "../assets/img/helper.png";
import ReactTooltip from "react-tooltip";
import { HelperTexts } from "../service/data/constant";
import _ from "lodash";

const Chart = () => {
  const maxVal = _.maxBy(chartData, (o) => o.value).value,
    topVal = 65;

  const [rate, setRate] = useState(1);

  useLayoutEffect(() => {
    const updateSize = () => {
      const availHeight = window.innerHeight / 2 - 100;
      if (maxVal > 0) {
        setRate(availHeight / maxVal);
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [maxVal]);

  return (
    <div className="custom-chart">
      <div
        className="chart-element"
        style={{ width: `${100 / (chartData.length + 1)}%` }}
      >
        <div
          className="chart-bar"
          style={{ height: topVal * rate }}
          data-tip
          data-for="top-helper"
        />
        <p className="rotate-45" style={{ marginTop: "10px" }}>
          top
          <br />
          500
        </p>
      </div>
      <ReactTooltip
        className="custom-tooptip"
        arrowColor="transparent"
        id="top-helper"
        place="top"
        effect="solid"
      >
        {`Top: ${topVal}`}
      </ReactTooltip>
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
                <div data-tip data-for="chart-bar-helper">
                  <img src={helper} alt="helper" />
                </div>
              </div>
            </div>
          )}
          <div
            className="chart-bar"
            style={{ height: item.value * rate }}
            data-tip
            data-for={`chart-bar-${index}`}
          />
          <p className="rotate-45">
            {item.label}
            {index === chartData.length - 1 && (
              <span className="chart-helper rotate45">
                <span data-tip data-for="chart-helper">
                  <img src={helper} alt="helper" />
                </span>
              </span>
            )}
          </p>
          <ReactTooltip
            className="custom-tooptip"
            arrowColor="transparent"
            id={`chart-bar-${index}`}
            place="top"
            effect="solid"
          >
            {`${item.label}: ${item.value}`}
          </ReactTooltip>
        </div>
      ))}
      <div className="selo-leaderboard">
        <p>selo leaderboard</p>
      </div>
      <ReactTooltip
        className="custom-tooptip large-tip"
        arrowColor="transparent"
        id="chart-bar-helper"
        place="right"
        effect="solid"
      >
        {HelperTexts.ChartBar}
      </ReactTooltip>
      <ReactTooltip
        className="custom-tooptip large-tip"
        arrowColor="transparent"
        id="chart-helper"
        place="right"
        effect="solid"
      >
        {HelperTexts.ChartLabel}
      </ReactTooltip>
    </div>
  );
};

export default Chart;
