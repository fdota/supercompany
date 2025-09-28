// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ChiSonoPage from "@/pages/ChiSonoPage";
import FaqPage from "@/pages/FaqPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import NotFound from "@/pages/NotFound";

function App() {
  // Questo componente ora gestisce SOLO il routing.
  // Il layout è delegato a ogni singola pagina.
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chi-sono" element={<ChiSonoPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;