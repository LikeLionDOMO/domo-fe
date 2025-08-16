import { useState } from 'react';
import CustomSwiper from '../component/Swiper';
import Filter from '../component/Filter';
import Pagination from '../component/Pagination';
import './styles/benefix.css';

// 임시 데이터 (2열 5행, 총 10개 이상)
const dummyData = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `혜택이름혜택이름혜택이름 ${i + 1}`,
  region: '지역 이름',
}));

const ITEMS_PER_PAGE = 10; // 2열 5행

const Benefix = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = dummyData.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(dummyData.length / ITEMS_PER_PAGE);

  return (
    <>
      <section className="slider-section">
        <CustomSwiper />
      </section>

      <div className="benefix-container">
        <h2 className="benefix-title">
          <span className="span-domo-blue">도모</span>가 도와주는 혜택 모아보기!
        </h2>

        <Filter />

        <div className="benefits-grid">
          {currentPageData.map((item) => (
            <div key={item.id} className="benefit-card">
              <div className="card-image-placeholder"></div>
              <p className="card-title">{item.title}</p>
              <span className="card-region">{item.region}</span>
            </div>
          ))}
        </div>

        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageClick}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Benefix;
