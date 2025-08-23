import { NavLink } from 'react-router-dom';
import './layout/styles/header.css';

const Header = () => {
  return (
    <>
      <header>
        <nav className="nav">
          <div className="logo">
            <p className="logo-text">DOMO</p>
            <p className="sub-logo">가장 완벽한 당신의 일정 도우미</p>
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
    </>
  );
};

export default Header;
