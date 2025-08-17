import BoxButton from "../component/boxButton";
import { useMedia } from "../hook/useMedia";
import "./styles/recsSave.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import html2canvas from "html2canvas";
import RecsSaveScreenshot from "../component/recsSaveScreenshot";

const RecsSave = () => {
  // localStorage.setItem("resultData" /* 데이터 */);
  const isPc = useMedia().isPc;
  const nav = useNavigate();
  const componentRef = useRef();

  const gotoHome = () => {
    if (window.confirm("일정이 사라집니다.\n홈 화면으로 이동하시겠습니까?")) {
      nav("/");
    }
  };

  const onSaveHandler = async () => {
    if (componentRef.current) {
      try {
        const canvas = await html2canvas(componentRef.current, {
          backgroundColor: "#ffffff",
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });

        // Canvas를 이미지로 변환
        const imgData = canvas.toDataURL("image/jpeg", 0.9);

        // 다운로드 링크 생성
        const link = document.createElement("a");
        link.download = `도모_일정_${new Date().toLocaleDateString().replace(/\//g, "-")}.jpg`;
        link.href = imgData;

        // 다운로드 실행
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("스크린샷 저장 중 오류가 발생했습니다:", error);
        alert("이미지 저장에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <section className="flexCenter savePage">
      {/* 화면에 보이지 않게 숨겨진 스크린샷 컴포넌트 */}
      <div
        style={{
          position: "fixed",
          left: "-9999px",
          top: "0px",
          zIndex: -1,
        }}>
        <RecsSaveScreenshot ref={componentRef} />
      </div>

      {isPc && (
        <div className="isPc">
          <div>
            <h2>
              <span>도모</span>와 함께
              <br />
              오늘도 즐거운 하루 되세요!
            </h2>
            <div className="flexBetween">
              <div>
                <BoxButton onClickHandler={gotoHome}>홈 화면</BoxButton>
              </div>
              <div className="saveButton">
                <BoxButton onClickHandler={onSaveHandler}>일정 저장</BoxButton>
              </div>
            </div>
            <span className="desc">
              방금 짠 오늘 일정을
              <br />
              이미지로 저장할 수 있어요
            </span>
          </div>
          <div className="savePage_BgImg">{/* 이미지 */}</div>
        </div>
      )}

      {!isPc && (
        <div className="isMobile">
          <h2>
            <span>도모</span>와 함께
            <br />
            오늘도 즐거운 하루 되세요!
          </h2>
          <div>
            <div className="saveButton">
              <BoxButton bgColor="--point-color-2" color="--point-color-2-2" onClickHandler={onSaveHandler}>
                일정 저장
              </BoxButton>
              <span className="desc">
                방금 짠 오늘 일정을
                <br />
                이미지로 저장할 수 있어요
              </span>
            </div>
            <div className="savePage_BgImg">{/* 이미지 */}</div>
          </div>
          <div>
            <BoxButton onClickHandler={gotoHome}>홈화면</BoxButton>
          </div>
        </div>
      )}
    </section>
  );
};
export default RecsSave;
