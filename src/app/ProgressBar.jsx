import React from "react";

function ProgressBar({ savedAmount, targetAmount }) {

  const progress = Math.min((Number(savedAmount) / Number(targetAmount)) * 100, 100);

  return (
    <div>
      <div
        style={{
          height: "10%",
          width: "100%",
          backgroundColor: "white",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width:`${progress}%`,
            height: "100%",

            backgroundColor: "#8fb449ff "
,
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
