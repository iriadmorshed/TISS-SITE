import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CMSProvider } from './context/CMSContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AdminBar } from './components/admin/AdminBar';
import { ScrollToTop } from './components/common/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { BusinessesPage } from './pages/BusinessesPage';
import { BusinessDetailPage } from './pages/BusinessDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { GlobalPresencePage } from './pages/GlobalPresencePage';
import { JourneyPage } from './pages/JourneyPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminPage } from './pages/AdminPage';
import { CustomPageView } from './pages/CustomPageView';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <CMSProvider>
      <Router>
        <ScrollToTop />
        <AdminBar />
        <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-900">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/businesses" element={<BusinessesPage />} />
              <Route path="/businesses/:slug" element={<BusinessDetailPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/global-presence" element={<GlobalPresencePage />} />
              <Route path="/journey" element={<JourneyPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/pages/:slug" element={<CustomPageView />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CMSProvider>
  );
}
