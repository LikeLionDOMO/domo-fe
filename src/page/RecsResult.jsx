// Haversine 거리 계산 함수 (미터)
function distanceInMeterByHaversine(lat1, lng1, lat2, lng2) {
  const radius = 6371000; // m
  const toRadian = Math.PI / 180;
  const deltaLat = (lat2 - lat1) * toRadian;
  const deltaLng = (lng2 - lng1) * toRadian;
  const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1 * toRadian) * Math.cos(lat2 * toRadian) * Math.sin(deltaLng / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(a));
  return radius * c;
}
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import "./styles/recsResult.css";
import NaverMap from "../component/NaverMap";
import { useEffect, useState, useRef } from "react";
import Popover from "../component/Popover";
import BoxButton from "../component/boxButton";
import { useMedia } from "../hook/useMedia";
import { Resizable } from "re-resizable";
import PcHeader from "../layout/PcHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faMugHot, faUtensils, faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "../component/modal";
// import { mapMockData } from "../data/mockData";

const RecsResult = () => {
  const location = useLocation();
  // const [recommendations, setRecommendations] = useState(mapMockData);
  const [recommendations, setRecommendations] = useState(location.state?.recommendations || []);
  const [popoverData, setPopoverData] = useState(null);

  // 튜토리얼 단계
  const [firstVisit, setFirstVisit] = useState(localStorage.getItem("firstVisit") || "0");
  // 튜토리얼 모드
  const [firstVisitMode, setFirstVisitMode] = useState(!localStorage.getItem("firstVisit") || localStorage.getItem("firstVisit") === "0" ? true : false);

  const [panelHeight, setPanelHeight] = useState("40vh");
  const resizableRef = useRef();

  const isPc = useMedia().isPc;

  const [center, setCenter] = useState({ lat: recommendations[0].lat, lng: recommendations[0].lng });

  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  // 임시저장데이터 전체
  const [tempDatas, setTempDatas] = useState();
  // 임시저장 데이터
  const [tempData, setTempData] = useState();
  // 사용자 동의 구하는 모달창
  const [agreeModal, setAgreeModal] = useState(false);

  const nav = useNavigate();

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

  console.log(isPc);

  // 다시 찾기
  const onClickRecommend = async (data) => {
    const excludeIds = recommendations.filter((r) => r.placeId !== data.placeId).map((r) => r.placeId);
    const idx = recommendations.findIndex((r) => r.placeId === data.placeId);
    const prev = idx > 0 ? recommendations[idx - 1] : data;
    try {
      const { recommend } = await import("../api/recommend");
      const newRec = await recommend({
        ...data,
        exclude: excludeIds,
        lat: prev.lat,
        lng: prev.lng,
      });
      if (newRec === null) {
        return alert("오류가 발생하였습니다.<br/>다시 시도해 주세요.");
      }
      // 전체 데이터
      setTempDatas((list) => list.map((r) => (r.placeId === data.placeId ? newRec : r)));
      // 거리 계산
      const idx = recommendations.findIndex((r) => r.placeId === data.placeId);
      const prev = idx > 0 ? recommendations[idx - 1] : null;
      const next = idx < recommendations.length - 1 ? recommendations[idx + 1] : null;
      // 신규 장소 기준 거리 (미터)
      let newDistance = 0;
      if (prev) newDistance += distanceInMeterByHaversine(prev.lat, prev.lng, newRec.lat, newRec.lng);
      if (next) newDistance += distanceInMeterByHaversine(newRec.lat, newRec.lng, next.lat, next.lng);
      // 기존 장소 기준 거리 (미터)
      let oldDistance = 0;
      if (prev) oldDistance += distanceInMeterByHaversine(prev.lat, prev.lng, data.lat, data.lng);
      if (next) oldDistance += distanceInMeterByHaversine(data.lat, data.lng, next.lat, next.lng);
      // 단일 데이터
      setTempData({
        newData: newRec,
        oldData: data,
        newDistance,
        oldDistance,
      });
      handleClosePopover();
      setAgreeModal(true);
    } catch (err) {
      console.log(err);
      alert("추천 요청에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
    // setAgreeModal(true);
  };

  // 교체 확인
  const onClickReplace = () => {
    onChangeRecommendations();
    setRecommendations(tempDatas);
    setTempData(null);
    setAgreeModal(false);
  };

  // 삭제하기
  const onClickDelete = (data) => {
    if (recommendations.length === 1) {
      handleClosePopover();
      return alert("하나 이상의 값이 존재해야 합니다.");
    }
    onChangeRecommendations();
    const newRecs = recommendations.filter((r) => r.placeId !== data.placeId);
    setRecommendations((prev) => {
      if (prev.length !== 1) {
        return newRecs;
      }
    });
    handleClosePopover();
  };

  // 되돌리기 데이터 저장
  const onChangeRecommendations = () => {
    const r1 = localStorage.getItem("r-1");
    const r2 = localStorage.getItem("r-2");

    localStorage.setItem("r-3", r2 ?? "null");
    localStorage.setItem("r-2", r1 ?? "null");
    localStorage.setItem("r-1", JSON.stringify(recommendations));
  };

  // 되돌리기
  const onChangeReverse = () => {
    const r1 = JSON.parse(localStorage.getItem("r-1"));
    const r2 = JSON.parse(localStorage.getItem("r-2"));
    const r3 = JSON.parse(localStorage.getItem("r-3"));

    if (r1) {
      setRecommendations(r1);
      localStorage.setItem("r-1", JSON.stringify(r2));
      localStorage.setItem("r-2", JSON.stringify(r3));
      localStorage.setItem("r-3", null);
    } else {
      alert("더 이상 되돌릴 수 없습니다.");
    }
  };

  console.log(recommendations);

  const onClickModal = (rec) => {
    setModalData(rec);
    setIsModal(true);
  };

  if (recommendations.length === 0) {
    alert("추천 정보를 불러오지 못했습니다.");
    return nav("/recs/info");
  }

  console.log("modalData" + modalData, isModal);
  return (
    <div className="recsResultPageMain">
      {isPc && <PcHeader />}
      {isModal && (
        <Modal>
          <div className="modal_content_">
            {/* 배너 */}
            <div>
              <p>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => {
                    setModalData(null);
                    setIsModal(false);
                  }}
                  className="icon"
                />
              </p>
              <div>
                {modalData.category === "음식점" && <FontAwesomeIcon icon={faUtensils} />}
                {modalData.category === "놀거리" && <FontAwesomeIcon icon={faGamepad} />}
                {modalData.category === "카페" && <FontAwesomeIcon icon={faMugHot} />}
              </div>
            </div>

            {/* 내용 */}
            <div>
              <p>{modalData.name}</p>
              <p>{modalData.address}</p>
              <p>{modalData.benefit}</p>
            </div>
            <div>
              <a href={`https://map.naver.com/p/search/${modalData.address} ${modalData.name}`} target="_blank" rel="noopener noreferrer">
                <BoxButton padding="0 24px" bgColor="--main-color" color="--black-0">
                  자세히 보기
                </BoxButton>
              </a>
            </div>
          </div>
        </Modal>
      )}

      {agreeModal && (
        <Modal>
          <div className="modal_content_2">
            <p>
              기존 장소와 새로운 장소의 이동거리 차이가
              <br />
              <span style={{ color: "var(--main-color)" }}>
                {tempData && Math.abs(tempData.oldDistance - tempData.newDistance) < 1
                  ? "별로 없어요!"
                  : tempData &&
                    `${tempData.newDistance - tempData.oldDistance > 0 ? "+" : "-"}${Math.abs(tempData.newDistance - tempData.oldDistance).toFixed(0)}m`}
              </span>
              {tempData && Math.abs(tempData.oldDistance - tempData.newDistance) >= 1 && "정도 차이가 생겨요!"}
            </p>
            <div>
              <div>
                {modalData.category === "음식점" && <FontAwesomeIcon icon={faUtensils} />}
                {modalData.category === "놀거리" && <FontAwesomeIcon icon={faGamepad} />}
                {modalData.category === "카페" && <FontAwesomeIcon icon={faMugHot} />}
              </div>
              <div>
                <p>{tempData.newData.name}</p>
                <p>{tempData.newData.address}</p>
                <p>{tempData.newData.benefit}</p>
              </div>
              <div className="flexBetween">
                <div
                  onClick={() => {
                    setTempData(null);
                    setTempDatas(null);
                    setAgreeModal(false);
                  }}
                  className="flexCenter">
                  최소하기
                </div>
                <div
                  onClick={() => {
                    onClickReplace();
                  }}
                  className="flexCenter">
                  추가하기
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {isPc && (
        <section className="recsResultPage">
          {firstVisitMode && (
            <div
              className="firstVisitModeSkip firstVisitMode"
              onClick={() => {
                setFirstVisitMode(false);
                setFirstVisit("3");
                localStorage.setItem("firstVisit", "3");
              }}>
              <BoxButton bgColor="--point-color-1" color="--black-6" padding="12px 16px">
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
              <button onClick={onChangeReverse} className={`list_header_backBtn ${firstVisitMode && firstVisit === "1" ? "firstVisitMode" : ""} flexCenter`}>
                되돌리기
                <span className={`${firstVisitMode && firstVisit === "1" ? "firstVisitModeDesc1" : "none"}`}>
                  실수해도 놀라지 마세요!
                  <br />
                  바로 직전 상태로 돌려드릴게요.
                </span>
              </button>
            </div>
            <ul className={`list_items ${firstVisitMode && firstVisit ? "firstVisitModeBg" : ""}`}>
              {recommendations?.map((rec, index) => (
                <li
                  key={rec.id}
                  onClick={() => {
                    setCenter({ lat: rec.lat, lng: rec.lng });
                  }}
                  className={`list_item ${firstVisitMode && firstVisit === "0" && index === 0 ? "firstVisitMode" : ""}`}>
                  <div className="item_number">{index + 1}</div>
                  <div className="item_card">
                    <div
                      className="item_content"
                      onClick={() => {
                        onClickModal(rec);
                      }}>
                      <div className="item_img flexCenter">
                        {rec.category === "음식점" && <FontAwesomeIcon icon={faUtensils} />}
                        {rec.category === "놀거리" && <FontAwesomeIcon icon={faGamepad} />}
                        {rec.category === "카페" && <FontAwesomeIcon icon={faMugHot} />}
                      </div>
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
            <NaverMap center={center} recommendations={recommendations} />
          </div>

          {/* 팝업 */}
          {popoverData && (
            <Popover onClose={handleClosePopover} position={popoverData.position}>
              <div className="popover_item_options">
                <button
                  onClick={() => {
                    onClickRecommend(popoverData.rec);
                  }}>
                  다시 추천
                </button>
                <div className="pop-line"></div>
                <button onClick={() => onClickDelete(popoverData.rec)}>삭제하기</button>
              </div>
            </Popover>
          )}
        </section>
      )}
      {!isPc && (
        <section className={`isMobile`}>
          <div className="recsResult_header">
            <div className="recsResult_header">
              <button onClick={() => nav(-1)} className="recsResult_back-button">
                <ChevronLeft size={28} color="#B7BBCF" />
                <span className="logo-text">DOMO</span>
              </button>
            </div>
            {firstVisitMode && (
              <div
                className="firstVisitModeSkip firstVisitMode"
                onClick={() => {
                  setFirstVisitMode(false);
                  setFirstVisit("3");
                  localStorage.setItem("firstVisit", "3");
                }}>
                <BoxButton padding="12px 16px" bgColor="--point-color-1" color="--black-6">
                  설명 건너뛰기
                </BoxButton>
              </div>
            )}
          </div>
          <div className={`recsResult_resizable  ${firstVisitMode && firstVisit ? "firstVisitModeBg" : ""}`}>
            <Resizable
              ref={resizableRef} // 리사이즈 컴포넌트에 ref 연결 (필요시 외부에서 접근)
              size={{ width: "100%", height: panelHeight }} // 현재 크기 상태(가로 100%, 세로는 panelHeight 상태값)
              minHeight="40vh" // 최소 높이 제한
              maxHeight="75vh" // 최대 높이 제한
              enable={{
                top: true, // 상단만 드래그로 리사이즈 가능
                right: false,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
              handleStyles={{
                top: {
                  height: "16px", // 리사이즈 핸들 높이
                  cursor: "ns-resize", // 마우스 커서 모양(상하 리사이즈)
                  margin: "12px auto",
                },
              }}
              onResizeStop={(e, direction, ref, d) => {
                // 리사이즈 드래그가 끝났을 때 실행되는 함수
                setPanelHeight((prev) => {
                  let next = prev + d.height; // 이전 높이에 드래그 변화량을 더함
                  return next; // 새로운 높이 반환
                });
              }}>
              <div className="recsResult_resizable_controller"></div>

              <div className="recsResult_list">
                <div className="list_header">
                  <p className="list_header_title">
                    오늘의 <span>놀거리</span>를
                    <br />
                    모아왔어요!
                  </p>
                  <button
                    onClick={onChangeReverse}
                    className={`list_header_backBtn ${firstVisitMode && firstVisit === "1" ? "firstVisitMode" : ""} flexCenter`}>
                    되돌리기
                    <span className={`${firstVisitMode && firstVisit === "1" ? "firstVisitModeDesc1" : "none"}`}>
                      실수해도 놀라지 마세요!
                      <br />
                      바로 직전 상태로 돌려드릴게요.
                    </span>
                  </button>
                </div>
                <span className={`${firstVisitMode && firstVisit === "0" ? "firstVisitModeDesc0" : "none"}`}>
                  여기서 장소를 변경하거나
                  <br />
                  삭제할 수 있어요.
                </span>
                <ul className={`list_items`}>
                  {recommendations?.map((rec, index) => (
                    <li
                      key={rec.id}
                      onClick={() => {
                        setCenter({ lat: rec.lat, lng: rec.lng });
                        onClickModal(rec);
                      }}
                      className={`list_item ${firstVisitMode && firstVisit === "0" && index === 0 ? "firstVisitMode" : ""}`}>
                      <div className="item_number">{index + 1}</div>
                      <div className="item_card">
                        <div
                          className="item_content"
                          onClick={() => {
                            onClickModal(rec);
                          }}>
                          <div className="item_img">
                            {rec.category === "음식점" && <FontAwesomeIcon icon={faUtensils} />}
                            {rec.category === "놀거리" && <FontAwesomeIcon icon={faGamepad} />}
                            {rec.category === "카페" && <FontAwesomeIcon icon={faMugHot} />}
                          </div>
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
                    </li>
                  ))}
                </ul>
                {/* 팝업 */}
                {popoverData && (
                  <Popover onClose={handleClosePopover} position={popoverData.position}>
                    <div className="popover_item_options">
                      <button
                        onClick={() => {
                          onClickRecommend(popoverData.rec);
                        }}>
                        다시 추천
                      </button>
                      <div className="pop-line"></div>
                      <button onClick={() => onClickDelete(popoverData.rec)}>삭제하기</button>
                    </div>
                  </Popover>
                )}
              </div>
            </Resizable>
          </div>
          <button
            className={`list_footer-btn ${firstVisitMode && firstVisit === "2" ? "firstVisitMode" : ""} ${firstVisitMode && firstVisit !== "2" ? "none" : ""}`}
            onClick={onSaveToNextHandler}>
            결정하기
            <span className={`${firstVisitMode && firstVisit === "2" ? "firstVisitModeDesc2" : "none"}`}>
              결정한 후에는 수정할 수 없어요.
              <br />
              신중하게 결정해주세요!
            </span>
          </button>

          {/* naver map */}
          <div className="recsResult_map">
            <NaverMap center={center} recommendations={recommendations} />
          </div>
        </section>
      )}
    </div>
  );
};

export default RecsResult;
