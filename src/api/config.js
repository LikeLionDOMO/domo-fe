import axios from 'axios';
//import { API_URL } from '../api/_common';

// API 기본 설정 - HTTPS 사용
const API_BASE_URL = 'https://domo.syu-likelion.org';

// axios 인스턴스 생성 (기본 Content-Type 헤더 제거해서 프리플라이트 회피)
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 혜택 데이터 가져오기 함수 (GET, query params)
export const fetchBenefits = async (params = {}) => {
  try {
    const { search = '', sort = 'benefit', page = 1 } = params;

    const response = await apiClient.get('/api/benefits', {
      params: { search, sort, page },
    });

    return response.data;
  } catch (error) {
    console.error('fetchBenefits error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.baseURL + error.config?.url,
      params: error.config?.params,
    });
    throw error;
  }
};

export default apiClient;
