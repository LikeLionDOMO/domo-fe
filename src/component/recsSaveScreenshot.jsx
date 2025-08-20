import React from "react";
import "./styles/recsSaveScreenshot.css";

const RecsSaveScreenshot = React.forwardRef(({ recommendations }, ref) => {
  return (
    <div ref={ref} className="screenshotContainer">
      <div className="list_header">
        <p className="list_header_title">
          오늘의 <span>놀거리</span>를
          <br />
          모아왔어요!
        </p>
      </div>
      <ul className="list_items">
        {recommendations.map((rec, index) => (
          <li key={rec.id} className="list_item">
            <div className="item_number">{index + 1}</div>
            <div className="item_card">
              <div className="item_content">
                <div className="item_img"></div>
                <div className="item_info">
                  <p className="item_name">{rec.name}</p>
                  <p className="item_address">{rec.address}</p>
                  <span className="item_benefit">{rec.benefit}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

RecsSaveScreenshot.displayName = "RecsSaveScreenshot";

export default RecsSaveScreenshot;
