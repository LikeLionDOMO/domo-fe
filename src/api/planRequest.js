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
    const response = await axios
      .post(`${API_URL}/api/plan/full-ids`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((e) => {
        throw e;
      });
    const uuidData = response.data;
    const results = [];

    const keys = Object.keys(uuidData).sort((a, b) => a - b);

    for (const key of keys) {
      try {
        const locationData = await locationFinder(uuidData[key]);
        results.push(locationData);
      } catch (error) {
        console.error(`Error processing ${key}:`, error);
        results.push(null);
      }
    }
    return results;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
