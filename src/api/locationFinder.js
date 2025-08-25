import axios from "axios";

/**
 * 매장 개별 조회
 * @param {*} code 매장 ID 코드입니다
 * @returns {Promise<object>} 매장 정보 객체
 */
export const locationFinder = async (code) => {
  try {
    const response = await axios.get(`https://domo.syu-likelion.org/api/place?code=${code}`);
    return {
      placeId: response.data.data.placeId,
      name: response.data.data.name,
      address: response.data.data.address,
      benefit: response.data.data.benefit,
      discountPercent: response.data.data.discountPercent,
      lat: response.data.data.lat,
      lng: response.data.data.lng,
      category: response.data.data.category,
    };
  } catch (error) {
    console.error("매장 조회 실패:", error);
    throw error; // 에러를 다시 던져서 호출하는 곳에서 처리할 수 있게 함
  }
};
