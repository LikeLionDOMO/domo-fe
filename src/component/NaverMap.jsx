/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { useMedia } from '../hook/useMedia';
import './styles/naverMap.css';

// center: { lat, lng } 형태의 prop 추가
const NaverMap = ({ recommendations, center }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const polylinesRef = useRef([]);

  useEffect(() => {
    if (!window.naver || !window.naver.maps) {
      console.error('Naver Maps API is not loaded.');
      return;
    }

    // center prop이 있으면 center, 없으면 recommendations[0]
    const initialCenter = center
      ? new window.naver.maps.LatLng(center.lat, center.lng)
      : new window.naver.maps.LatLng(
          recommendations[0].lat,
          recommendations[0].lng
        );

    const mapOptions = {
      center: initialCenter,
      zoom: 15,
    };

    mapRef.current = new window.naver.maps.Map('map', mapOptions);

    // 기존 마커와 선 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    polylinesRef.current.forEach((polyline) => polyline.setMap(null));
    markersRef.current = [];
    polylinesRef.current = [];

    // 번호 마커 생성
    recommendations.forEach((rec, index) => {
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.textContent = index + 1;

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(rec.lat, rec.lng),
        map: mapRef.current,
        icon: {
          content: markerElement,
          size: new window.naver.maps.Size(32, 32),
          anchor: new window.naver.maps.Point(16, 16),
        },
      });

      markersRef.current.push(marker);
    });

    // 연결선 생성 (순서대로 연결)
    if (recommendations.length > 1) {
      for (let i = 0; i < recommendations.length - 1; i++) {
        const current = recommendations[i];
        const next = recommendations[i + 1];

        const path = [
          new window.naver.maps.LatLng(current.lat, current.lng),
          new window.naver.maps.LatLng(next.lat, next.lng),
        ];

        const polyline = new window.naver.maps.Polyline({
          path: path,
          strokeColor: '#0052e9',
          strokeWeight: 4,
          strokeOpacity: 0.8,
          strokeStyle: 'solid',
          map: mapRef.current,
        });

        polylinesRef.current.push(polyline);
      }
    }

    // 지도 범위 조정 (모든 마커가 보이도록)
    if (recommendations.length > 0) {
      const bounds = new window.naver.maps.LatLngBounds();
      recommendations.forEach((rec) => {
        bounds.extend(new window.naver.maps.LatLng(rec.lat, rec.lng));
      });
      mapRef.current.fitBounds(bounds, 50); // 50px 여백
    }
  }, [recommendations, center]);

  // center가 변경될 때마다 지도 중심 이동
  useEffect(() => {
    if (!mapRef.current || !center) return;
    mapRef.current.setCenter(
      new window.naver.maps.LatLng(center.lat, center.lng)
    );
  }, [center]);

  // 미디어 쿼리 훅을 사용하여 PC 여부를 확인
  const isPc = useMedia().isPc;

  return (
    <div id="map" style={{ width: '100%', height: isPc ? '100vh' : '60vh' }} />
  );
};

export default NaverMap;
