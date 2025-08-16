import './styles/recsInfo.css';
import './styles/recs.css';
import Input from '../component/input';
import { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import BoxButton from '../component/boxButton';
import { useInput } from '../hook/useInput';
import RecsLoading from '../component/recsLoading';
// ^ vercel에서는 파일의 확장자 대소문자를 엄격히 구분함 / 제가 바꿔두었습니다.
const RecsInfo = () => {
  // 주소
  const [modalState, setModalState] = useState(false);
  const [address, setAddress] = useState('');

  // 예산
  const [budgetStart, onChangeBudgetStart, setBudgetStart] = useInput('');
  const [budgetEnd, onChangeBudgetEnd, setBudgetEnd] = useInput('');

  // 즐기고 싶은 것
  const [subject, setSubject] = useState([]);

  // 로딩
  const [loading, setLoading] = useState(false);

  /**
   * 있으면 배열에 추가, 없으면 제거
   */
  const onChangeSubject = (value) => {
    if (subject.includes(value)) {
      setSubject(subject.filter((item) => item !== value));
      return;
    }
    setSubject([...subject, value]);
  };

  /**
   * budgetStart에서 숫자가 아닌 값이 있으면 제거
   */
  useEffect(() => {
    if (budgetStart && /[^0-9]/.test(budgetStart)) {
      const onlyNumber = budgetStart.replace(/[^0-9]/g, '');
      setBudgetStart(onlyNumber);
    }
  }, [budgetStart]);

  /**
   * budgetEnd 숫자가 아닌 값이 있으면 제거
   */
  useEffect(() => {
    if (budgetEnd && /[^0-9]/.test(budgetEnd)) {
      const onlyNumber = budgetEnd.replace(/[^0-9]/g, '');
      setBudgetEnd(onlyNumber);
    }
  }, [budgetEnd]);

  /**
   * 주소찾기 버튼 클릭 시 모달 오픈 및 선택 요일 인덱스 저장
   */
  const onClickFindAddress = () => {
    setModalState(true);
  };

  /**
   * DaumPostcode에서 주소 선택 완료 시 해당 요일의 mapAddress 값 변경
   * @param {object} data - DaumPostcode에서 전달받은 주소 데이터
   */
  const onCompletePost = (data) => {
    setModalState(false);
    setAddress(data.address);
  };

  // FIXME: 버튼 기능 추가하기

  const onClickGetRecs = () => {
    if (!address) {
      alert('주소를 입력해주세요.');
      return;
    }
    if (!budgetStart || !budgetEnd) {
      alert('예산을 입력해주세요.');
      return;
    }
    if (parseInt(budgetStart, 10) > parseInt(budgetEnd, 10)) {
      alert('예산의 시작 값이 끝값보다 클 수 없습니다.');
      return;
    }
    if (subject.length === 0) {
      alert('키워드를 선택해주세요.');
      return;
    }
    setLoading(true);

    // FIXME: api 추가

    setTimeout(() => {
      setLoading(false);
      // 여기에 실제 API 호출 후 처리 로직을 추가하세요.
    }, 10000);
  };

  return (
    <section className="recsInfoPage recsPage">
      {/* 메인 */}
      <section className="context flexCol">
        {/* 로딩 */}
        {loading && <RecsLoading />}
        <div>
          <p>현재 위치를 적어주세요.</p>
          <div>
            <div>
              <Input value={address} ex="주소 찾기를 눌러주세요" lock={true} />
            </div>
            <div className="flexCenter" onClick={onClickFindAddress}>
              주소 찾기
            </div>
          </div>
        </div>
        <div>
          <p>오늘의 예산을 입력해주세요.</p>
          <div>
            <div>
              <Input
                value={budgetStart}
                onChangeHandler={onChangeBudgetStart}
              />
            </div>
            <span></span>
            <div>
              <Input value={budgetEnd} onChangeHandler={onChangeBudgetEnd} />
            </div>
          </div>
        </div>
        <div>
          <p>우리 동네에서 뭘 즐기고 싶은지 알려주세요.</p>
          <div>
            <ul className="flexBetween">
              <li
                onClick={() => onChangeSubject('액티비티')}
                style={{
                  backgroundColor: subject.includes('액티비티')
                    ? 'var(--main-color)'
                    : 'var(--black-1)',
                  color: subject.includes('액티비티')
                    ? 'var(--black-0)'
                    : 'var(--black-3)',
                }}
              >
                액티비티
              </li>
              <li
                onClick={() => onChangeSubject('혼자만의 휴식')}
                style={{
                  backgroundColor: subject.includes('혼자만의 휴식')
                    ? 'var(--main-color)'
                    : 'var(--black-1)',
                  color: subject.includes('혼자만의 휴식')
                    ? 'var(--black-0)'
                    : 'var(--black-3)',
                }}
              >
                혼자만의 휴식
              </li>
              <li
                onClick={() => onChangeSubject('데이트')}
                style={{
                  backgroundColor: subject.includes('데이트')
                    ? 'var(--main-color)'
                    : 'var(--black-1)',
                  color: subject.includes('데이트')
                    ? 'var(--black-0)'
                    : 'var(--black-3)',
                }}
              >
                데이트
              </li>
              <li
                onClick={() => onChangeSubject('맛집 발굴')}
                style={{
                  backgroundColor: subject.includes('맛집 발굴')
                    ? 'var(--main-color)'
                    : 'var(--black-1)',
                  color: subject.includes('맛집 발굴')
                    ? 'var(--black-0)'
                    : 'var(--black-3)',
                }}
              >
                맛집 발굴
              </li>
            </ul>
            <ul className="flexBetween">
              <li
                onClick={() => onChangeSubject('인생샷')}
                style={{
                  backgroundColor: subject.includes('인생샷')
                    ? 'var(--main-color)'
                    : 'var(--black-1)',
                  color: subject.includes('인생샷')
                    ? 'var(--black-0)'
                    : 'var(--black-3)',
                }}
              >
                인생샷
              </li>
              <li
                onClick={() => onChangeSubject('아이 동반')}
                style={{
                  backgroundColor: subject.includes('아이 동반')
                    ? 'var(--main-color)'
                    : 'var(--black-1)',
                  color: subject.includes('아이 동반')
                    ? 'var(--black-0)'
                    : 'var(--black-3)',
                }}
              >
                아이 동반
              </li>
              <li
                onClick={() => onChangeSubject('반려견 동반')}
                style={{
                  backgroundColor: subject.includes('반려견 동반')
                    ? 'var(--main-color)'
                    : 'var(--black-1)',
                  color: subject.includes('반려견 동반')
                    ? 'var(--black-0)'
                    : 'var(--black-3)',
                }}
              >
                반려견 동반
              </li>
              <li
                onClick={() => onChangeSubject('아무거나')}
                style={{
                  backgroundColor: subject.includes('아무거나')
                    ? 'var(--main-color)'
                    : 'var(--black-1)',
                  color: subject.includes('아무거나')
                    ? 'var(--black-0)'
                    : 'var(--black-3)',
                }}
              >
                아무거나
              </li>
            </ul>
          </div>
        </div>
        <BoxButton onClickHandler={onClickGetRecs} height="62px" radius="12px">
          나에게 딱 맞는 우리 동네 놀거리 추천 받기
        </BoxButton>
      </section>

      {/* 배경 */}
      <div className="recsPage_circle1"></div>
      <div className="recsPage_circle2"></div>
      <div className="recsPage_circle_move"></div>

      {modalState && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.3)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setModalState(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              padding: 0,
              zIndex: 10001,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <DaumPostcode
              style={{ width: 400, height: 500 }}
              onComplete={onCompletePost}
            />
          </div>
        </div>
      )}
    </section>
  );
};
export default RecsInfo;
