import axios from "axios";
import { API_URL } from "./_common";
import { locationFinder } from "./locationFinder";

/**
 * /api/plan/full-ids
 * @param {object} data { userLat, userLng, budgetStart, budgetEnd, subject }
 * @param {number} data.userLat - 위도
 * @param {number} data.userLng - 경도
 * @param {number} data.budgetStart - 예산 시작
 * @param {number} data.budgetEnd - 예산 끝
 * @param {array} data.subject - 선택한 키워드 배열
 * @returns {Promise<Array>} 장소 정보 배열
 */
export const planRequest = async (data) => {
  try {
    const res = await axios.post(`https://domo.syu-likelion.org/api/plan/full-ids`, data, {
      headers: { "Content-Type": "application/json" },
    });
    const uuids = Object.values(res.data?.data || res.data);
    const results = [];
    for (const uuid of uuids) {
      try {
        results.push(await locationFinder(uuid));
      } catch (err) {
        console.error("Error processing", uuid, err);
        results.push(null);
      }
    }
    return results.filter(Boolean);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
