import axios from 'axios';

// API 기본 설정 - 개발 환경에서는 프록시 사용
const API_BASE_URL = 'https://domo.syu-likelion.org'; // 개발 환경에서는 프록시 사용

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 요청 인터셉터 - 디버깅용
apiClient.interceptors.request.use(
  (config) => {
    console.log('API 요청:', {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      params: config.params,
    });
    return config;
  },
  (error) => {
    console.error('요청 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 디버깅용
apiClient.interceptors.response.use(
  (response) => {
    console.log('API 응답 성공:', response.data);
    return response;
  },
  (error) => {
    console.error('API 응답 에러:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

// 혜택 데이터 가져오기 함수 - API 명세서에 따른 GET 방식
export const fetchBenefits = async (params = {}) => {
  try {
    const { search = '', sort = 'benefit', page = 1 } = params;

    console.log('fetchBenefits 호출:', { search, sort, page });

    // API 명세서에 따른 GET 요청
    // GET {BASE}/api/benefits?search=시%20군&sort=benefit&page=1
    const response = await apiClient.get('/api/benefits', {
      params: {
        search, // "시 군" 형태 (예: "서울 강남")
        sort, // "benefit" | "popular"
        page, // 1부터 시작
      },
    });

    console.log('API 응답 데이터:', response.data);
    return response.data;
  } catch (error) {
    console.error('혜택 데이터 가져오기 실패:', error);

    // 에러 상세 정보 출력
    if (error.response) {
      // 서버가 응답했지만 에러 상태 코드
      console.error('서버 응답 에러:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없음
      console.error('응답 없음:', error.request);
    } else {
      // 요청 설정 중 에러 발생
      console.error('요청 설정 에러:', error.message);
    }

    // 개발 중 임시 데이터 반환 (CORS 문제 해결 전까지)
    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
      console.log('CORS 오류로 인해 임시 데이터를 반환합니다.');
      return {
        data: {
          items: [
            {
              placeId: 'temp-1',
              name: '임시 혜택 1 (CORS 오류로 인한 대체 데이터)',
              discountPercent: 20,
              popularity: 15,
              address: '서울시 강남구',
              lat: 37.5665,
              lng: 126.978,
            },
            {
              placeId: 'temp-2',
              name: '임시 혜택 2 (백엔드 연동 필요)',
              discountPercent: 15,
              popularity: 10,
              address: '서울시 서초구',
              lat: 37.4837,
              lng: 127.0324,
            },
            {
              placeId: 'temp-3',
              name: '임시 혜택 3 (개발용 더미 데이터)',
              discountPercent: 25,
              popularity: 20,
              address: '서울시 마포구',
              lat: 37.5663,
              lng: 126.9779,
            },
            {
              placeId: 'temp-4',
              name: '임시 혜택 4',
              discountPercent: 10,
              popularity: 12,
              address: '서울시 송파구',
              lat: 37.5146,
              lng: 127.1059,
            },
            {
              placeId: 'temp-5',
              name: '임시 혜택 5',
              discountPercent: 12,
              popularity: 9,
              address: '서울시 용산구',
              lat: 37.5326,
              lng: 126.9905,
            },
            {
              placeId: 'temp-6',
              name: '임시 혜택 6',
              discountPercent: 18,
              popularity: 14,
              address: '서울시 광진구',
              lat: 37.5386,
              lng: 127.0827,
            },
            {
              placeId: 'temp-7',
              name: '임시 혜택 7',
              discountPercent: 8,
              popularity: 11,
              address: '서울시 동대문구',
              lat: 37.5744,
              lng: 127.0407,
            },
            {
              placeId: 'temp-8',
              name: '임시 혜택 8',
              discountPercent: 22,
              popularity: 16,
              address: '서울시 성동구',
              lat: 37.5636,
              lng: 127.0365,
            },
            {
              placeId: 'temp-9',
              name: '임시 혜택 9',
              discountPercent: 5,
              popularity: 8,
              address: '서울시 중구',
              lat: 37.5633,
              lng: 126.9978,
            },
            {
              placeId: 'temp-10',
              name: '임시 혜택 10',
              discountPercent: 30,
              popularity: 22,
              address: '서울시 종로구',
              lat: 37.5728,
              lng: 126.9794,
            },
            {
              placeId: 'temp-11',
              name: '임시 혜택 11',
              discountPercent: 7,
              popularity: 7,
              address: '서울시 은평구',
              lat: 37.6176,
              lng: 126.9227,
            },
            {
              placeId: 'temp-12',
              name: '임시 혜택 12',
              discountPercent: 17,
              popularity: 18,
              address: '서울시 양천구',
              lat: 37.5206,
              lng: 126.8656,
            },
            {
              placeId: 'temp-13',
              name: '임시 혜택 13',
              discountPercent: 13,
              popularity: 13,
              address: '서울시 구로구',
              lat: 37.4954,
              lng: 126.8874,
            },
            {
              placeId: 'temp-14',
              name: '임시 혜택 14',
              discountPercent: 9,
              popularity: 6,
              address: '서울시 금천구',
              lat: 37.4569,
              lng: 126.8958,
            },
            {
              placeId: 'temp-15',
              name: '임시 혜택 15',
              discountPercent: 11,
              popularity: 10,
              address: '서울시 영등포구',
              lat: 37.5264,
              lng: 126.8963,
            },
            {
              placeId: 'temp-16',
              name: '임시 혜택 16',
              discountPercent: 14,
              popularity: 12,
              address: '서울시 마포구',
              lat: 37.5638,
              lng: 126.9084,
            },
            {
              placeId: 'temp-17',
              name: '임시 혜택 17',
              discountPercent: 16,
              popularity: 19,
              address: '서울시 성북구',
              lat: 37.5894,
              lng: 127.0167,
            },
            {
              placeId: 'temp-18',
              name: '임시 혜택 18',
              discountPercent: 21,
              popularity: 21,
              address: '서울시 노원구',
              lat: 37.6543,
              lng: 127.0568,
            },
            {
              placeId: 'temp-19',
              name: '임시 혜택 19',
              discountPercent: 19,
              popularity: 17,
              address: '서울시 강북구',
              lat: 37.6396,
              lng: 127.0257,
            },
            {
              placeId: 'temp-20',
              name: '임시 혜택 20',
              discountPercent: 6,
              popularity: 9,
              address: '서울시 도봉구',
              lat: 37.6688,
              lng: 127.0471,
            },
            {
              placeId: 'temp-21',
              name: '임시 혜택 21',
              discountPercent: 24,
              popularity: 23,
              address: '서울시 강서구',
              lat: 37.5509,
              lng: 126.8495,
            },
            {
              placeId: 'temp-22',
              name: '임시 혜택 22',
              discountPercent: 28,
              popularity: 24,
              address: '서울시 관악구',
              lat: 37.4784,
              lng: 126.9516,
            },
            {
              placeId: 'temp-23',
              name: '임시 혜택 23',
              discountPercent: 26,
              popularity: 22,
              address: '서울시 동작구',
              lat: 37.5124,
              lng: 126.9392,
            },
          ],
          page: 1,
          pageSize: 20,
          totalPages: 1,
        },
      };
    }

    throw error;
  }
};

export default apiClient;
