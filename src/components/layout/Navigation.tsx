import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const navItems = [
    { path: "/", label: "home" },
    { path: "/chi-sono", label: "chi_sono" },
    { path: "/faq", label: "faq" },
  ];

  return (
    <nav className="mb-8">
      <div className="flex flex-col md:flex-row items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        {/* 🎯 LOGO CON IMMAGINE PNG */}
        <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
          {/* LOGO - SOSTITUISCI "logo.png" SE HAI DATO UN NOME DIVERSO */}
          <img 
            src="/supercompany2original.png" 
            alt="Supercompany" 
            className="h-12 w-12" // Regola queste dimensioni se necessario
            style={{ 
              imageRendering: 'pixelated',
              filter: 'drop-shadow(1px 1px 0px #000)'
            }}
          />
          {/* TESTO LOGO (OPZIONALE - PUOI RIMUOVERLO SE IL LOGO CONTIENE GIÀ IL TESTO) */}
          <span className="font-pixel text-sm">
            <span className="text-magenta">supercompany</span>
            <span className="text-green">.it</span>
          </span>
        </Link>
        
        {/* MENU NAVIGAZIONE */}
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-link font-mono text-sm ${
                  location.pathname === item.path ? "text-magenta" : "text-left-color"
                } hover:text-green transition-colors`}
              >
                {">"} {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;