import axios from "axios";
import { API_URL } from "./_common";

/**
 * 매장 개별 조회
 * @param {*} code 매장 ID 코드입니다
 * @returns {Promise<object>} 매장 정보 객체
 */
export const locationFinder = async (code) => {
  try {
    const response = await axios.get(`${API_URL}/api/place?code=${code}`);
    return {
      placeId: response.data.placeId,
      name: response.data.name,
      address: response.data.address,
      benefit: response.data.benefit,
      discountPercent: response.data.discountPercent,
      lat: response.data.lat,
      lng: response.data.lng,
      category: response.data.category,
    };
  } catch (error) {
    console.error("매장 조회 실패:", error);
    throw error; // 에러를 다시 던져서 호출하는 곳에서 처리할 수 있게 함
  }
};
