import React, { useEffect, useRef } from "react";
import { animate } from "framer-motion";

const AutoCounter = ({ from, to, className, duration }) => {
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

  return <p ref={nodeRef} className={className} />;
};

export default AutoCounter;
