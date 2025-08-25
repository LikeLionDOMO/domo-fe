import './styles/pcFooter.css';

const PcFooter = () => {
  return (
    <>
      {/* pc */}
      <footer className="footers-pc">
        <p>&copy;영규와 아이들, ALL RIGHTS RESERVED.</p>
        <h1>김성수 신가연 왕종휘 윤혜원 이영규 정혜빈</h1>
      </footer>
      {/* mobile */}
      <footer className="footers-mob">
        <div>
          <p>홈</p>
        </div>
        <div>
          <p>일정</p>
        </div>
        <div>
          <p>혜택</p>
        </div>
      </footer>
    </>
  );
};

export default PcFooter;
