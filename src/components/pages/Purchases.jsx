import { useState } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Filter,
  Plus,
  Truck,
} from 'lucide-react';
import { Heading, Stat, SearchTools, Table, Status, Overlay, Field } from '../common/PageUI';
import { initialOrders, currency } from '../common/pageData';
import '../common/workspaces.css';

export default function PurchasesPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState('');
  const create = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setOrders((o) => [
      {
        id: `CMD-2026-${String(49 + o.length - initialOrders.length).padStart(3, '0')}`,
        supplier: d.get('supplier'),
        date: '08 nov. 2026',
        lines: Number(d.get('lines')),
        amount: Number(d.get('amount')),
        status: 'Brouillon',
      },
      ...o,
    ]);
    setModal(false);
    setToast('Commande créée avec succès');
    setTimeout(() => setToast(''), 2600);
  };
  const filtered = orders.filter((o) =>
    `${o.id} ${o.supplier}`.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <main className="workspace-page">
      <Heading
        title="Achats & fournisseurs"
        subtitle="Créez vos commandes et suivez chaque réception fournisseur."
        action={{ label: 'Nouvelle commande', onClick: () => setModal(true) }}
        icon={Plus}
      />
      <div className="workspace-stats">
        <Stat
          label="Commandes ouvertes"
          value={orders.filter((o) => o.status !== 'Reçue').length}
          detail="Toutes périodes"
          icon={ClipboardList}
        />
        <Stat
          label="En attente de réception"
          value={orders.filter((o) => o.status === 'À recevoir').length}
          detail="À contrôler à la livraison"
          icon={Truck}
          tone="orange"
        />
        <Stat
          label="Dépenses du mois"
          value={currency(42860)}
          detail="+8,2 % sur le mois dernier"
          icon={CircleDollarSign}
          tone="blue"
        />
        <Stat
          label="Fournisseurs actifs"
          value="12"
          detail="2 commandes à relancer"
          icon={Building2}
          tone="purple"
        />
      </div>
      <section className="workspace-panel">
        <div className="section-heading">
          <div>
            <h2>Commandes d'achat</h2>
            <p>Suivi des commandes récentes et de leur réception.</p>
          </div>
          <button className="quiet-button">
            <Filter size={14} /> Filtrer
          </button>
        </div>
        <SearchTools
          value={query}
          onChange={setQuery}
          placeholder="Rechercher une commande ou un fournisseur"
        />
        <Table
          columns={[
            { key: 'id', label: 'COMMANDE', render: (r) => <strong>{r.id}</strong> },
            { key: 'supplier', label: 'FOURNISSEUR' },
            { key: 'date', label: 'DATE' },
            { key: 'lines', label: 'ARTICLES', render: (r) => `${r.lines} articles` },
            {
              key: 'amount',
              label: 'MONTANT',
              render: (r) => <strong>{currency(r.amount)}</strong>,
            },
            { key: 'status', label: 'STATUT', render: (r) => <Status>{r.status}</Status> },
            {
              key: 'action',
              label: 'ACTION',
              render: (r) =>
                r.status === 'À recevoir' ? (
                  <button
                    className="text-action"
                    onClick={() =>
                      setOrders((o) =>
                        o.map((x) => (x.id === r.id ? { ...x, status: 'Reçue' } : x))
                      )
                    }
                  >
                    <Check size={14} /> Réceptionner
                  </button>
                ) : (
                  <button className="icon-button" aria-label="Détails">
                    <ArrowRight size={16} />
                  </button>
                ),
            },
          ]}
          rows={filtered}
        />
      </section>
      {toast && (
        <div className="toast">
          <CheckCircle2 size={17} />
          {toast}
        </div>
      )}
      {modal && (
        <Overlay
          title="Créer une commande fournisseur"
          onClose={() => setModal(false)}
          onSubmit={create}
          submit="Créer la commande"
        >
          <Field label="Fournisseur">
            <select name="supplier">
              <option>PharmaDistrib</option>
              <option>Atlas Médical</option>
              <option>Santé Plus</option>
            </select>
          </Field>
          <Field label="Nombre d'articles">
            <input name="lines" type="number" min="1" defaultValue="1" required />
          </Field>
          <Field label="Montant estimé (MAD)">
            <input name="amount" type="number" min="0" step="0.01" required placeholder="0,00" />
          </Field>
        </Overlay>
      )}
    </main>
  );
}
