import axios from "axios";

import { locationFinder } from "./locationFinder";

export const recommend = async (data) => {
  const recsInfo = JSON.parse(localStorage.getItem("recsInfo")) || null;
  try {
    const response = await axios.post(
      `https://domo.syu-likelion.org/api/recommend/again`,
      {
        address: recsInfo.address, // 사용자가 입력한 주소
        budgetStart: Number(recsInfo.budgetStart), // 사용자가 입력한 예산 시작 값
        budgetEnd: Number(recsInfo.budgetEnd), // 사용자가 입력한 예산 끝 값
        subject: recsInfo.subject, // 사용자가 선택한 키워드 배열
        code: data.placeId, // 반려당한 장소의 placeId
        exclude: data.exclude || [], // 현재 일정에 포함된 장소 ID 배열
        userLat: data.userLat, // 백엔드에서 요구하는 userLat
        userLng: data.userLng, // 백엔드에서 요구하는 userLng
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const dataObj = response.data?.data || response.data;
    const placeId = Object.values(dataObj)[0];
    const resData = await locationFinder(placeId);
    return resData;
  } catch (error) {
    console.error("추천 요청 실패:", error);

    // 구체적인 에러 메시지 처리
    if (error.response?.status === 500) {
      console.error("서버 에러 - 추천 가능한 장소가 없거나 서버 문제");
      return null; // 또는 적절한 fallback
    }
    if (error.response?.status === 400) {
      console.error("잘못된 요청 파라미터:", error.response.data);
    }

    throw error; // 에러를 다시 던져서 호출하는 곳에서 처리할 수 있게 함
  }
};
