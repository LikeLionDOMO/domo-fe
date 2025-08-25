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
