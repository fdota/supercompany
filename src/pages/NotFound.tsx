// src/pages/NotFound.tsx

import SplitLayout from "@/components/layout/SplitLayout";
import Navigation from "@/components/layout/Navigation"; // <-- AGGIUNTO
import { Link } from "react-router-dom"; // <-- AGGIUNTO

const NotFound = () => {
  const leftContent = (
    <>
      <Navigation /> {/* <-- AGGIUNTO */}
      <div className="flex flex-col justify-center h-full text-center p-4">
        <h1 className="font-pixel text-4xl text-magenta mb-8">404</h1>
        <p className="font-mono text-left-color mb-8">Pagina non trovata</p>
      </div>
    </>
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full text-center p-4">
      <p className="font-mono text-right-color mb-8">Ops! La pagina che cerchi non esiste.</p>
      <Link to="/" className="text-supercompany-magenta underline hover:text-supercompany-green font-mono transition-colors">
        {">"} Torna alla Home
      </Link>
    </div>
  );

  return <SplitLayout leftContent={leftContent} rightContent={rightContent} />;
};

export default NotFound;