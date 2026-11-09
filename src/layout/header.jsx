import { Search, ArrowLeftRight, Bell, User, Moon, Sun, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        aria-label={`Changer de thème (${theme === 'light' ? 'professionnel' : theme === 'professional' ? 'sombre' : 'clair'})`}
        title={`Thème ${theme === 'light' ? 'clair' : theme === 'professional' ? 'professionnel' : 'sombre'}`}
      >
        {theme === 'dark' ? <Sun size={17} /> : theme === 'professional' ? <Palette size={17} /> : <Moon size={17} />}
      </button>

      <button className="notification-button" aria-label="Notifications">
        <Bell />
      </button>

      <Link className="profile-button" to="/settings?tab=Compte" aria-label="Ouvrir le profil">
        <div className="profile-info">
          <span>Sarah J.</span>
          <span>Pharmacien</span>
        </div>
        <User />
      </Link>
    </header>
  );
}
export default Header;
