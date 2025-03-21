import React, { useEffect, useState } from "react";
import "../styles/progressbar.css";

const ProgressBar = () => {
  const bars = ["5", "10", "30", "50", "85", "100"];
  return (
    <>
      <div>Progress Bar </div>
      {bars.map((value) => (
        <Progress key={value} progress={value} />
      ))}
    </>
  );
};

const Progress = ({ progress }) => {
  const [animatedData, setAnimated] = useState(0);
  useEffect(() => {
    setTimeout(() => setAnimated(progress), 100);
  }, [progress]);
  return (
    <>
      <div className="outer">
        <div
          className="inner"
          style={{ 
            // width: `${progress}%` 
            transform:`translateX(${animatedData-100}%)`}}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemax="100"
          aria-valuemin="0"
        >
          {progress}
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
