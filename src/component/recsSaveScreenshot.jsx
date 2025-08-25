import React from "react";
import "./styles/recsSaveScreenshot.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faMugHot, faUtensils } from "@fortawesome/free-solid-svg-icons";

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
                <div className="item_img flexCenter">
                  {/* FIXME: 카테고리 별로 아이콘 정하게 하기 */}
                  {rec.category === "음식점" && <FontAwesomeIcon icon={faUtensils} />}
                  {rec.category === "놀거리" && <FontAwesomeIcon icon={faGamepad} />}
                  {rec.category === "카페" && <FontAwesomeIcon icon={faMugHot} />}
                </div>
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
