import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMedia } from '../hook/useMedia';
import { useState, useEffect } from 'react';

import 'swiper/css';
import './styles/home.css';
import MainLayout from '../layout/MainLayout';
import CustomSwiper from '../component/Swiper';
import homeData from '../data/home.json';

const Home = () => {
  const { isMobile } = useMedia();
  const [randomCourses, setRandomCourses] = useState([]);
  const navigate = useNavigate();

  // 12개 중 랜덤하게 8개 선택하는 함수
  const selectRandomCourses = () => {
    const shuffled = [...homeData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8);
  };

  // 컴포넌트 마운트 시 랜덤 코스 선택
  useEffect(() => {
    setRandomCourses(selectRandomCourses());
  }, []);

  // 이미지 클릭 시 RecsResult 페이지로 이동하는 함수
  const handleImageClick = (course) => {
    navigate('/recs/result', { state: { recommendations: course.data } });
  };

  return (
    <MainLayout>
      <section className="slider-section">
        <CustomSwiper />
      </section>

      <main className="home-container">
        <section className="grid-section">
          <h2 className="grid-title">
            <span className="span-domo-blue">도모</span>가 모아온 각 지역의
            특별한 하루!
          </h2>

          {isMobile ? (
            <Swiper
              className="grid-swiper"
              spaceBetween={16}
              slidesPerView={2.5}
              slidesOffsetAfter={20}
              slidesOffsetBefore={20}
            >
              {/* 모바일 스와이퍼 - 랜덤 데이터 사용 */}
              {randomCourses.map((course, index) => (
                <SwiperSlide
                  key={course.course_name}
                  className="grid-swiper-slide"
                >
                  <div className="grid-item">
                    <div
                      className="grid-item-image"
                      style={{
                        backgroundImage: `url(${course.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      onClick={() => handleImageClick(course)}
                    />
                    <div className="grid-item-info">
                      <h4>{course.course_name}</h4>
                      <p>{course.short_description}</p>
                      <div className="tags">
                        <span className="tag-blue">{course.region_name}</span>
                        <span className="tag-yellow">
                          {course.activity_keyword}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid-container">
              {/* PC 그리드 - 랜덤 데이터 사용 */}
              {randomCourses.map((course, index) => (
                <div className="grid-item" key={course.course_name}>
                  <div
                    className="grid-item-image"
                    style={{
                      backgroundImage: `url(${course.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    onClick={() => handleImageClick(course)}
                  />
                  <div className="grid-item-info">
                    <h4>{course.course_name}</h4>
                    <p>{course.short_description}</p>
                    <div className="tags">
                      <span className="tag-blue">{course.region_name}</span>
                      <span className="tag-yellow">
                        {course.activity_keyword}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link to="/recs">
            <button className="load-more-button">
              도모와 함께 내 주변 놀거리 찾기 &gt;
            </button>
          </Link>

          {/* footer 위쪽에 공간 만들기 */}
          {isMobile && <div style={{ height: '48px' }} />}
        </section>
      </main>
    </MainLayout>
  );
};

export default Home;
