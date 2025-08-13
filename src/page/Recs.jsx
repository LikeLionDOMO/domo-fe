import { useCallback, useEffect, useState } from "react";
import Modal from "../component/modal";
import "./styles/recs.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BoxButton from "../component/boxButton";
import { useNavigate } from "react-router-dom";

const Recs = () => {
  const [gpsAgree, setGpsAgree] = useState(false);
  const [onGpsAgree, setOnGpsAgree] = useState(false);

  const nav = useNavigate();

  // 1, 2. 사이트 접속 시 권한 팝업 없이 gps 사용 가능 여부만 확인
  useEffect(() => {
    const checkPermission = async () => {
      if (navigator.permissions) {
        try {
          const result = await navigator.permissions.query({ name: "geolocation" });
          if (result.state === "granted") {
            setGpsAgree(true);
            setOnGpsAgree(false);
          } else {
            setGpsAgree(false);
            setOnGpsAgree(true);
          }
        } catch (e) {
          setGpsAgree(false);
          setOnGpsAgree(true);
        }
      } else {
        // permissions API 미지원 브라우저 fallback
        setGpsAgree(false);
        setOnGpsAgree(true);
      }
    };
    checkPermission();
  }, []);

  // onGpsAgree가 true인 동안 2초마다 gps 권한을 검사
  useEffect(() => {
    if (!onGpsAgree) return;
    let intervalId;
    const checkPermission = async () => {
      if (navigator.permissions) {
        try {
          const result = await navigator.permissions.query({ name: "geolocation" });
          if (result.state === "granted") {
            setGpsAgree(true);
          } else {
            setGpsAgree(false);
          }
        } catch (e) {
          setGpsAgree(false);
        }
      } else {
        setGpsAgree(false);
      }
    };
    intervalId = setInterval(checkPermission, 1000);
    // 최초 1회 즉시 실행
    checkPermission();
    return () => clearInterval(intervalId);
  }, [onGpsAgree]);

  // 3. gps 허용 팝업 띄우기
  const onClickAgree = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      () => {
        setGpsAgree(true);
      },
      (error) => {
        setGpsAgree(false);
      }
    );
  }, []);

  // 4. gps 동의 후 다음 단계
  const onClickAgreeNext = useCallback(() => {
    if (gpsAgree) {
      setOnGpsAgree(false);
    } else {
      setOnGpsAgree(true);
      alert("위치 정보 수집 및 이용에 동의해 주세요.");
    }
  }, [gpsAgree]);

  return (
    <section className="recsPage flexCenter">
      {/* 위치수집 및 이용동의 */}
      {onGpsAgree && (
        <Modal>
          <div>
            원활한 서비스 이용을 위해선
            <br />
            아래 항목에 대한 동의가 필요해요.
          </div>
          <div className="flexHeightCenter">
            <div onClick={onClickAgree} className={`flexCenter ${gpsAgree ? "checked" : "none"}`}>
              <FontAwesomeIcon icon={faCheck} className={`recsPage_checkIcon `} />
            </div>
            <span>사용자의 위치 정보 수집 및 이용에 동의합니다.</span>
          </div>
          <div className="NextButton">
            <BoxButton onClickHandler={onClickAgreeNext} bgColor="--black-3">
              다음
            </BoxButton>
          </div>
        </Modal>
      )}

      <section className="flexCenter content">
        <div className="">
          <h2>
            잠깐! 아직도 오늘
            <br />뭘 하면 좋을지 못 정하셨나요?
          </h2>
          <p>
            걱정하지 마세요!
            <br />딱 5초만에 도모가 당신을 <span className="point">도</span>와 일정을 <span className="point">모</span>아줄게요.
            <br />
            지금 바로 도모의 AI가 당신의 하루를 멋지게 완성할 거예요.
          </p>
          <div className="image">{/* 이미지 */}</div>
          <div className="button" onClick={() => nav("/recs/info")}>
            <BoxButton>도모와 함께 우리 동네 놀거리 찾기</BoxButton>
          </div>
        </div>
      </section>

      {/* 배경 */}
      <div className="recsPage_circle1"></div>
      <div className="recsPage_circle2"></div>
      <div className="recsPage_circle_move"></div>
    </section>
  );
};
export default Recs;
