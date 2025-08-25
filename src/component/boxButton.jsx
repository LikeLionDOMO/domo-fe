import "./styles/boxButton.css";

/**
 *
 * @param {Function} onClickHandler 클릭 함수
 * @param {string} width 버튼 너비 (기본값: 100%)
 * @param {string} height 버튼 높이 (기본값: 100%)
 * @param {string} padding 버튼 패딩 (기본값: unset unset)
 * @param {string} color 버튼 색상 var값으로 전달하기 (기본값: "--black-0")
 * @param {string} bgColor 버튼 배경 색상 var값으로 전달하기 (기본값: "--black-0")
 * @param {React.ReactNode} children 버튼 내부에 들어갈 요소들
 * @returns
 */
const BoxButton = ({
  children,
  onClickHandler,
  width = "100%",
  height = "100%",
  padding = "unset unset",
  color = "--black-0",
  bgColor = "--main-color",
  radius = "16px",
}) => {
  return (
    <div
      onClick={onClickHandler}
      style={{
        borderRadius: `${radius}`,
        width: `${width}`,
        height: `${height}`,
        minHeight: `${height}`,
        padding: `${padding}`,
        color: `var(${color})`,
        backgroundColor: `var(${bgColor})`,
      }}
      className="boxButton flexCenter">
      {children}
    </div>
  );
};
export default BoxButton;
