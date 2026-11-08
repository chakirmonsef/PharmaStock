import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Archive,
  ArrowRight,
  BellRing,
  Clock3,
  Package,
  Plus,
  ShoppingCart,
  TrendingUp,
  TriangleAlert,
} from 'lucide-react';
import Card from '../common/StateCard';
import './Dashboard.css';

const trend = [
  { day: 'Lun', sales: 4200 },
  { day: 'Mar', sales: 5600 },
  { day: 'Mer', sales: 4900 },
  { day: 'Jeu', sales: 7100 },
  { day: 'Ven', sales: 6300 },
  { day: 'Sam', sales: 8900 },
  { day: 'Dim', sales: 6800 },
];
const fmt = (n) => `${n.toLocaleString('fr-MA')} MAD`;

export default function Dashboard() {
  return (
    <main className="dashboard-page">
      <div className="page-heading">
        <div>
          <h1>
            Bonjour Sarah <span className="wave">✦</span>
          </h1>
          <p>Voici le résumé de votre officine pour aujourd'hui, dimanche 8 novembre.</p>
        </div>
        <Link className="date-pill" to="/reports">
          <Clock3 size={15} /> Cette semaine
        </Link>
      </div>
      <div className="card-container">
        <Card
          titre="RÉFÉRENCES EN STOCK"
          valeur="1 482"
          description="12 nouvelles ce mois"
          icone={<Archive size={19} />}
          variant="blue"
        />
        <Card
          titre="STOCK FAIBLE"
          valeur="14"
          description="À réapprovisionner"
          icone={<TriangleAlert size={19} />}
          variant="red"
        />
        <Card
          titre="LOTS À SURVEILLER"
          valeur="8"
          description="Expiration sous 30 jours"
          icone={<Clock3 size={19} />}
          variant="gray"
        />
        <Card
          titre="VENTES DU JOUR"
          valeur="6 840 MAD"
          description="+12 % vs. hier"
          icone={<TrendingUp size={19} />}
          variant="teal"
        />
      </div>
      <div className="dashboard-overview">
        <section className="panel dashboard-chart">
          <div className="panel-heading">
            <div>
              <h2>Activité des ventes</h2>
              <p className="panel-subtitle">Chiffre d'affaires · 7 derniers jours</p>
            </div>
            <Link className="mini-link" to="/reports">
              Voir le rapport <ArrowRight size={13} />
            </Link>
          </div>
          <div className="dashboard-chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ top: 8, right: 10, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="dashSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#087f70" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#087f70" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#edf1f0" vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#849196' }}
                />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: '#849196' }} />
                <Tooltip formatter={(v) => fmt(v)} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  name="Ventes"
                  stroke="#087f70"
                  strokeWidth={2.5}
                  fill="url(#dashSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="panel quick-panel">
          <div className="panel-heading">
            <div>
              <h2>Raccourcis</h2>
              <p className="panel-subtitle">Accès rapide aux opérations</p>
            </div>
          </div>
          <Link className="quick-action" to="/sales">
            <span>
              <ShoppingCart size={17} />
            </span>
            <div>
              <strong>Nouvelle vente</strong>
              <small>Ouvrir le point de vente</small>
            </div>
            <ArrowRight size={15} />
          </Link>
          <Link className="quick-action" to="/medicines">
            <span>
              <Plus size={17} />
            </span>
            <div>
              <strong>Ajouter un produit</strong>
              <small>Mettre à jour le catalogue</small>
            </div>
            <ArrowRight size={15} />
          </Link>
          <Link className="quick-action" to="/purchases">
            <span>
              <Package size={17} />
            </span>
            <div>
              <strong>Créer une commande</strong>
              <small>Réapprovisionner le stock</small>
            </div>
            <ArrowRight size={15} />
          </Link>
          <Link className="quick-action" to="/alerts">
            <span>
              <BellRing size={17} />
            </span>
            <div>
              <strong>Voir les alertes</strong>
              <small>22 éléments à vérifier</small>
            </div>
            <ArrowRight size={15} />
          </Link>
        </section>
      </div>
      <div className="dashboard-bottom">
        <section className="panel dashboard-alerts">
          <div className="panel-heading">
            <div>
              <h2>Alertes à traiter</h2>
              <p className="panel-subtitle">Produits nécessitant une attention</p>
            </div>
            <Link className="mini-link" to="/alerts">
              Tout voir <ArrowRight size={13} />
            </Link>
          </div>
          <div className="dashboard-alert-row">
            <span className="alert-icon red">
              <TriangleAlert size={16} />
            </span>
            <div>
              <strong>Oméprazole 20 mg</strong>
              <small>18 unités restantes · seuil minimum : 25</small>
            </div>
            <Link to="/purchases">Commander</Link>
          </div>
          <div className="dashboard-alert-row">
            <span className="alert-icon orange">
              <Clock3 size={16} />
            </span>
            <div>
              <strong>Amoxicilline 500 mg</strong>
              <small>Lot LOT-26081 · expire dans 13 jours</small>
            </div>
            <Link to="/stock">Voir le lot</Link>
          </div>
          <div className="dashboard-alert-row">
            <span className="alert-icon orange">
              <TriangleAlert size={16} />
            </span>
            <div>
              <strong>Paracétamol 1 g</strong>
              <small>34 unités restantes · seuil minimum : 50</small>
            </div>
            <Link to="/purchases">Commander</Link>
          </div>
        </section>
        <section className="panel dashboard-recent">
          <div className="panel-heading">
            <div>
              <h2>Ventes récentes</h2>
              <p className="panel-subtitle">Dernières transactions enregistrées</p>
            </div>
            <Link className="mini-link" to="/sales">
              Historique <ArrowRight size={13} />
            </Link>
          </div>
          <div className="recent-sale">
            <span className="sale-avatar">AM</span>
            <div>
              <strong>Amoxicilline 500 mg</strong>
              <small>Vente #V-2086 · 10:42</small>
            </div>
            <b>{fmt(126)}</b>
          </div>
          <div className="recent-sale">
            <span className="sale-avatar blue">PC</span>
            <div>
              <strong>Paracétamol Extra</strong>
              <small>Vente #V-2085 · 10:18</small>
            </div>
            <b>{fmt(74)}</b>
          </div>
          <div className="recent-sale">
            <span className="sale-avatar orange">VC</span>
            <div>
              <strong>Vitamine C Ascorbate</strong>
              <small>Vente #V-2084 · 09:56</small>
            </div>
            <b>{fmt(108)}</b>
          </div>
          <Link className="pos-link" to="/sales">
            Ouvrir le point de vente <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </main>
  );
}
