import "./styles/input.css";

/**
 * InputCP - 텍스트 입력 폼 컴포넌트
 * <InputCP title="타이틀" essential="true" ex="예시문입니다" onChangeHandler={onChangeFTName} />
 *
 * @param {string} title - input의 placeholder 텍스트
 * @param {boolean} essential - 필수 입력 여부
 * @param {string} ex - 예시 텍스트
 * @param {boolean} pw - 비밀번호 입력 여부
 * @param {function} onChangeHandler - 입력 값 변경 핸들러
 * @param {string} value - input의 현재 값
 * @param {boolean} lock - input의 잠금 상태 (true: 잠김, false: 잠기지 않음)
 * @returns {JSX.Element} 텍스트 입력 폼
 *
 */
const Input = ({ title = "", essential = false, ex, pw = false, onChangeHandler, value, lock }) => {
  return (
    <div className="inputCP">
      {title && !essential && (
        <label htmlFor="InputCP">
          {title}
          {essential && <span className="essential">*</span>}
        </label>
      )}
      <input
        style={{ height: title && !essential ? "3.5rem" : "100%", cursor: lock ? "not-allowed" : "text" }}
        type={pw ? "password" : "text"}
        id="InputCP"
        name="InputCP"
        onChange={onChangeHandler || (() => {})}
        placeholder={ex}
        value={value}
        disabled={!!lock}
      />
    </div>
  );
};
export default Input;
