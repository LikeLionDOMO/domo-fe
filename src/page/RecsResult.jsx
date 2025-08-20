import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import "./styles/recsResult.css";
import NaverMap from "../component/NaverMap";
import { useEffect, useState } from "react";
import Popover from "../component/Popover";
import BoxButton from "../component/boxButton";

const RecsResult = () => {
  const location = useLocation();
  const nav = useNavigate();
  const recommendations = location.state?.recommendations || [];
  const [popoverData, setPopoverData] = useState(null);

  // 튜토리얼 단계
  const [firstVisit, setFirstVisit] = useState(localStorage.getItem("firstVisit") || "0");
  // 튜토리얼 모드
  const [firstVisitMode, setFirstVisitMode] = useState(!localStorage.getItem("firstVisit") || localStorage.getItem("firstVisit") === "0" ? true : false);

  // firstVisit 0 - 장소변경
  // firstVisit 1 - 되돌리기
  // firstVisit 2 - 결정하기

  // firstVisit 3 - 종료
  // firstVisitMode true - 튜토리얼 모드
  // firstVisitMode false - 일반 모드

  // 튜토리얼 단계 클릭 이벤트
  // 튜토리얼 단계 클릭 이벤트 관리
  useEffect(() => {
    // 현재 튜토리얼 모드와 단계 콘솔 출력(디버깅용)
    console.log("firstVisitMode:", firstVisitMode);
    console.log("firstVisit:", firstVisit);

    // 튜토리얼 모드가 아니면 아무 동작하지 않음
    if (!firstVisitMode) return;

    // 페이지 내 아무 곳이나 클릭 시 실행되는 함수
    const handleAnyClick = () => {
      // 다음 단계로 1 증가 (문자열로 저장)
      let nextStep = String(Number(firstVisit) + 1);

      // 3단계(종료) 이상이면 튜토리얼 모드 종료 처리
      if (Number(nextStep) >= 3) {
        setFirstVisitMode(false); // 튜토리얼 모드 비활성화
        setFirstVisit("3"); // 단계 3으로 고정
        localStorage.setItem("firstVisit", "3");
      } else {
        // 0, 1, 2단계에서는 단계만 1씩 증가
        setFirstVisit(nextStep);
        localStorage.setItem("firstVisit", nextStep);
      }
    };

    // 클릭 이벤트 리스너 등록
    document.addEventListener("click", handleAnyClick);

    // 언마운트 시 이벤트 리스너 해제
    return () => {
      document.removeEventListener("click", handleAnyClick);
    };
  }, [firstVisitMode, firstVisit]);

  if (recommendations.length === 0) {
    return (
      <>
        <div className="recsResult_fallback">
          <p>추천 정보를 불러오지 못했습니다.</p>
          <button onClick={() => nav("/recs/info")}>다시 추천받기</button>
        </div>
      </>
    );
  }

  const handleTogglePopover = (rec, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPopoverData({
      rec: rec,
      position: {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
      },
    });
  };

  const handleClosePopover = () => {
    setPopoverData(null);
  };

  // 결정하기 핸들러 함수
  const onSaveToNextHandler = () => {
    if (window.confirm("다음으로 넘어가면 수정이 불가능합니다.\n넘어가시겠습니까?")) {
      nav("/recs/save", { state: { recommendations } });
    }
  };

  return (
    <section className="recsResultPage">
      {firstVisitMode && (
        <div
          className="firstVisitModeSkip firstVisitMode"
          onClick={() => {
            setFirstVisitMode(false);
            setFirstVisit("3");
            localStorage.setItem("firstVisit", "3");
          }}>
          <BoxButton bgColor="--point-color-1" color="--black-6">
            설명 건너뛰기
          </BoxButton>
        </div>
      )}
      <div className="recsResult_list">
        <div className="recsResult_header">
          <button onClick={() => nav(-1)} className="recsResult_back-button">
            <ChevronLeft size={28} color="#B7BBCF" />
            <span className="logo-text">DOMO</span>
          </button>
        </div>
        <div className="list_header">
          <p className="list_header_title">
            오늘의 <span>놀거리</span>를
            <br />
            모아왔어요!
          </p>
          <button className={`list_header_backBtn ${firstVisitMode && firstVisit === "1" ? "firstVisitMode" : ""}`}>
            되돌리기
            <span className={`${firstVisitMode && firstVisit === "1" ? "firstVisitModeDesc1" : "none"}`}>
              실수해도 놀라지 마세요!
              <br />
              바로 직전 상태로 돌려드릴게요.
            </span>
          </button>
        </div>
        <ul className={`list_items ${firstVisitMode && firstVisit ? "firstVisitModeBg" : ""}`}>
          {recommendations.map((rec, index) => (
            <li key={rec.id} className={`list_item ${firstVisitMode && firstVisit === "0" && index === 0 ? "firstVisitMode" : ""}`}>
              <div className="item_number">{index + 1}</div>
              <div className="item_card">
                <div className="item_content">
                  <div className="item_img"></div>
                  <div className="item_info">
                    <p className="item_name">{rec.name}</p>
                    <p className="item_address">{rec.address}</p>
                    <span className="item_benefit">{rec.benefit}</span>
                  </div>
                </div>
              </div>

              <div className="item_dots" onClick={(event) => handleTogglePopover(rec, event)}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className={`${firstVisitMode && firstVisit === "0" && index === 0 ? "firstVisitModeDesc0" : "none"}`}>
                여기서 장소를 변경하거나
                <br />
                삭제할 수 있어요.
              </span>
            </li>
          ))}
        </ul>
        <div className="list_footer">
          <button className={`list_footer-btn ${firstVisitMode && firstVisit === "2" ? "firstVisitMode" : ""}`} onClick={onSaveToNextHandler}>
            결정하기
            <span className={`${firstVisitMode && firstVisit === "2" ? "firstVisitModeDesc2" : "none"}`}>
              결정한 후에는 수정할 수 없어요.
              <br />
              신중하게 결정해주세요!
            </span>
          </button>
        </div>
      </div>

      {/* naver map */}
      <div className="recsResult_map">
        <NaverMap recommendations={recommendations} />
      </div>

      {/* 팝업 */}
      {popoverData && (
        <Popover onClose={handleClosePopover} position={popoverData.position}>
          <div className="popover_item_options">
            <button>다시 추천</button>
            <div className="pop-line"></div>
            <button>삭제하기</button>
          </div>
        </Popover>
      )}
    </section>
  );
};

export default RecsResult;
