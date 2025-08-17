import React from "react";
import "./styles/resultPageScreenshot.css";

const RecsSaveScreenshot = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="screenshotContainer">
      <div className="screenshotHeader">
        <h2>도모와 함께한 오늘의 일정</h2>
      </div>
      <div className="screenshotContent">
        {/* 여기에 저장할 일정 내용을 넣으세요 */}
        <p>일정 내용이 여기에 표시됩니다.</p>
      </div>
    </div>
  );
});

RecsSaveScreenshot.displayName = "RecsSaveScreenshot";

export default RecsSaveScreenshot;
