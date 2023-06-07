import React, { useRef, useEffect } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import InfoIcon from "../../assets/svg-icons/InfoIcon";

const TooltipInfo = (props) => {
  const { info } = props;
  const tooltipRef = useRef();

  useEffect(() => {
    tippy(tooltipRef.current, {
      content: info,
    });
  }, [info]);

  return (
    <div ref={tooltipRef}>
      <InfoIcon />
    </div>
  );
};

export default TooltipInfo;
