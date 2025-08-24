/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useMedia } from "../hook/useMedia";

// center: { lat, lng } 형태의 prop 추가
const NaverMap = ({ recommendations, center }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.naver || !window.naver.maps) {
      console.error("Naver Maps API is not loaded.");
      return;
    }

    // center prop이 있으면 center, 없으면 recommendations[0]
    const initialCenter = center
      ? new window.naver.maps.LatLng(center.lat, center.lng)
      : new window.naver.maps.LatLng(recommendations[0].lat, recommendations[0].lng);

    const mapOptions = {
      center: initialCenter,
      zoom: 15,
    };

    mapRef.current = new window.naver.maps.Map("map", mapOptions);

    recommendations.forEach((rec) => {
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(rec.lat, rec.lng),
        map: mapRef.current,
      });
    });
  }, [recommendations]);

  // center가 변경될 때마다 지도 중심 이동
  useEffect(() => {
    if (!mapRef.current || !center) return;
    mapRef.current.setCenter(new window.naver.maps.LatLng(center.lat, center.lng));
  }, [center]);

  // 미디어 쿼리 훅을 사용하여 PC 여부를 확인
  const isPc = useMedia().isPc;

  return <div id="map" style={{ width: "100%", height: isPc ? "100vh" : "60vh" }} />;
};

export default NaverMap;
