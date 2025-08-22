/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useMedia } from "../hook/useMedia";

const NaverMap = ({ recommendations }) => {
  useEffect(() => {
    if (!window.naver || !window.naver.maps) {
      console.error("Naver Maps API is not loaded.");
      return;
    }

    const mapOptions = {
      center: new window.naver.maps.LatLng(recommendations[0].lat, recommendations[0].lng),
      zoom: 15,
    };

    const map = new window.naver.maps.Map("map", mapOptions);

    recommendations.forEach((rec) => {
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(rec.lat, rec.lng),
        map: map,
      });
    });
  }, [recommendations]);

  // 미디어 쿼리 훅을 사용하여 PC 여부를 확인
  const isPc = useMedia().isPc;

  return <div id="map" style={{ width: "100%", height: isPc ? "100vh" : "60vh" }} />;
};

export default NaverMap;
