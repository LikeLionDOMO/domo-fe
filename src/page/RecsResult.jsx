import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './styles/recsResult.css';
import NaverMap from '../component/NaverMap';
import { useState } from 'react';
import Popover from '../component/Popover';

const RecsResult = () => {
  const location = useLocation();
  const nav = useNavigate();
  const recommendations = location.state?.recommendations || [];
  const [popoverData, setPopoverData] = useState(null);

  if (recommendations.length === 0) {
    return (
      <>
        <div className="recsResult_fallback">
          <p>추천 정보를 불러오지 못했습니다.</p>
          <button onClick={() => nav('/recs/info')}>다시 추천받기</button>
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

  return (
    <section className="recsResultPage">
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
          <button className="list_header_backBtn">되돌리기</button>
        </div>
        <ul className="list_items">
          {recommendations.map((rec, index) => (
            <li key={rec.id} className="list_item">
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

              <div
                className="item_dots"
                onClick={(event) => handleTogglePopover(rec, event)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </li>
          ))}
        </ul>
        <div className="list_footer">
          <button className="list_footer-btn">결정하기</button>
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
