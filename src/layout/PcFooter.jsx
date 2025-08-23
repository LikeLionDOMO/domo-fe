import "./styles/pcFooter.css";

const PcFooter = () => {
  return (
    <>
      {/* pc */}
      <footer className="footers-pc">
        <p>&copy;영규와 아이들, ALL RIGHTS RESERVED.</p>
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
