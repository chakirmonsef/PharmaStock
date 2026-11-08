import { useState } from 'react';
import {
  Activity,
  Check,
  CheckCircle2,
  Edit2,
  Plus,
  ShieldCheck,
  Trash2,
  Users,
} from 'lucide-react';
import { Heading, Stat, SearchTools, Table, Status, Overlay, Field } from '../common/PageUI';
import '../common/workspaces.css';

export default function UsersPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Sarah Jebari',
      email: 'sarah.jebari@pharmastock.ma',
      role: 'Pharmacienne',
      status: 'Actif',
      last: "Aujourd'hui, 09:42",
    },
    {
      id: 2,
      name: 'Youssef Amrani',
      email: 'youssef.amrani@pharmastock.ma',
      role: 'Gestionnaire de stock',
      status: 'Actif',
      last: "Aujourd'hui, 08:15",
    },
    {
      id: 3,
      name: 'Meriem Alaoui',
      email: 'meriem.alaoui@pharmastock.ma',
      role: 'Vendeuse',
      status: 'Actif',
      last: 'Hier, 18:30',
    },
    {
      id: 4,
      name: 'Karim Haddad',
      email: 'karim.haddad@pharmastock.ma',
      role: 'Pharmacien',
      status: 'Inactif',
      last: '04 nov. 2026',
    },
  ]);
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState('');
  const filtered = users.filter((u) =>
    `${u.name} ${u.email}`.toLowerCase().includes(query.toLowerCase())
  );
  const create = (e) => {
    e.preventDefault();
    let d = new FormData(e.currentTarget);
    setUsers((u) => [
      {
        id: Date.now(),
        name: d.get('name'),
        email: d.get('email'),
        role: d.get('role'),
        status: 'Actif',
        last: 'Jamais connecté',
      },
      ...u,
    ]);
    setModal(false);
  };
  return (
    <main className="workspace-page">
      <Heading
        title="Utilisateurs & accès"
        subtitle="Gérez les comptes, les rôles et les autorisations de votre équipe."
        action={{ label: 'Ajouter un utilisateur', onClick: () => setModal(true) }}
        icon={Plus}
      />
      <div className="workspace-stats">
        <Stat label="Utilisateurs" value={users.length} detail="Comptes enregistrés" icon={Users} />
        <Stat
          label="Comptes actifs"
          value={users.filter((u) => u.status === 'Actif').length}
          detail="Accès autorisé"
          icon={CheckCircle2}
        />
        <Stat
          label="Rôles disponibles"
          value="4"
          detail="Permissions par fonction"
          icon={ShieldCheck}
          tone="purple"
        />
        <Stat
          label="Connexions aujourd'hui"
          value="18"
          detail="Activité de l'équipe"
          icon={Activity}
          tone="blue"
        />
      </div>
      <section className="workspace-panel">
        <div className="section-heading">
          <div>
            <h2>Membres de l'équipe</h2>
            <p>Les rôles déterminent les pages et actions accessibles.</p>
          </div>
          <button className="quiet-button">
            <ShieldCheck size={14} /> Rôles et permissions
          </button>
        </div>
        <SearchTools
          value={query}
          onChange={setQuery}
          placeholder="Rechercher un nom ou un e-mail"
        />
        <Table
          columns={[
            {
              key: 'name',
              label: 'UTILISATEUR',
              render: (r) => (
                <div className="user-cell">
                  <span>
                    {r.name
                      .split(' ')
                      .map((s) => s[0])
                      .join('')}
                  </span>
                  <div>
                    <strong>{r.name}</strong>
                    <small>{r.email}</small>
                  </div>
                </div>
              ),
            },
            { key: 'role', label: 'RÔLE', render: (r) => <Status>{r.role}</Status> },
            { key: 'status', label: 'STATUT', render: (r) => <Status>{r.status}</Status> },
            { key: 'last', label: 'DERNIÈRE CONNEXION' },
            {
              key: 'action',
              label: 'ACTIONS',
              render: (r) => (
                <div className="row-actions">
                  <button className="icon-button" title="Modifier">
                    <Edit2 size={15} />
                  </button>
                  <button
                    className="icon-button"
                    title="Activer ou désactiver"
                    onClick={() =>
                      setUsers((u) =>
                        u.map((x) =>
                          x.id === r.id
                            ? { ...x, status: x.status === 'Actif' ? 'Inactif' : 'Actif' }
                            : x
                        )
                      )
                    }
                  >
                    <Check size={15} />
                  </button>
                  <button
                    className="icon-button danger-icon"
                    title="Supprimer"
                    onClick={() => setUsers((u) => u.filter((x) => x.id !== r.id))}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ),
            },
          ]}
          rows={filtered}
        />
      </section>
      {modal && (
        <Overlay
          title="Ajouter un utilisateur"
          onClose={() => setModal(false)}
          onSubmit={create}
          submit="Créer le compte"
        >
          <Field label="Nom complet">
            <input name="name" required placeholder="Ex. Nadia Benali" />
          </Field>
          <Field label="Adresse e-mail">
            <input name="email" type="email" required placeholder="nom@pharmastock.ma" />
          </Field>
          <Field label="Rôle">
            <select name="role">
              <option>Pharmacien</option>
              <option>Pharmacienne</option>
              <option>Gestionnaire de stock</option>
              <option>Vendeuse</option>
            </select>
          </Field>
        </Overlay>
      )}
    </main>
  );
}
