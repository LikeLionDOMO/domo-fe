import { NavLink } from "react-router-dom";
import "./styles/mobileFooter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { TicketPercent } from "lucide-react";
const MobileFooter = () => {
  return (
    <footer className="mobile-footer flexBetween">
      <div className="flexCenter">
        <NavLink to="/">
          <FontAwesomeIcon icon={faHouse} />
          <p>홈</p>
        </NavLink>
      </div>
      <div className="flexCenter">
        <NavLink to="/recs">
          <FontAwesomeIcon icon={faLocationDot} />
          <p>일정</p>
        </NavLink>
      </div>
      <div className="flexCenter">
        <NavLink to="/benefix">
          <TicketPercent />
          <p>혜택</p>
        </NavLink>
      </div>
    </footer>
  );
};
export default MobileFooter;
