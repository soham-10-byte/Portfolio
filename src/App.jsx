import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Development from '@/pages/Development';
import DevelopmentDetail from '@/pages/DevelopmentDetail';
import Marketing from '@/pages/Marketing';
import MarketingDetail from '@/pages/MarketingDetail';
import NotFound from '@/pages/NotFound';

/**
 * Root Application Component
 * Sets up BrowserRouter and routes according to specifications:
 * - /                    Home (single scrolling page)
 * - /development         Development portfolio page
 * - /development/:slug    Development case study
 * - /marketing           Marketing portfolio page
 * - /marketing/:slug      Marketing case study
 * - *                    404 Page
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="development" element={<Development />} />
          <Route path="development/:slug" element={<DevelopmentDetail />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="marketing/:slug" element={<MarketingDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
