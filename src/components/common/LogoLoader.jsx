import React from "react";

const DemocratometerLoading = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 100"
      width="200"
      height="100"
    >
      {/* Roof and Floor */}
      <rect x="0" y="90" width="200" height="10" fill="#5EA2C6" />
      <rect x="0" y="0" width="200" height="10" fill="#5EA2C6" />

      {/* Columns with animation */}
      {[
        { x: 20, height: 50 },
        { x: 50, height: 70 },
        { x: 80, height: 60 },
        { x: 110, height: 80 },
        { x: 140, height: 40 },
      ].map((col, i) => (
        <g key={i}>
          <rect
            x={col.x}
            y={90 - col.height}
            width="20"
            height={col.height}
            fill="#5EA2C6"
          >
            <animate
              attributeName="opacity"
              values="0;1;1"
              dur="1.2s"
              begin={`${i * 0.2}s`}
              fill="freeze"
            />
          </rect>
        </g>
      ))}
    </svg>
  );
};

export default DemocratometerLoading;
