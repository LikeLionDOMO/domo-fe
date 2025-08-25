import { useCallback, useState, lazy, Suspense, useEffect } from 'react';
import CustomSwiper from '../component/Swiper';
const Filter = lazy(() => import('../component/Filter'));
import Pagination from '../component/Pagination';
import './styles/benefix.css';
import MainLayout from '../layout/MainLayout';
import { useMedia } from '../hook/useMedia';
import MobileSearchModal from '../component/MobileSearchModal';
import { fetchBenefits } from '../api/config';
import MobileSort from '../component/MobileSort';

const ITEMS_PER_PAGE = 20; // API 페이지 사이즈에 맞춤

const Benefix = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useMedia().isMobile;

  // API 데이터 상태
  const [benefitsData, setBenefitsData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 모바일 더보기 상태
  const [mobileDisplayCount, setMobileDisplayCount] = useState(5);
  const [mobileApiPage, setMobileApiPage] = useState(1);

  // 검색 및 필터 상태
  const [displayValue, setDisplayValue] = useState('');
  const [sortType, setSortType] = useState('benefix');
  const [mobileSearchToggle, setMobileSearchToggle] = useState(false);

  // 혜택 데이터 가져오기 함수 (append 가능)
  const loadBenefits = useCallback(
    async (search = '', sort = 'benefit', page = 1, append = false) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchBenefits({ search, sort, page });

        if (response.data) {
          const newItems = response.data.items || [];
          setBenefitsData((prev) =>
            append ? [...prev, ...newItems] : newItems
          );
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
    loadBenefits('', sortType, 1, false);
    setMobileApiPage(1);
  }, [loadBenefits, sortType]);

  // 검색어 변경 시 데이터 재로드
  useEffect(() => {
    if (displayValue) {
      loadBenefits(displayValue, sortType, 1, false);
    } else {
      loadBenefits('', sortType, 1, false);
    }
    setMobileApiPage(1);
    setMobileDisplayCount(5);
  }, [displayValue, sortType, loadBenefits]);

  const handlePageClick = (event) => {
    const page = event.selected + 1; // 컴포넌트는 0부터, API는 1부터
    loadBenefits(displayValue, sortType, page, false);
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
    loadBenefits(displayValue, value, 1, false);
    setMobileApiPage(1);
    setMobileDisplayCount(5);
  };

  const onChangeMobileToggle = () => {
    setMobileSearchToggle(true);
  };

  // 모바일 더보기: 부족하면 다음 페이지를 불러와 누적
  const handleMobileLoadMore = async () => {
    // 현재 보이는 개수를 5 늘리는 시도
    const target = mobileDisplayCount + 5;

    // 현재 보유 데이터로 충분하면 카운트만 증가
    if (target <= benefitsData.length) {
      setMobileDisplayCount(target);
      return;
    }

    // 더 불러올 페이지가 있으면 다음 페이지 로드 후 증가
    if (mobileApiPage < totalPages && !isLoading) {
      const nextPage = mobileApiPage + 1;
      await loadBenefits(displayValue, sortType, nextPage, true);
      setMobileApiPage(nextPage);
      setMobileDisplayCount((prev) => prev + 5);
      return;
    }

    // 더 불러올 데이터가 없으면 보유 데이터 범위까지만 확장
    setMobileDisplayCount(Math.min(target, benefitsData.length));
  };

  // API 데이터를 UI에 맞게 변환
  const transformedData = benefitsData.map((item, index) => ({
    id: item.placeId || index,
    title: item.name || '혜택 이름',
    region: displayValue || '지역 이름',
    kind: `${item.discountPercent || 0}% 할인`,
    discountPercent: item.discountPercent || 0,
    popularity: item.popularity || 0,
    address: item.address || '주소 정보 없음',
    lat: item.lat || 0,
    lng: item.lng || 0,
  }));

  // 표시 데이터: 모바일은 슬라이스, PC는 전체
  const displayData = isMobile
    ? transformedData.slice(0, mobileDisplayCount)
    : transformedData;

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
        <div className="benefix-title-row">
          <h2 className="benefix-title">
            <span className="span-domo-blue">도모</span>가 도와주는 혜택
            모아보기!
          </h2>
          {isMobile && (
            <MobileSort value={sortType} onChange={onChangeFilter} />
          )}
        </div>

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
          {displayData.map((item) => (
            <a
              key={item.id}
              href={`https://map.naver.com/p/search/${encodeURIComponent(
                `${item.address || ''} ${item.title || ''}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div className="benefit-card">
                <div className="card-tags">
                  <span className="tag-blue">{item.region}</span>
                  <span className="tag-yellow">
                    {item.kind === '할인'
                      ? `${item.discountPercent}% 할인`
                      : item.kind}
                  </span>
                </div>
                <p className="card-title">{item.title}</p>
              </div>
            </a>
          ))}
        </div>

        {/* 데이터가 없을 때 메시지 */}
        {!isLoading && displayData.length === 0 && !error && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            검색 결과가 없습니다.
          </div>
        )}

        {/* 페이지네이션 - PC에서 항상 표시 */}
        {!isMobile && (
          <Pagination
            pageCount={Math.max(totalPages || 1, 1)}
            onPageChange={handlePageClick}
            currentPage={currentPage}
          />
        )}

        {/* 모바일 더보기 버튼 - 항상 표시 */}
        {isMobile && (
          <div>
            <button
              className="m-more-button"
              onClick={handleMobileLoadMore}
              disabled={isLoading}
            >
              더보기
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Benefix;
