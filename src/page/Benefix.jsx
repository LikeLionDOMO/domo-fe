import { useCallback, useState, lazy, Suspense, useEffect } from 'react';
import CustomSwiper from '../component/Swiper';
const Filter = lazy(() => import('../component/Filter'));
import Pagination from '../component/Pagination';
import './styles/benefix.css';
import MainLayout from '../layout/MainLayout';
import { useMedia } from '../hook/useMedia';
import MobileSearchModal from '../component/MobileSearchModal';
import { fetchBenefits } from '../api/config';

const ITEMS_PER_PAGE = 20; // API 페이지 사이즈에 맞춤

const Benefix = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useMedia().isMobile;

  // API 데이터 상태
  const [benefitsData, setBenefitsData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 검색 및 필터 상태
  const [displayValue, setDisplayValue] = useState('');
  const [sortType, setSortType] = useState('benefit');
  const [mobileSearchToggle, setMobileSearchToggle] = useState(false);

  // 혜택 데이터 가져오기 함수
  const loadBenefits = useCallback(
    async (search = '', sort = 'benefit', page = 1) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchBenefits({ search, sort, page });

        if (response.data) {
          setBenefitsData(response.data.items || []);
          setTotalPages(response.data.totalPages || 0);
          setCurrentPage(page - 1); // API는 1부터, 컴포넌트는 0부터
        }
      } catch (err) {
        setError('데이터를 가져오는데 실패했습니다.');
        console.error('혜택 데이터 로드 실패:', err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    loadBenefits('', sortType, 1);
  }, [loadBenefits, sortType]);

  // 검색어 변경 시 데이터 재로드
  useEffect(() => {
    if (displayValue) {
      loadBenefits(displayValue, sortType, 1);
    } else {
      loadBenefits('', sortType, 1);
    }
  }, [displayValue, sortType, loadBenefits]);

  const handlePageClick = (event) => {
    const page = event.selected + 1; // 컴포넌트는 0부터, API는 1부터
    loadBenefits(displayValue, sortType, page);
  };

  const onChangeDisplayValue = useCallback(
    (value) => {
      setDisplayValue(value);
      if (!isMobile) return;
      setMobileSearchToggle(false);
    },
    [isMobile]
  );

  const onChangeFilter = (value) => {
    setSortType(value);
    // 정렬 변경 시 첫 페이지부터 다시 로드
    loadBenefits(displayValue, value, 1);
  };

  const onChangeMobileToggle = () => {
    setMobileSearchToggle(true);
  };

  // API 데이터를 UI에 맞게 변환
  const transformedData = benefitsData.map((item, index) => {
    // 혜택 종류 분류 로직
    let benefitType = '쿠폰';
    let benefitDetail = '';

    if (item.discountPercent && item.discountPercent > 0) {
      benefitType = '할인';
      benefitDetail = `${item.discountPercent}%`;
    } else if (item.benefit && item.benefit.includes('지원금')) {
      benefitType = '지원금';
      benefitDetail = item.benefit;
    } else if (item.benefit && item.benefit.includes('쿠폰')) {
      benefitType = '쿠폰';
      benefitDetail = item.benefit;
    } else {
      // 기본값: 쿠폰
      benefitDetail = item.benefit || '혜택 제공';
    }

    return {
      id: item.placeId || index,
      title: item.name || '혜택 이름',
      region: displayValue || '지역 이름',
      kind: benefitType,
      benefitDetail: benefitDetail,
      discountPercent: item.discountPercent || 0,
      popularity: item.popularity || 0,
      address: item.address || '주소 정보 없음',
      lat: item.lat || 0,
      lng: item.lng || 0,
    };
  });

  return (
    <MainLayout onChangeMobileToggle={onChangeMobileToggle}>
      {/* 모바일 주소검색 */}
      {mobileSearchToggle && isMobile && (
        <MobileSearchModal
          isOpen={mobileSearchToggle}
          onClose={() => setMobileSearchToggle(false)}
          onChangeDisplayValue={onChangeDisplayValue}
          displayValue={displayValue}
        />
      )}
      <section className="slider-section">
        <CustomSwiper />
      </section>

      <div className="benefix-container">
        <h2 className="benefix-title">
          <span className="span-domo-blue">도모</span>가 도와주는 혜택 모아보기!
        </h2>

        <Suspense fallback={<div>필터 로딩중...</div>}>
          <Filter
            onChangeDisplayValue={onChangeDisplayValue}
            display={displayValue}
            onChangeFilter={onChangeFilter}
            onChangeMobileToggle={setMobileSearchToggle}
          />
        </Suspense>

        {/* 에러 메시지 */}
        {error && (
          <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
            {error}
          </div>
        )}

        {/* 혜택 목록 */}
        <div className="benefits-list">
          {transformedData.map((item) => (
            <div key={item.id} className="benefit-card">
              <div className="card-tags">
                <span className="tag-blue">{item.region}</span>
                <span className="tag-yellow">
                  {item.kind === '할인'
                    ? `${item.benefitDetail} 할인`
                    : item.kind}
                </span>
              </div>
              <p className="card-title">{item.title}</p>
              {item.benefitDetail && item.kind !== '할인' && (
                <p className="card-detail">{item.benefitDetail}</p>
              )}
            </div>
          ))}
        </div>

        {/* 데이터가 없을 때 메시지 */}
        {!isLoading && transformedData.length === 0 && !error && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            검색 결과가 없습니다.
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            onPageChange={handlePageClick}
            currentPage={currentPage}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Benefix;
