// NotFoundPage.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000); // 3초 후 홈으로 이동
  }, [navigate]);

  return (
    <div className="not-found">
      <h1>404</h1>
      <h3>페이지를 찾을 수 없습니다.</h3>
      <p>3초 후 홈으로 이동합니다...</p>
    </div>
  );
}

export default NotFoundPage;
