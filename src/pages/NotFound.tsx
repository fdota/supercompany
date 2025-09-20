import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="split-screen">
      <div className="split-left">
        <div className="flex flex-col justify-center h-full text-center">
          <h1 className="font-pixel text-4xl text-magenta mb-8">404</h1>
          <p className="font-mono text-left-color mb-8">Pagina non trovata</p>
        </div>
      </div>
      <div className="split-right">
        <div className="flex flex-col justify-center h-full text-center">
          <p className="font-mono text-right-color mb-8">Ops! La pagina che cerchi non esiste.</p>
          <a href="/" className="text-supercompany-magenta underline hover:text-supercompany-green font-mono transition-colors">
            {">"} Torna alla Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
