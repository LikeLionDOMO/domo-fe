import { useState, useEffect } from 'react';

const useIsMobile = (query = '(max-width: 500px)') => {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (e) => setIsMobile(e.matches);

    // Safari 13 이하 버전 호환성을 위해 addListener 사용
    try {
      mediaQuery.addEventListener('change', handleChange);
    } catch (e) {
      mediaQuery.addListener(handleChange);
    }

    // 초기 상태 설정
    setIsMobile(mediaQuery.matches);

    return () => {
      try {
        mediaQuery.removeEventListener('change', handleChange);
      } catch (e) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]);

  return isMobile;
};

export default useIsMobile;
