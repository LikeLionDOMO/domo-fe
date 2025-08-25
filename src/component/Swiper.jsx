import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles/swiper.css";

const CustomSwiper = () => {
  const nav = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <main className="slide-main">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}>
          <SwiperSlide
            onClick={() => nav("https://www.visitbusan.net/schedule/view.do?boardId=BBS_0000009&menuCd=DOM_000000204012000000&dataSid=4534")}
            className="slide-1"></SwiperSlide>
          <SwiperSlide onClick={() => nav("https://korean.visitseoul.net/events/DDPArchitectureTour/KOP18eliy")} className="slide-2"></SwiperSlide>
          <SwiperSlide
            onClick={() => nav("https://www.chuncheon.go.kr/happiness/festival-news/?bbsId=BBSMSTR_000000000295&nttId=463932&flag=view")}
            className="slide-3"></SwiperSlide>
        </Swiper>
      </main>
    </>
  );
};

export default CustomSwiper;
