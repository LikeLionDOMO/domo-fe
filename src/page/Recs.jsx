import { useEffect, useState } from "react";
import Modal from "../component/modal";
import "./styles/recs.css";

const Recs = () => {
  const [gpsAgree, setGpsAgree] = useState(false);

  const gpsCheck = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        setGpsAgree(true);
      },
      (error) => {
        console.error("위치 정보 수집 실패:", error);
        setGpsAgree(false);
      }
    );
  };

  useEffect(() => {
    gpsCheck();
  }, []);

  return (
    <section className="recsPage">
      {/* 위치수집 및 이용동의 */}
      {!gpsAgree && (
        <Modal>
          <div>
            원활한 서비스 이용을 위해선
            <br />
            아래 항목에 대한 동의가 필요해요.
          </div>
          <input type="checkbox" id="isGps" />
          <label htmlFor="isGps">사용자의 위치 정보 수집 및 이용에 동의합니다.</label>
        </Modal>
      )}

      {/* 배경 */}
      <div className="recsPage_circle1"></div>
      <div className="recsPage_circle2"></div>
      <div className="recsPage_circle_move"></div>
    </section>
  );
};
export default Recs;
