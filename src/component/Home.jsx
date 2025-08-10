import Swiper from './Swiper';
import './styles/home.css';

const Home = () => {
  return (
    <>
      <section className="slider-section">
        <Swiper />
      </section>
      <main className="home-container">
        <section className="grid-section">
          <h2 className="grid-title">
            <span className="span-domo-blue">도모</span>가 모아온 각 지역의
            특별한 하루!
          </h2>
          <div className="grid-container">
            {[...Array(8)].map((_, index) => (
              <div className="grid-item" key={index}>
                <div className="grid-item-image" />
                <div className="grid-item-info">
                  <h3>코스이름</h3>
                  <p>짧은 설명 짧은 설명 짧은 설명</p>
                  <div className="tags">
                    <span>지역 이름</span>
                    <span>놀거리 키워드 하나</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="load-more-button">
            도모와 함께 내 주변 놀거리 찾기 &gt;
          </button>
        </section>
      </main>
    </>
  );
};

export default Home;
