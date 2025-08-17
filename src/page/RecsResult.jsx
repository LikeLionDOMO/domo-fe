import { useLocation, useNavigate } from 'react-router-dom';
import './styles/recsResult.css';
import NaverMap from '../component/NaverMap';
import BoxButton from '../component/boxButton';

const RecsResult = () => {
  const location = useLocation();
  const nav = useNavigate();
  const recommendations = location.state?.recommendations || [];

  if (recommendations.length === 0) {
    return (
      <div>
        <p>추천 정보를 불러오지 못했습니다.</p>
        <button onClick={() => nav('/recs/info')}>다시 추천받기</button>
      </div>
    );
  }

  return (
    <section className="recsResultPage">
      <div className="recsResult_list">
        <div className="list_header">
          <p className="list_header_title">
            오늘의 놀거리를
            <br />
            모아왔어요!
          </p>
          <button className="list_header_backBtn" onClick={() => nav(-1)}>
            되돌리기
          </button>
        </div>
        <ul className="list_items">
          {recommendations.map((rec, index) => (
            <li key={rec.id} className="list_item">
              <div className="item_number">{index + 1}</div>
              <div className="item_info">
                <p className="item_name">{rec.name}</p>
                <p className="item_address">{rec.address}</p>
                <span className="item_benefit">{rec.benefit}</span>
              </div>
              <div className="item_dots">...</div>
            </li>
          ))}
        </ul>
        <div className="list_footer">
          <BoxButton bgColor="--main-color" height="60px">
            결정하기
          </BoxButton>
        </div>
      </div>
      <div className="recsResult_map">
        <NaverMap recommendations={recommendations} />
      </div>
    </section>
  );
};

export default RecsResult;
