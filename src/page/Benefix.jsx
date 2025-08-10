import { useState } from 'react';
import CustomSwiper from '../component/Swiper';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReactPaginate from 'react-paginate';
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

        <div className="filter-container">
          <Button variant="contained" className="region-search-btn">
            지역 찾기
          </Button>
          <Select defaultValue="gyeonggi" className="filter-select">
            <MenuItem value="gyeonggi">경기도</MenuItem>
            <MenuItem value="seoul">서울특별시</MenuItem>
          </Select>
          <Select defaultValue="seongnam" className="filter-select">
            <MenuItem value="seongnam">성남시</MenuItem>
            <MenuItem value="suwon">수원시</MenuItem>
          </Select>
          <TextField
            placeholder="검색어를 입력하세요"
            className="filter-search-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Select defaultValue="latest" className="filter-select sort-select">
            <MenuItem value="latest">최신순</MenuItem>
            <MenuItem value="popular">인기순</MenuItem>
          </Select>
          <Button variant="contained" color="primary" className="search-btn">
            검색
          </Button>
        </div>

        <div className="benefits-grid">
          {currentPageData.map((item) => (
            <div key={item.id} className="benefit-card">
              <div className="card-image-placeholder"></div>
              <p className="card-title">{item.title}</p>
              <span className="card-region">{item.region}</span>
            </div>
          ))}
        </div>

        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </>
  );
};

export default Benefix;
