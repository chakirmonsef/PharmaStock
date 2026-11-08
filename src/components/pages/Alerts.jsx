import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellRing, Check, CheckCircle2, Hourglass, Package } from 'lucide-react';
import { Heading, Stat, Status } from '../common/PageUI';
import '../common/workspaces.css';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'Rupture imminente',
      product: 'Oméprazole 20 mg',
      sku: 'OME-020',
      detail: '18 unités restantes · seuil à 25',
      date: "Aujourd'hui",
      level: 'Élevée',
    },
    {
      id: 2,
      type: 'Péremption proche',
      product: 'Amoxicilline 500 mg',
      sku: 'AMX-500',
      detail: 'Lot LOT-26081 · expire le 21 nov. 2026',
      date: 'Dans 13 jours',
      level: 'Élevée',
    },
    {
      id: 3,
      type: 'Stock faible',
      product: 'Paracétamol 1 g',
      sku: 'PAR-1000',
      detail: '34 unités restantes · seuil à 50',
      date: "Aujourd'hui",
      level: 'Moyenne',
    },
    {
      id: 4,
      type: 'Péremption proche',
      product: 'Paracétamol 1 g',
      sku: 'PAR-1000',
      detail: 'Lot LOT-26094 · expire le 03 déc. 2026',
      date: 'Dans 25 jours',
      level: 'Moyenne',
    },
  ]);
  const [filter, setFilter] = useState('Toutes');
  const [done, setDone] = useState([]);
  const filtered = alerts.filter((a) => filter === 'Toutes' || a.level === filter);
  return (
    <main className="workspace-page">
      <Heading
        title="Centre d'alertes"
        subtitle="Agissez sur les ruptures et surveillez les dates de péremption."
        action={{
          label: 'Tout acquitter',
          onClick: () => {
            setDone(alerts.map((a) => a.id));
            setAlerts([]);
          },
        }}
        icon={Check}
      />
      <div className="workspace-stats">
        <Stat
          label="Alertes actives"
          value={alerts.length}
          detail="Nécessitent votre attention"
          icon={BellRing}
          tone="red"
        />
        <Stat
          label="Stock faible"
          value="14"
          detail="Produits sous le seuil"
          icon={Package}
          tone="orange"
        />
        <Stat
          label="Péremption < 30 jours"
          value="8"
          detail="Lots à écouler en priorité"
          icon={Hourglass}
        />
        <Stat
          label="Résolues aujourd'hui"
          value={done.length}
          detail="Alertes acquittées"
          icon={CheckCircle2}
          tone="blue"
        />
      </div>
      <div className="alert-filters">
        {['Toutes', 'Élevée', 'Moyenne'].map((f) => (
          <button
            className={filter === f ? 'filter-chip selected' : 'filter-chip'}
            onClick={() => setFilter(f)}
            key={f}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="alert-list">
        {filtered.map((a) => (
          <article className="alert-row" key={a.id}>
            <span className={`alert-symbol ${a.level === 'Élevée' ? 'high' : 'medium'}`}>
              <BellRing size={18} />
            </span>
            <div className="alert-copy">
              <div>
                <Status>{a.level}</Status>
                <span className="alert-kind">{a.type}</span>
              </div>
              <h3>{a.product}</h3>
              <p>{a.detail}</p>
            </div>
            <span className="alert-date">{a.date}</span>
            <div className="alert-actions">
              {a.type.includes('Stock') || a.type.includes('Rupture') ? (
                <Link className="text-action" to="/purchases">
                  Commander
                </Link>
              ) : (
                <Link className="text-action" to="/stock">
                  Voir le lot
                </Link>
              )}
              <button
                className="icon-button"
                title="Acquitter"
                onClick={() => {
                  setDone((d) => [...d, a.id]);
                  setAlerts((al) => al.filter((x) => x.id !== a.id));
                }}
              >
                <Check size={17} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
