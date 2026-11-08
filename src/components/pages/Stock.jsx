import { useMemo, useState } from 'react';
import {
  Archive,
  Eye,
  Pencil,
  Pill,
  Plus,
  Search,
  Trash2,
  TriangleAlert,
  X,
  Tags,
  CircleDollarSign,
} from 'lucide-react';
import Card from '../common/StateCard';

const initialProducts = [
  {
    id: 1,
    name: 'Paracétamol Extra',
    generic: 'Paracétamol + Caféine',
    sku: 'PAR-500-EXT',
    category: 'Analgésiques',
    form: 'Comprimé (500 mg)',
    price: 18.5,
    stock: 200,
    reorder: 50,
  },
  {
    id: 2,
    name: 'Amoxicilline Duo',
    generic: 'Amoxicilline Trihydrate',
    sku: 'AMX-250-CAP',
    category: 'Antibiotiques',
    form: 'Gélule (250 mg)',
    price: 42,
    reorder: 100,
    stock: 50,
  },
  {
    id: 3,
    name: 'Vitamine C Ascorbate',
    generic: 'Acide Ascorbique',
    sku: 'VIT-C-1000',
    category: 'Compléments',
    form: 'Effervescent (1000 mg)',
    price: 36,
    reorder: 40,
    stock: 150,
  },
  {
    id: 4,
    name: 'Ibuprofène 400',
    generic: 'Ibuprofène',
    sku: 'IBU-400-CMP',
    category: 'Analgésiques',
    form: 'Comprimé (400 mg)',
    price: 24,
    reorder: 60,
    stock: 24,
  },
  {
    id: 5,
    name: 'Oméprazole 20 mg',
    generic: 'Oméprazole',
    sku: 'OME-20-GEL',
    category: 'Gastro-entérologie',
    form: 'Gélule (20 mg)',
    price: 29.9,
    reorder: 30,
    stock: 18,
  },
];
const emptyForm = {
  name: '',
  generic: '',
  sku: '',
  category: 'Analgésiques',
  form: 'Comprimé',
  price: '',
  reorder: '',
  stock: '',
};

export default function Stock() {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [stockState, setStockState] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState('');
  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          `${p.name} ${p.generic} ${p.sku}`.toLowerCase().includes(query.toLowerCase()) &&
          (!category || p.category === category) &&
          (!stockState || (stockState === 'faible' ? p.stock <= p.reorder : p.stock > p.reorder))
      ),
    [products, query, category, stockState]
  );
  const open = (product) => {
    setEditing(product?.id ?? null);
    setForm(product ? { ...product } : emptyForm);
    setModal(true);
  };
  const save = (e) => {
    e.preventDefault();
    const p = {
      ...form,
      price: Number(form.price),
      reorder: Number(form.reorder),
      stock: Number(form.stock),
    };
    if (editing) setProducts((xs) => xs.map((x) => (x.id === editing ? { ...p, id: editing } : x)));
    else
      setProducts((xs) => [
        { ...p, id: Date.now(), sku: p.sku || `MED-${String(xs.length + 1).padStart(3, '0')}` },
        ...xs,
      ]);
    setModal(false);
    setNotice(editing ? 'Médicament modifié' : 'Médicament ajouté au catalogue');
    setTimeout(() => setNotice(''), 2500);
  };
  const remove = (p) => {
    if (window.confirm(`Supprimer ${p.name} du catalogue ?`))
      setProducts((xs) => xs.filter((x) => x.id !== p.id));
  };
  return (
    <main className="stock-page">
      <div className="page-heading">
        <div>
          <h1>Stock & catalogue</h1>
          <p>Gérez les produits, les seuils de réapprovisionnement et les prix.</p>
        </div>
        <button className="primary-button" onClick={() => open()}>
          <Plus size={15} /> Nouveau médicament
        </button>
      </div>
      <div className="Card-haut">
        <Card
          titre="PRODUITS AU CATALOGUE"
          valeur={products.length}
          description="Références actives"
          icone={<Archive size={20} />}
          variant="blue"
        />
        <Card
          titre="STOCK FAIBLE"
          valeur={products.filter((p) => p.stock <= p.reorder).length}
          description="Réapprovisionnement requis"
          icone={<TriangleAlert size={20} />}
          variant="red"
        />
        <Card
          titre="CATÉGORIES"
          valeur={new Set(products.map((p) => p.category)).size}
          description="Familles de produits"
          icone={<Tags size={20} />}
          variant="gray"
        />
        <Card
          titre="VALEUR DU STOCK"
          valeur={`${products.reduce((a, p) => a + p.price * p.stock, 0).toLocaleString('fr-MA')} MAD`}
          description="Valorisation au prix d'achat"
          icone={<CircleDollarSign size={20} />}
          variant="teal"
        />
      </div>
      <section className="catalogue">
        <div className="supp-card">
          <div className="titre">
            <h2>Catalogue des médicaments</h2>
            <p>Fiches produits et seuils actifs pour le suivi quotidien du stock.</p>
          </div>
        </div>
        <div className="search-filtre">
          <label className="bar-search">
            <Search />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Nom du médicament, générique ou SKU"
            />
          </label>
          <label className="Filtre-categorie">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Toutes les catégories</option>
              {[...new Set(products.map((p) => p.category))].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="Etat-stock">
            <select value={stockState} onChange={(e) => setStockState(e.target.value)}>
              <option value="">Tous les niveaux de stock</option>
              <option value="normal">Stock normal</option>
              <option value="faible">Stock faible</option>
            </select>
          </label>
        </div>
        <div className="stock-table-container">
          <table className="stock-table">
            <thead>
              <tr>
                <th>Médicament</th>
                <th>Nom générique</th>
                <th>Catégorie</th>
                <th>Forme galénique</th>
                <th>Prix unitaire</th>
                <th>Stock / seuil</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="produit">
                      <span className="produit-icone">
                        <Pill size={18} />
                      </span>
                      <div>
                        <strong>{p.name}</strong>
                        <small>SKU : {p.sku}</small>
                      </div>
                    </div>
                  </td>
                  <td>{p.generic}</td>
                  <td>
                    <span
                      className={`categorie ${p.category === 'Antibiotiques' ? 'categorie-antibiotiques' : p.category === 'Compléments' ? 'categorie-complements' : 'categorie-analgesiques'}`}
                    >
                      {p.category}
                    </span>
                  </td>
                  <td>{p.form}</td>
                  <td>{p.price.toLocaleString('fr-MA')} MAD</td>
                  <td>
                    <span
                      className={`stock-badge ${p.stock <= p.reorder ? 'stock-faible' : 'stock-normal'}`}
                    >
                      {p.stock} / seuil {p.reorder}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        type="button"
                        aria-label={`Voir ${p.name}`}
                        title="Détails"
                        onClick={() => setNotice(`${p.name} · ${p.stock} unités en stock`)}
                      >
                        <Eye size={17} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Modifier ${p.name}`}
                        title="Modifier"
                        onClick={() => open(p)}
                      >
                        <Pencil size={17} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Supprimer ${p.name}`}
                        title="Supprimer"
                        onClick={() => remove(p)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan="7" className="empty-cell">
                    Aucun produit ne correspond à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="stock-results">
          {filtered.length} produit{filtered.length !== 1 ? 's' : ''} affiché
          {filtered.length !== 1 ? 's' : ''}
        </div>
      </section>
      {notice && <div className="toast">{notice}</div>}
      {modal && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => e.target === e.currentTarget && setModal(false)}
        >
          <form className="medicament-modal" onSubmit={save}>
            <div className="modal-header">
              <h2>
                <Plus size={20} />
                {editing ? 'Modifier le médicament' : 'Ajouter au catalogue'}
              </h2>
              <button
                className="modal-close"
                type="button"
                onClick={() => setModal(false)}
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              {[
                ['Nom du produit', 'name', 'text'],
                ['Nom générique', 'generic', 'text'],
                ['SKU / code-barres', 'sku', 'text'],
                ['Catégorie', 'category', 'select'],
                ['Forme galénique', 'form', 'text'],
                ['Prix unitaire (MAD)', 'price', 'number'],
                ['Seuil de stock', 'reorder', 'number'],
                ['Quantité actuelle', 'stock', 'number'],
              ].map(([label, key, type]) => (
                <label key={key}>
                  {label}
                  {type === 'select' ? (
                    <select
                      required
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    >
                      {['Analgésiques', 'Antibiotiques', 'Compléments', 'Gastro-entérologie'].map(
                        (c) => (
                          <option key={c}>{c}</option>
                        )
                      )}
                    </select>
                  ) : (
                    <input
                      required={key !== 'sku'}
                      type={type}
                      min={type === 'number' ? '0' : undefined}
                      step={key === 'price' ? '0.01' : undefined}
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder={key === 'sku' ? 'Généré automatiquement' : label}
                    />
                  )}
                </label>
              ))}
            </div>
            <div className="modal-footer">
              <button className="bouton-annuler" type="button" onClick={() => setModal(false)}>
                Annuler
              </button>
              <button className="bouton-enregistrer" type="submit">
                {editing ? 'Enregistrer' : 'Ajouter le produit'}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
