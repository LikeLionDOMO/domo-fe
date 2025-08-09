import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles/swiper.css';

const CustomSwiper = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
    >
      <SwiperSlide className="slide-1">
        <div className="slide-content">
          <h2>순천시 동네 주민이라면 누구나<br />참여 가능한 할인 이벤트!</h2>
          <button>알아보기</button>
        </div>
      </SwiperSlide>
      <SwiperSlide className="slide-2">
        <div className="slide-content">
          <h2>새로운 이벤트<br />놓치지 마세요!</h2>
          <button>자세히 보기</button>
        </div>
      </SwiperSlide>
      <SwiperSlide className="slide-3">
        <div className="slide-content">
          <h2>도모와 함께<br />즐거운 시간!</h2>
          <button>시작하기</button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default CustomSwiper;
