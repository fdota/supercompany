import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="mb-8">
      <div className="flex flex-col md:flex-row items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        {/* LOGO */}
        <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-200">
          <img 
            src="/supercompany2original.png" 
            alt="Supercompany" 
            className="logo-nav"
          />
        </Link>
        
        {/* MENU NAVIGAZIONE */}
        <ul className="flex space-x-6">
          <li>
            <Link 
              to="/" 
              className={`nav-link font-mono text-sm ${
                location.pathname === "/" ? "text-magenta" : "text-left-color"
              } hover:text-green transition-colors`}
            >
              {">"} home
            </Link>
          </li>
          <li>
            <a 
              href="/privacy-policy.html" 
              className="nav-link font-mono text-sm text-left-color hover:text-green transition-colors"
            >
              {">"} privacy
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;