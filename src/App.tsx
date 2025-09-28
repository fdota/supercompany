import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/layout/Navigation";
import HomePage from "@/pages/HomePage";
import ChiSonoPage from "@/pages/ChiSonoPage";
import FaqPage from "@/pages/FaqPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy"; // 👈 IMPORT AGGIUNTO

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-mono">
        <div className="split-screen">
          <div className="split-left">
            <div className="max-w-7xl mx-auto">
              <Navigation />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/chi-sono" element={<ChiSonoPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} /> {/* 👈 ROUTE AGGIUNTA */}
              </Routes>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;