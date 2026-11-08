import { useState } from 'react';
import {
  BellRing,
  CircleDollarSign,
  Download,
  Hourglass,
  Package,
  ShieldCheck,
} from 'lucide-react';
import { Heading, Stat, SearchTools, Table, Status } from '../common/PageUI';
import { initialLots, currency } from '../common/pageData';
import '../common/workspaces.css';

export default function LotsPage() {
  const [lots, setLots] = useState(initialLots);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Tous les lots');
  const visible = lots.filter(
    (l) =>
      `${l.id} ${l.product} ${l.sku}`.toLowerCase().includes(query.toLowerCase()) &&
      (filter === 'Tous les lots' || l.status === filter)
  );
  return (
    <main className="workspace-page">
      <Heading
        title="Stocks & lots FEFO"
        subtitle="Suivez les dates de péremption et servez en priorité les lots les plus anciens."
        action={{ label: 'Exporter', onClick: () => window.print() }}
        icon={Download}
      />
      <div className="workspace-stats">
        <Stat label="Lots actifs" value="247" detail="Dans 14 catégories" icon={Package} />
        <Stat
          label="À servir en priorité"
          value="12"
          detail="Péremption sous 30 jours"
          icon={Hourglass}
          tone="orange"
        />
        <Stat
          label="Lots expirés"
          value="3"
          detail="Mise en quarantaine requise"
          icon={BellRing}
          tone="red"
        />
        <Stat
          label="Valeur du stock"
          value={currency(124850)}
          detail="Valeur d'achat estimée"
          icon={CircleDollarSign}
          tone="blue"
        />
      </div>
      <section className="workspace-panel">
        <div className="section-heading">
          <div>
            <h2>Traçabilité des lots</h2>
            <p>Priorité FEFO : première date de péremption, première sortie.</p>
          </div>
          <span className="rule-pill">
            <ShieldCheck size={14} /> FEFO actif
          </span>
        </div>
        <SearchTools
          value={query}
          onChange={setQuery}
          placeholder="Nom du produit, SKU ou numéro de lot"
        >
          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>Tous les lots</option>
            <option>Expire bientôt</option>
            <option>À surveiller</option>
            <option>Conforme</option>
          </select>
        </SearchTools>
        <Table
          columns={[
            { key: 'id', label: 'N° DE LOT', render: (r) => <strong>{r.id}</strong> },
            {
              key: 'product',
              label: 'PRODUIT',
              render: (r) => (
                <div className="table-main">
                  {r.product}
                  <small>{r.sku}</small>
                </div>
              ),
            },
            { key: 'supplier', label: 'FOURNISSEUR' },
            { key: 'quantity', label: 'QUANTITÉ', render: (r) => `${r.quantity} unités` },
            {
              key: 'expiry',
              label: "DATE D'EXPIRATION",
              render: (r) => (
                <span className={r.status === 'Expire bientôt' ? 'text-danger' : ''}>
                  {new Date(r.expiry).toLocaleDateString('fr-FR')}
                </span>
              ),
            },
            { key: 'status', label: 'ÉTAT', render: (r) => <Status>{r.status}</Status> },
            {
              key: 'actions',
              label: 'ACTION',
              render: (r) => (
                <button
                  className="text-action"
                  onClick={() =>
                    setLots((ls) =>
                      ls.map((x) => (x.id === r.id ? { ...x, status: 'Conforme' } : x))
                    )
                  }
                >
                  Prioriser
                </button>
              ),
            },
          ]}
          rows={visible}
        />
      </section>
      <section className="workspace-panel fefo-explainer">
        <div className="fefo-number">FEFO</div>
        <div>
          <h3>First Expired, First Out</h3>
          <p>
            Lors d'une vente, PharmaStock recommande automatiquement le lot qui expire le plus tôt
            afin de limiter les pertes.
          </p>
        </div>
        <span className="online-dot">Règle en vigueur</span>
      </section>
    </main>
  );
}
