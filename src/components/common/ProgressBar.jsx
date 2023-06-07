import { useState, useEffect } from "react";
import styled from "styled-components";
import { palette } from "../../assets/colorsPalette";

const ProgressBar = ({ done }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const isNegative = done < 0;
      const newStyle = {
        opacity: 1,
        width: isNegative ? `${-1 * done}%` : `${done}%`,
        background: isNegative ? palette.incident : "#0dcaf0",
      };

      setStyle(newStyle);
    }, 200);

    return () => clearTimeout(timeoutId); // Cleanup the timeout on unmount
  }, [done]);

  return (
    <Progress>
      <ProgressDone style={style}>{done}%</ProgressDone>
    </Progress>
  );
};

const Progress = styled.div`
  background-color: #d8d8d8;
  border-radius: 20px;
  position: relative;
  margin: 15px 0;
  height: 30px;
  width: 300px;
`;

const ProgressDone = styled.div`
  box-shadow: 0 3px 3px -5px #f2709c, 0 2px 5px;
  border-radius: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 0;
  opacity: 0;
  transition: 1s ease 0.3s;
`;

export default ProgressBar;
