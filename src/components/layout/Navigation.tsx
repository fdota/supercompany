import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const navItems = [
    { path: "/", label: "home" },
    { path: "/chi-sono", label: "chi_sono" },
    { path: "/faq", label: "faq" },
    { path: "/privacy", label: "privacy" },
  ];

  // Determina se siamo nella sezione hero per cambiare colore
  const isHeroSection = location.pathname === "/";

  return (
    <nav className="mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-start mb-6 space-y-4 md:space-y-0">
        {/* Logo a sinistra */}
        <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-200 mr-8">
          <img src="/supercompany2original.png" alt="Supercompany" className="logo-nav" />
        </Link>

        {/* Navigazione spostata a sinistra */}
        <ul className="flex flex-wrap space-x-6 ml-0">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-link font-mono text-sm ${
                  location.pathname === item.path 
                    ? "text-magenta" 
                    : isHeroSection 
                      ? "text-white" 
                      : "text-gray-800"
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