import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Archive,
  Hourglass,
  ShoppingCart,
  BellRing,
  ChartNoAxesColumn,
  ShieldUser,
  LogOut,
  Calculator,
  Pill,
  Building2,
  Settings,
} from 'lucide-react';

const menuItems = [
  { name: 'Tableau de bord', path: '/', icon: LayoutDashboard },
  { name: 'Stock / Catalogue', path: '/medicines', icon: Archive },
  { name: 'Stocks & Lots FEFO', path: '/stock', icon: Hourglass },
  { name: 'Achats', path: '/purchases', icon: ShoppingCart },
  { name: 'Ventes POS', path: '/sales', icon: Calculator },
  { name: 'Alertes', path: '/alerts', icon: BellRing },
  { name: 'Rapports', path: '/reports', icon: ChartNoAxesColumn },
  { name: 'Administration', path: '/users', icon: ShieldUser },
  { name: 'Fournisseurs', path: '/suppliers', icon: Building2 },
  { name: 'Paramètres', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">
          <Pill size={19} />
        </span>
        <h1>
          Pharma<span>Stock</span>
        </h1>
      </div>
      <p className="nav-label">ESPACE DE TRAVAIL</p>
      <nav>
        {menuItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
          >
            <Icon size={18} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-foot">
        <strong>PharmaStock Pro</strong>Gestion intelligente de votre officine
      </div>
      <Link className="logout" to="/">
        <LogOut size={18} />
        Déconnexion
      </Link>
    </aside>
  );
}
