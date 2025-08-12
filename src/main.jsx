import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';
import Home from './page/Home.jsx';
import Benefix from './page/Benefix.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/benefix" element={<Benefix />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
