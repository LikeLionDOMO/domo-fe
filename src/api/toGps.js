export const addressToCoords = async (address) => {
  return new Promise((resolve, reject) => {
    window.naver.maps.Service.geocode({ query: address }, (status, response) => {
      if (status === window.naver.maps.Service.Status.ERROR) {
        reject(new Error("네이버 지오코딩 서비스 에러"));
        return;
      }
      if (response.v2.meta.totalCount === 0) {
        reject(new Error("주소 검색 결과가 없습니다."));
        return;
      }
      const item = response.v2.addresses[0];
      const coords = {
        lat: parseFloat(item.y),
        lng: parseFloat(item.x),
      };
      resolve(coords);
    });
  });
};

export const coordsToAddress = async (lat, lng) => {
  return new Promise((resolve, reject) => {
    window.naver.maps.Service.reverseGeocode(
      {
        coords: new window.naver.maps.LatLng(lat, lng),
        orders: [window.naver.maps.Service.OrderType.ADDR, window.naver.maps.Service.OrderType.ROAD_ADDR].join(","),
      },
      (status, response) => {
        if (status === window.naver.maps.Service.Status.ERROR) {
          reject(new Error("네이버 역지오코딩 서비스 에러"));
          return;
        }
        if (response.v2.results.length === 0) {
          reject(new Error("좌표 검색 결과가 없습니다."));
          return;
        }
        const results = response.v2.results;
        let roadAddress = "";
        let jibunAddress = "";
        const roadResult = results.find((item) => item.name === "roadaddr");
        if (roadResult && roadResult.region) {
          roadAddress =
            roadResult.region.area1.name +
            " " +
            roadResult.region.area2.name +
            " " +
            roadResult.region.area3.name +
            " " +
            roadResult.land.name +
            " " +
            roadResult.land.number1;
          if (roadResult.land.number2) {
            roadAddress += "-" + roadResult.land.number2;
          }
        }
        const addrResult = results.find((item) => item.name === "addr");
        if (addrResult && addrResult.region) {
          jibunAddress =
            addrResult.region.area1.name +
            " " +
            addrResult.region.area2.name +
            " " +
            addrResult.region.area3.name +
            " " +
            addrResult.land.name +
            " " +
            addrResult.land.number1;
          if (addrResult.land.number2) {
            jibunAddress += "-" + addrResult.land.number2;
          }
        }
        const addresses = {
          roadAddress: roadAddress.trim(),
          jibunAddress: jibunAddress.trim(),
          area1: addrResult?.region?.area1?.name || "",
          area2: addrResult?.region?.area2?.name || "",
          area3: addrResult?.region?.area3?.name || "",
        };
        resolve(addresses);
      }
    );
  });
};
