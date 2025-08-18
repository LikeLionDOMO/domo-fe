/* eslint-disable react/prop-types */
import { useEffect } from 'react';

const NaverMap = ({ recommendations }) => {
  useEffect(() => {
    if (!window.naver || !window.naver.maps) {
      console.error('Naver Maps API is not loaded.');
      return;
    }

    const mapOptions = {
      center: new window.naver.maps.LatLng(
        recommendations[0].lat,
        recommendations[0].lng
      ),
      zoom: 15,
    };

    const map = new window.naver.maps.Map('map', mapOptions);

    recommendations.forEach((rec) => {
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(rec.lat, rec.lng),
        map: map,
      });
    });
  }, [recommendations]);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default NaverMap;
