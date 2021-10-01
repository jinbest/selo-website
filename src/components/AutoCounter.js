import React, { useEffect, useRef } from "react";
import { animate } from "framer-motion";
import ss from "../assets/img/ss.png";
import helper from "../assets/img/helper.png";
import ReactTooltip from "react-tooltip";
import { HelperTexts } from "../service/data/constant";

const AutoCounter = ({
  from,
  to,
  className,
  duration,
  showSelo,
  showHelperId,
}) => {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: duration,
      onUpdate(value) {
        node.textContent = value.toFixed(0);
      },
    });

    return () => controls.stop();
  }, [from, to, duration]);

  return (
    <div className="auto-counter">
      <p ref={nodeRef} className={className} />
      {showSelo && (
        <span className="badge">
          <img src={ss} alt="ss" />
          {showHelperId && (
            <span className="liner-helper">
              <span data-tip data-for={showHelperId}>
                <img src={helper} alt={showHelperId} />
              </span>
            </span>
          )}
        </span>
      )}
      <ReactTooltip
        className="custom-tooptip large-tip"
        arrowColor="transparent"
        id={showHelperId}
        place="right"
        effect="solid"
      >
        {HelperTexts.SeloScore}
      </ReactTooltip>
    </div>
  );
};

export default AutoCounter;
