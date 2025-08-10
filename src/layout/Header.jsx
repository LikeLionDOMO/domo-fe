import { Link } from 'react-router-dom';
import '../layout/styles/header.css';

const Header = () => {
  return (
    <>
      <header>
        <nav className="nav">
          <div className="logo">
            <p>DOMO</p>
          </div>
          <ul className="navList">
            <li>
              <a href="/" className="active">
                홈
              </a>
            </li>
            <li>
              <a href="/" className="active">
                일정 짜기
              </a>
            </li>
            <li>
              <Link to="/benefix" className="active">
                혜택 보기
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
