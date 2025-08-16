import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import "./styles/recsLoading.css";

const RecsLoading = () => {
  return (
    <div className="recsLoading">
      <h2>
        현재 위치를 기반으로
        <br />
        도모가 최적의 동네 놀거리를 찾고 있습니다...
      </h2>
      {/* 로딩바 */}
      <Box className="loadingBar" sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>

      <div>{/* 이미지 */}</div>
    </div>
  );
};
export default RecsLoading;
