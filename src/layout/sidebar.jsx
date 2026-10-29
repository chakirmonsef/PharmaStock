import { NavLink } from "react-router-dom";
import "./Sidebar.css";
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
} from "lucide-react";


const menuItems = [
  { name: "Tableau de bord", path: "/", icon: LayoutDashboard },
  { name: "Stock / Catalogue", path: "/medicines", icon: Archive },
  { name: "Stocks & Lots FEFO", path: "/stock", icon: Hourglass },
  { name: "Achats", path: "/purchases", icon: ShoppingCart },
  { name: "Ventes POS", path: "/sales", icon: Calculator },
  { name: "Alertes", path: "/alerts", icon: BellRing },
  { name: "Rapports", path: "/reports", icon: ChartNoAxesColumn },
  { name: "Administration", path: "/users", icon: ShieldUser },
];



function Sidebar() {
  return (
    <aside className="sidebar">
      <h1>PharmaStock</h1>

      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <button className="logout">
        <LogOut size={20} />
        Déconnexion
      </button>
    </aside>
  );
}

export default Sidebar;
