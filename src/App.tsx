// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import HomePage from "@/pages/HomePage";
import ChiSonoPage from "@/pages/ChiSonoPage"; // Ora esiste e ha il nome corretto
import FaqPage from "@/pages/FaqPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-mono">
        <div className="split-screen">
          <div className="split-left">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <Navigation />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/chi-sono" element={<ChiSonoPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} /> {/* Gestisce tutte le altre pagine (404) */}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;