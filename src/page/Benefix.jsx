import { useCallback, useState } from "react";
import CustomSwiper from "../component/Swiper";
import Filter from "../component/Filter.jsx";
import Pagination from "../component/Pagination";
import "./styles/benefix.css";
import MainLayout from "../layout/MainLayout";
import { useMedia } from "../hook/useMedia";

// 임시 데이터 (2열 5행, 총 10개 이상)
const dummyData = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `혜택이름혜택이름혜택이름 ${i + 1}`,
  region: "지역 이름",
}));

const ITEMS_PER_PAGE = 10; // 2열 5행

const Benefix = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useMedia().isMobile;

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = dummyData.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(dummyData.length / ITEMS_PER_PAGE);

  // ////////////////////////////
  // FIXME: 검색창 인풋 값 입니다.
  // 확인후 주석 지우고 상단으로 위치 옮기셔도 무방합니다.
  // ////////////////////////////

  // 검색창 값
  const [displayValue, setDisplayValue] = useState("");

  // 모바일 검색창 토글 상태
  const [mobileSearchToggle, setMobileSearchToggle] = useState(false);

  // 필터링 데이터
  const [filterData, setFilterData] = useState("");

  // 자식(모바일, Pc) 컴포넌트에서 지역을 수정하는 함수
  const onChangeDisplayValue = useCallback(
    (value) => {
      setDisplayValue(value);
      if (!isMobile) return;
      // 모바일에서 검색창 닫기
      setMobileSearchToggle(false); // 모바일 검색창 닫기
    },
    [isMobile]
  );

  const onChangeFilter = (value) => {
    setFilterData(value);
    // 필터링 로직을 여기에 추가할 수 있습니다.
    // 예: setFilteredData(dummyData.filter(item => item.region.includes(value)));
  };

  // 모바일 헤더에서 검색창 열기
  const onChangeMobileToggle = () => {
    setMobileSearchToggle(true);
  };

  return (
    <MainLayout onChangeMobileToggle={onChangeMobileToggle}>
      {/* 모바일 주소검색 */}
      {mobileSearchToggle && isMobile && <div onChangeDisplayValue={onChangeDisplayValue}>모바일 검색창입니다 이는 컴포넌트로 수정</div>}
      <section className="slider-section">
        <CustomSwiper />
      </section>

      <div className="benefix-container">
        <h2 className="benefix-title">
          <span className="span-domo-blue">도모</span>가 도와주는 혜택 모아보기!
        </h2>

        <Filter onChangeDisplayValue={onChangeDisplayValue} display={displayValue} onChangeFilter={onChangeFilter} />

        <div className="benefits-grid">
          {currentPageData.map((item) => (
            <div key={item.id} className="benefit-card">
              <div className="card-image-placeholder"></div>
              <p className="card-title">{item.title}</p>
              <span className="card-region">{item.region}</span>
            </div>
          ))}
        </div>

        <Pagination pageCount={pageCount} onPageChange={handlePageClick} currentPage={currentPage} />
      </div>
    </MainLayout>
  );
};

export default Benefix;
