import { useLocation, useNavigate } from "react-router-dom";
import "./styles/mobileHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const MobileHeader = ({ onChangeHandler }) => {
  const location = useLocation().pathname;
  const nav = useNavigate();

  return (
    <header className="mobile-header">
      <div className="header_logo">
        <button onClick={() => nav("/")} className="home-button">
          <span className="logo-text">DOMO</span>
        </button>
      </div>
      <div className="header-content">
        {location === "/" && <p>가장 완벽한 당신의 일정 도우미</p>}
        {location === "/benefix" && (
          <div className="benefix-input">
            <input onChange={onChangeHandler} placeholder="지역명을 입력하세요" />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
          </div>
        )}
      </div>
    </header>
  );
};
export default MobileHeader;
