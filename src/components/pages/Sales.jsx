import { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  CircleDollarSign,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
} from 'lucide-react';
import { Heading, SearchTools, Stat } from '../common/PageUI';
import { products, currency } from '../common/pageData';
import '../common/workspaces.css';

export default function SalesPage() {
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState('Espèces');
  const [done, setDone] = useState(false);
  const shown = products.filter((p) =>
    `${p.name} ${p.sku}`.toLowerCase().includes(query.toLowerCase())
  );
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);
  const add = (p) => {
    setDone(false);
    setCart((c) =>
      c.some((x) => x.id === p.id)
        ? c.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x))
        : [...c, { ...p, qty: 1 }]
    );
  };
  return (
    <main className="workspace-page">
      <Heading
        title="Point de vente"
        subtitle="Recherchez un produit, ajoutez-le au panier et encaissez la vente."
      />
      <div className="pos-layout">
        <section className="workspace-panel pos-products">
          <div className="section-heading">
            <div>
              <h2>Catalogue</h2>
              <p>{products.length} produits disponibles</p>
            </div>
            <span className="online-dot">Caisse ouverte</span>
          </div>
          <SearchTools value={query} onChange={setQuery} placeholder="Nom du produit ou code SKU" />
          <div className="pos-product-grid">
            {shown.map((p) => (
              <button className="pos-product" key={p.id} onClick={() => add(p)}>
                <span className="pos-product-icon">
                  <Package size={20} />
                </span>
                <strong>{p.name}</strong>
                <small>
                  {p.sku} · {p.stock} en stock
                </small>
                <b>{currency(p.price)}</b>
                <span className="pos-add">
                  <Plus size={15} />
                </span>
              </button>
            ))}
          </div>
        </section>
        <aside className="workspace-panel pos-cart">
          <div className="section-heading">
            <div>
              <h2>Panier</h2>
              <p>{cart.reduce((s, p) => s + p.qty, 0)} article(s)</p>
            </div>
            <button
              className="icon-button"
              onClick={() => {
                setCart([]);
                setDone(false);
              }}
              title="Vider le panier"
            >
              <Trash2 size={16} />
            </button>
          </div>
          {cart.length ? (
            <div className="cart-lines">
              {cart.map((p) => (
                <div className="cart-line" key={p.id}>
                  <div>
                    <strong>{p.name}</strong>
                    <small>{currency(p.price)} l'unité</small>
                  </div>
                  <div className="qty-controls">
                    <button
                      onClick={() =>
                        setCart((c) =>
                          c.flatMap((x) =>
                            x.id !== p.id ? [x] : x.qty > 1 ? [{ ...x, qty: x.qty - 1 }] : []
                          )
                        )
                      }
                    >
                      âˆ’
                    </button>
                    <span>{p.qty}</span>
                    <button onClick={() => add(p)}>+</button>
                  </div>
                  <b>{currency(p.qty * p.price)}</b>
                </div>
              ))}
            </div>
          ) : (
            <div className="cart-empty">
              <ShoppingCart size={25} />
              <p>Le panier est vide</p>
              <small>Sélectionnez un produit pour commencer.</small>
            </div>
          )}
          <div className="cart-payment">
            <label>
              Moyen de paiement
              <select value={payment} onChange={(e) => setPayment(e.target.value)}>
                <option>Espèces</option>
                <option>Carte bancaire</option>
                <option>Paiement mobile</option>
                <option>Prise en charge</option>
              </select>
            </label>
            <div className="cart-total">
              <span>Total à payer</span>
              <strong>{currency(total)}</strong>
            </div>
            <button
              className="checkout-button"
              disabled={!cart.length}
              onClick={() => {
                setDone(true);
                setCart([]);
              }}
            >
              <CheckCircle2 size={17} /> Encaisser la vente
            </button>
            {done && <p className="success-note">Vente enregistrée avec succès.</p>}
          </div>
        </aside>
      </div>
      <div className="workspace-stats compact-stats">
        <Stat
          label="Ventes aujourd'hui"
          value="42"
          detail="+12 % par rapport à  hier"
          icon={ShoppingCart}
        />
        <Stat
          label="Chiffre d'affaires"
          value={currency(6840)}
          detail="Depuis l'ouverture de caisse"
          icon={CircleDollarSign}
          tone="blue"
        />
        <Stat
          label="Panier moyen"
          value={currency(162.85)}
          detail="Sur les ventes du jour"
          icon={Activity}
          tone="purple"
        />
        <Stat
          label="Mode de paiement principal"
          value="Espèces"
          detail="58 % des transactions"
          icon={CheckCircle2}
          tone="orange"
        />
      </div>
    </main>
  );
}
