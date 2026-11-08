import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/pages/Dashboard.jsx';
import Stock from '../components/pages/Stock.jsx';
import LotsPage from '../components/pages/Lots.jsx';
import PurchasesPage from '../components/pages/Purchases.jsx';
import SalesPage from '../components/pages/Sales.jsx';
import AlertsPage from '../components/pages/Alerts.jsx';
import ReportsPage from '../components/pages/Reports.jsx';
import UsersPage from '../components/pages/Users.jsx';
import SuppliersPage from '../components/pages/Suppliers.jsx';
import SettingsPage from '../components/pages/Settings.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/medicines" element={<Stock />} />
      <Route path="/stock" element={<LotsPage />} />
      <Route path="/purchases" element={<PurchasesPage />} />
      <Route path="/sales" element={<SalesPage />} />
      <Route path="/alerts" element={<AlertsPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/suppliers" element={<SuppliersPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}
