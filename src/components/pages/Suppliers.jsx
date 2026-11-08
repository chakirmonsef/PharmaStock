import { useState } from 'react';
import { BellRing, Building2, Edit2, Plus, ShoppingCart, Truck } from 'lucide-react';
import { Heading, Stat, SearchTools, Table, Status, Overlay, Field } from '../common/PageUI';
import '../common/workspaces.css';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([
    {
      id: 'FOU-001',
      name: 'PharmaDistrib',
      contact: '+212 522 44 18 20',
      email: 'commandes@pharmadistrib.ma',
      orders: 18,
      delay: '2 jours',
      status: 'Actif',
    },
    {
      id: 'FOU-002',
      name: 'Atlas Médical',
      contact: '+212 535 62 04 10',
      email: 'contact@atlasmedical.ma',
      orders: 12,
      delay: '3 jours',
      status: 'Actif',
    },
    {
      id: 'FOU-003',
      name: 'Santé Plus',
      contact: '+212 537 71 23 65',
      email: 'achats@santeplus.ma',
      orders: 9,
      delay: '4 jours',
      status: 'Actif',
    },
    {
      id: 'FOU-004',
      name: 'BioPharma Maroc',
      contact: '+212 520 88 31 05',
      email: 'info@biopharma.ma',
      orders: 5,
      delay: '5 jours',
      status: 'À vérifier',
    },
  ]);
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(false);
  const create = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setSuppliers((s) => [
      {
        id: `FOU-${String(s.length + 1).padStart(3, '0')}`,
        name: d.get('name'),
        contact: d.get('contact'),
        email: d.get('email'),
        orders: 0,
        delay: 'À définir',
        status: 'Actif',
      },
      ...s,
    ]);
    setModal(false);
  };
  return (
    <main className="workspace-page">
      <Heading
        title="Fournisseurs"
        subtitle="Retrouvez vos partenaires d'approvisionnement et leur activité."
        action={{ label: 'Ajouter un fournisseur', onClick: () => setModal(true) }}
        icon={Plus}
      />
      <div className="workspace-stats">
        <Stat
          label="Fournisseurs actifs"
          value={suppliers.length}
          detail="Partenaires référencés"
          icon={Building2}
        />
        <Stat
          label="Commandes ce mois"
          value="24"
          detail="Auprès de 8 partenaires"
          icon={ShoppingCart}
          tone="blue"
        />
        <Stat
          label="Délai moyen"
          value="3,2 jours"
          detail="De la commande à  la réception"
          icon={Truck}
          tone="orange"
        />
        <Stat
          label="En attente de contrôle"
          value="1"
          detail="Coordonnées à  vérifier"
          icon={BellRing}
          tone="purple"
        />
      </div>
      <section className="workspace-panel">
        <div className="section-heading">
          <div>
            <h2>Répertoire fournisseurs</h2>
            <p>Partenaires associés à vos commandes d'achat.</p>
          </div>
        </div>
        <SearchTools value={query} onChange={setQuery} placeholder="Nom, e-mail ou téléphone" />
        <Table
          columns={[
            { key: 'id', label: 'RÉFÉRENCE', render: (r) => <strong>{r.id}</strong> },
            { key: 'name', label: 'FOURNISSEUR', render: (r) => <strong>{r.name}</strong> },
            { key: 'contact', label: 'TÉLÉPHONE' },
            { key: 'email', label: 'E-MAIL' },
            { key: 'orders', label: 'COMMANDES', render: (r) => `${r.orders} commandes` },
            { key: 'delay', label: 'DÉLAI MOYEN' },
            { key: 'status', label: 'STATUT', render: (r) => <Status>{r.status}</Status> },
            {
              key: 'action',
              label: 'ACTION',
              render: () => (
                <button className="icon-button" title="Modifier">
                  <Edit2 size={15} />
                </button>
              ),
            },
          ]}
          rows={suppliers.filter((s) =>
            `${s.name} ${s.email} ${s.contact}`.toLowerCase().includes(query.toLowerCase())
          )}
        />
      </section>
      {modal && (
        <Overlay
          title="Ajouter un fournisseur"
          onClose={() => setModal(false)}
          onSubmit={create}
          submit="Ajouter"
        >
          <Field label="Nom de l'entreprise">
            <input name="name" required />
          </Field>
          <Field label="Téléphone">
            <input name="contact" required />
          </Field>
          <Field label="E-mail de contact">
            <input name="email" type="email" required />
          </Field>
        </Overlay>
      )}
    </main>
  );
}
