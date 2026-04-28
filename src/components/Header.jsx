import { Link, NavLink } from "react-router-dom";

function Header({ onLogoClick }) {
  return (
    <header className="header">
      <div className="header-inner">
        <Link className="logo" to="/" onClick={onLogoClick}>
          🎬 MovieApp KC
        </Link>
        <p className="tagline">A hand-built movie shelf for late-night browsing</p>
        <nav className="header-nav" aria-label="Main navigation">
          <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} onClick={onLogoClick} end>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
