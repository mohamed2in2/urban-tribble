function Header({ onLogoClick }) {
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="logo" onClick={onLogoClick} role="button" tabIndex={0} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onLogoClick()}>
          🎬 MovieApp
        </h1>
        <p className="tagline">Discover your next favourite film</p>
      </div>
    </header>
  );
}

export default Header;
