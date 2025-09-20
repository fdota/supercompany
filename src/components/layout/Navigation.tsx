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
      <div className="mb-6">
        <Link to="/" className="text-magenta font-pixel text-sm hover:text-green transition-colors">
          supercompany.it
        </Link>
      </div>
      <ul className="space-y-3">
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
    </nav>
  );
};

export default Navigation;