import axios from "axios";
import { API_URL } from "./_common";
import { locationFinder } from "./locationFinder";

export const recommend = async (data) => {
  const recsInfo = JSON.parse(localStorage.getItem("recsInfo")) || null;
  try {
    const response = await axios.post(
      `${API_URL}/api/recommend/again`,
      {
        address: recsInfo.address, // 사용자가 입력한 주소
        budgetStart: recsInfo.budgetStart, // 사용자가 입력한 예산 시작 값
        budgetEnd: recsInfo.budgetEnd, // 사용자가 입력한 예산 끝 값
        subject: recsInfo.subject, // 사용자가 선택한 키워드 배열
        code: data.placeId, // 반려당한 장소의 placeId
        exclude: data.exclude || [], // 현재 일정에 포함된 장소 ID 배열
        lat: data.lat, // 반려당한 장소의 이전장소 위도
        lng: data.lng, // 반려당한 장소의 이전장소 경도
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
    throw error; // 에러를 다시 던져서 호출하는 곳에서 처리할 수 있게 함
  }
};
