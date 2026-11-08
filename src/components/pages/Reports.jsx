import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Activity,
  CircleDollarSign,
  Download,
  FileBarChart,
  Package,
  ShoppingCart,
} from 'lucide-react';
import { Heading, Stat } from '../common/PageUI';
import { currency, salesData } from '../common/pageData';
import '../common/workspaces.css';

export default function ReportsPage() {
  const [period, setPeriod] = useState('7 derniers jours');
  const bars = [
    { name: 'Paracétamol', value: 28 },
    { name: 'Amoxicilline', value: 21 },
    { name: 'Ibuprofène', value: 18 },
    { name: 'Vitamine C', value: 14 },
    { name: 'Oméprazole', value: 11 },
  ];
  return (
    <main className="workspace-page">
      <Heading
        title="Rapports & analyses"
        subtitle="Une vue claire sur les ventes, les stocks et la performance de votre officine."
        action={{ label: 'Exporter le rapport', onClick: () => window.print() }}
        icon={Download}
      />
      <div className="report-toolbar">
        <span>
          <FileBarChart size={16} /> Vue d'ensemble
        </span>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option>7 derniers jours</option>
          <option>30 derniers jours</option>
          <option>Cette année</option>
        </select>
      </div>
      <div className="workspace-stats">
        <Stat
          label="Chiffre d'affaires"
          value={currency(42860)}
          detail="+12,8 % sur la période précédente"
          icon={CircleDollarSign}
        />
        <Stat
          label="Ventes réalisées"
          value="286"
          detail="+8,4 % sur la période précédente"
          icon={ShoppingCart}
          tone="blue"
        />
        <Stat
          label="Marge estimée"
          value="31,6 %"
          detail="Marge moyenne des ventes"
          icon={Activity}
          tone="purple"
        />
        <Stat
          label="Valeur du stock"
          value={currency(124850)}
          detail="Sur 1 482 références"
          icon={Package}
          tone="orange"
        />
      </div>
      <div className="report-grid">
        <section className="workspace-panel chart-panel">
          <div className="section-heading">
            <div>
              <h2>Évolution du chiffre d'affaires</h2>
              <p>{period} · comparaison par jour</p>
            </div>
            <span className="chart-legend">
              <i /> Ventes
            </span>
          </div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#087f70" stopOpacity={0.2} />
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
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#849196' }} />
                <Tooltip formatter={(v) => currency(v)} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  name="Ventes"
                  stroke="#087f70"
                  strokeWidth={2.5}
                  fill="url(#salesFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="workspace-panel chart-panel">
          <div className="section-heading">
            <div>
              <h2>Ventes par catégorie</h2>
              <p>Répartition des ventes</p>
            </div>
          </div>
          <div className="chart-box pie-box">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Médicaments', value: 54 },
                    { name: 'Antibiotiques', value: 22 },
                    { name: 'Compléments', value: 15 },
                    { name: 'Autres', value: 9 },
                  ]}
                  dataKey="value"
                  innerRadius={58}
                  outerRadius={86}
                  paddingAngle={3}
                >
                  {['#087f70', '#56b99c', '#92cdb7', '#e4eeea'].map((c) => (
                    <Cell key={c} fill={c} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-center">
              <strong>286</strong>
              <span>ventes</span>
            </div>
          </div>
          <div className="legend-list">
            <span>
              <i style={{ background: '#087f70' }} />
              Médicaments <b>54%</b>
            </span>
            <span>
              <i style={{ background: '#56b99c' }} />
              Antibiotiques <b>22%</b>
            </span>
            <span>
              <i style={{ background: '#92cdb7' }} />
              Compléments <b>15%</b>
            </span>
            <span>
              <i style={{ background: '#e4eeea' }} />
              Autres <b>9%</b>
            </span>
          </div>
        </section>
        <section className="workspace-panel chart-panel full-chart">
          <div className="section-heading">
            <div>
              <h2>Produits les plus vendus</h2>
              <p>Unités vendues sur la période sélectionnée</p>
            </div>
          </div>
          <div className="chart-box short-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars} layout="vertical" margin={{ left: 18, right: 20 }}>
                <CartesianGrid stroke="#edf1f0" horizontal={false} />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#849196' }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={110}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: '#596a6f' }}
                />
                <Tooltip />
                <Bar
                  dataKey="value"
                  name="Unités vendues"
                  fill="#087f70"
                  radius={[0, 5, 5, 0]}
                  barSize={16}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </main>
  );
}
