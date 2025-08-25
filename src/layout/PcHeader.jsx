import { NavLink, useNavigate } from "react-router-dom";
import "../layout/styles/pcHeader.css";

const PcHeader = () => {
  const nav = useNavigate();
  return (
    <header className="pc-header">
      <nav className="nav">
        <div className="logo">
          <p onClick={() => nav("/")} style={{ cursor: "pointer" }}>
            DOMO
          </p>
        </div>
        <ul className="navList">
          <li>
            <NavLink to="/">홈</NavLink>
          </li>
          <li>
            <NavLink to="/recs">일정 짜기</NavLink>
          </li>
          <li>
            <NavLink to="/benefix">혜택 보기</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default PcHeader;
