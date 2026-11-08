import { Search, ArrowLeftRight, Bell, User, Moon, Sun } from 'lucide-react';

function Header({ theme, onToggleTheme }) {
  return (
    <header className="header-bar">
      <div className="search-box">
        <Search />
        <input type="search" placeholder="Rechercher médicaments, lots, SKU…" />
      </div>

      <button className="pharmacist-button">
        <ArrowLeftRight />
        <span>Pharmacien</span>
      </button>

      <button
        className="theme-toggle"
        type="button"
        onClick={onToggleTheme}
        aria-label={theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}
        title={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
      >
        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
      </button>

      <button className="notification-button" aria-label="Notifications">
        <Bell />
      </button>

      <button className="profile-button">
        <div className="profile-info">
          <span>Sarah J.</span>
          <span>Pharmacien</span>
        </div>
        <User />
      </button>
    </header>
  );
}
export default Header;
