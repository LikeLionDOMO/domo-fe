import { useState, useRef, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './styles/filter.css';

const regions = [
  {
    name: '서울특별시',
    subregions: [
      '강남구',
      '강동구',
      '강북구',
      '강서구',
      '관악구',
      '광진구',
      '구로구',
      '금천구',
      '노원구',
      '도봉구',
      '동대문구',
      '동작구',
      '마포구',
      '서대문구',
      '서초구',
      '성동구',
      '성북구',
      '송파구',
      '양천구',
      '영등포구',
      '용산구',
      '은평구',
      '종로구',
      '중구',
      '중랑구',
    ],
  },
  {
    name: '경기도',
    subregions: [
      '수원시',
      '성남시',
      '고양시',
      '용인시',
      '부천시',
      '안산시',
      '안양시',
      '남양주시',
      '화성시',
      '평택시',
      '의정부시',
      '시흥시',
      '파주시',
      '김포시',
      '광명시',
      '광주시',
      '군포시',
      '오산시',
      '이천시',
      '안성시',
      '하남시',
      '의왕시',
      '여주시',
      '양평군',
      '과천시',
      '가평군',
      '연천군',
    ],
  },
  {
    name: '강원도',
    subregions: [
      '춘천시',
      '원주시',
      '강릉시',
      '동해시',
      '태백시',
      '속초시',
      '삼척시',
      '홍천군',
      '횡성군',
      '영월군',
      '평창군',
      '정선군',
      '철원군',
      '화천군',
      '양구군',
      '인제군',
      '고성군',
      '양양군',
    ],
  },
  {
    name: '부산광역시',
    subregions: [
      '중구',
      '서구',
      '동구',
      '영도구',
      '부산진구',
      '동래구',
      '남구',
      '북구',
      '해운대구',
      '사하구',
      '금정구',
      '강서구',
      '연제구',
      '수영구',
      '사상구',
      '기장군',
    ],
  },
];

const Filter = () => {
  const [regionOpen, setRegionOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [displayValue, setDisplayValue] = useState('');
  const dropdownRef = useRef(null);

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
  };

  const handleRegionSelect = (region) => {
    setDisplayValue(`${selectedProvince.name} ${region}`);
    setRegionOpen(false);
    setSelectedProvince(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setRegionOpen(false);
        setSelectedProvince(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="filter-container">
      <div className="filter-left">
        <Button variant="text" className="region-search-btn">
          지역 찾기
        </Button>
        <div className="region-filter" ref={dropdownRef}>
          <TextField
            placeholder="지역명을 검색하세요"
            className="filter-search-input"
            value={displayValue}
            onClick={() => setRegionOpen(true)}
            onChange={(e) => setDisplayValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {regionOpen && (
            <div className="region-dropdown">
              {selectedProvince ? (
                <>
                  <div className="dropdown-header">
                    <button onClick={() => setSelectedProvince(null)}>←</button>
                    <span>{selectedProvince.name}</span>
                  </div>
                  <ul>
                    {selectedProvince.subregions.map((region) => (
                      <li
                        key={region}
                        onClick={() => handleRegionSelect(region)}
                      >
                        {region}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <ul>
                  {regions.map((province) => (
                    <li
                      key={province.name}
                      onClick={() => handleProvinceSelect(province)}
                    >
                      {province.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <Select
          defaultValue="latest"
          className="filter-select sort-select"
          IconComponent={KeyboardArrowUpIcon}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: '10px',
                marginTop: '5px',
              },
            },
          }}
        >
          <MenuItem value="latest">최신순</MenuItem>
          <MenuItem value="benefix">할인순</MenuItem>
          <MenuItem value="popular">인기순</MenuItem>
        </Select>
      </div>
      <Button variant="contained" className="search-btn">
        검색
      </Button>
    </div>
  );
};

export default Filter;
