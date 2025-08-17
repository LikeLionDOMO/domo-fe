import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import Header from "./layout/Header.jsx";
import Footer from "./layout/Footer.jsx";
import Home from "./page/Home.jsx";
import Benefix from "./page/Benefix.jsx";
import Recs from "./page/Recs.jsx";
import RecsInfo from "./page/RecsInfo.jsx";
import ScrollToTop from "./hook/useScrollTop.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/benefix" element={<Benefix />} />

        {/* 추천받기 */}
        <Route path="/recs" element={<Recs />} />
        <Route path="/recs/info" element={<RecsInfo />} />
        {/* <Route path="/recs" element={<Recs />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
