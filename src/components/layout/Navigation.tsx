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
        <Link to="/" className="font-pixel text-sm hover:text-green transition-colors">
          <span className="text-magenta">supercompany</span><span className="text-green">.it</span>
        </Link>
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-link font-mono text-sm ${
                  location.pathname === item.path ? "text-magenta" : "text-left-color"
                }`}
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