import { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './styles/mobileSearchModal.css';
import { regions } from './Filter';
import { ChevronRight } from 'lucide-react';

const MobileSearchModal = ({
  isOpen,
  onClose,
  onChangeDisplayValue,
  displayValue,
}) => {
  const [searchValue, setSearchValue] = useState(displayValue || '');
  const [filteredRegions, setFilteredRegions] = useState([]);

  // 검색창이 열릴 때마다 displayValue로 초기화
  useEffect(() => {
    if (isOpen) {
      setSearchValue(displayValue || '');
      // 모든 지역 데이터를 평면화하여 초기 목록 생성
      const allRegions = regions.flatMap((province) =>
        province.subregions.map((region) => `${province.name} ${region}`)
      );
      setFilteredRegions(allRegions);
    }
  }, [isOpen, displayValue]);

  // 검색어에 따른 지역 필터링
  useEffect(() => {
    if (searchValue.trim() === '') {
      // 검색어가 없으면 모든 지역 표시
      const allRegions = regions.flatMap((province) =>
        province.subregions.map((region) => `${province.name} ${region}`)
      );
      setFilteredRegions(allRegions);
    } else {
      // 검색어가 있으면 필터링
      const filtered = regions.flatMap((province) =>
        province.subregions
          .filter(
            (region) =>
              province.name.includes(searchValue) ||
              region.includes(searchValue)
          )
          .map((region) => `${province.name} ${region}`)
      );
      setFilteredRegions(filtered);
    }
  }, [searchValue]);

  // 검색 실행 함수
  const handleSearch = () => {
    onChangeDisplayValue(searchValue);
    onClose();
  };

  // Enter 키로 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      {/* 배경 오버레이 - 검색창 외부 클릭 시 닫기 */}
      {isOpen && <div className="mobile-search-overlay" onClick={onClose} />}

      {/* 모바일 검색창 - 아래에서 슬라이딩 */}
      <div className={`mobile-search-modal ${isOpen ? 'open' : ''}`}>
        {/* 검색 입력 필드 */}
        <div className="search-input-container">
          <TextField
            placeholder="지역명을 검색하세요"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className="search-icon" onClick={handleSearch} />
                </InputAdornment>
              ),
            }}
          />
        </div>

        {/* 검색 결과 정보 */}
        <div className="search-info">
          <span>
            검색 결과{' '}
            <strong className="result-count">{filteredRegions.length}</strong>건
          </span>
        </div>

        {/* 지역 목록 - regions 데이터 사용 */}
        <div className="region-list">
          {filteredRegions.map((region, index) => (
            <div
              key={index}
              className="region-item"
              onClick={() => {
                onChangeDisplayValue(region);
                onClose();
              }}
            >
              <span className="region-name">{region}</span>
              <span className="arrow-icon">
                <ChevronRight />
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileSearchModal;
