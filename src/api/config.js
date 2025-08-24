import axios from 'axios';

// API 기본 설정 - HTTP로 시도
const API_BASE_URL = 'http://domo.syu-likelion.org';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 혜택 데이터 가져오기 함수
export const fetchBenefits = async (params = {}) => {
  try {
    const { search = '', sort = 'benefit', page = 1 } = params;

    const response = await apiClient.get('/api/benefits', {
      params: {
        search,
        sort,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error('혜택 데이터 가져오기 실패:', error);

    // CORS 오류 시 임시 데이터 반환 (개발용)
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
