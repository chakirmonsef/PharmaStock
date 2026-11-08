import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Heading, Field } from '../common/PageUI';
import '../common/workspaces.css';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState('Officine');
  const tabs = ['Officine', 'Stock & FEFO', 'Notifications', 'Compte'];
  return (
    <main className="workspace-page">
      <Heading
        title="Paramètres"
        subtitle="Personnalisez PharmaStock selon le fonctionnement de votre officine."
      />
      <div className="settings-layout">
        <nav className="settings-nav">
          {tabs.map((t) => (
            <button
              key={t}
              className={tab === t ? 'settings-tab selected' : 'settings-tab'}
              onClick={() => {
                setTab(t);
                setSaved(false);
              }}
            >
              {t}
            </button>
          ))}
        </nav>
        <section className="workspace-panel settings-panel">
          <div className="section-heading">
            <div>
              <h2>{tab}</h2>
              <p>Ces préférences s'appliquent à votre espace de travail.</p>
            </div>
          </div>
          {tab === 'Officine' && (
            <>
              <div className="settings-fields">
                <Field label="Nom de l'officine">
                  <input defaultValue="Pharmacie Centrale" />
                </Field>
                <Field label="Adresse e-mail">
                  <input defaultValue="contact@pharmaciecentrale.ma" />
                </Field>
                <Field label="Téléphone">
                  <input defaultValue="+212 522 00 00 00" />
                </Field>
                <Field label="Adresse">
                  <input defaultValue="12, avenue Hassan II" />
                </Field>
                <Field label="Ville">
                  <input defaultValue="Casablanca" />
                </Field>
                <Field label="Devise">
                  <select defaultValue="MAD">
                    <option value="MAD">Dirham marocain (MAD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </Field>
              </div>
            </>
          )}
          {tab === 'Stock & FEFO' && (
            <div className="settings-options">
              <label>
                <span>
                  <strong>Appliquer la règle FEFO</strong>
                  <small>
                    Proposer en priorité le lot dont la date d'expiration est la plus proche.
                  </small>
                </span>
                <input type="checkbox" defaultChecked />
              </label>
              <label>
                <span>
                  <strong>Seuil d'alerte de péremption</strong>
                  <small>Nombre de jours avant expiration pour déclencher une alerte.</small>
                </span>
                <input className="number-setting" type="number" defaultValue="30" />
              </label>
              <label>
                <span>
                  <strong>Devise d'affichage</strong>
                  <small>Utilisée dans les rapports et au point de vente.</small>
                </span>
                <select defaultValue="MAD">
                  <option>MAD</option>
                  <option>EUR</option>
                </select>
              </label>
            </div>
          )}
          {tab === 'Notifications' && (
            <div className="settings-options">
              {[
                'Stock en dessous du seuil minimum',
                'Lot proche de la péremption',
                'Nouvelle commande à  réceptionner',
                'Résumé quotidien par e-mail',
              ].map((x, i) => (
                <label key={x}>
                  <span>
                    <strong>{x}</strong>
                    <small>Recevoir une notification dans le centre d'alertes.</small>
                  </span>
                  <input type="checkbox" defaultChecked={i < 3} />
                </label>
              ))}
            </div>
          )}
          {tab === 'Compte' && (
            <div className="profile-settings">
              <span className="profile-avatar">SJ</span>
              <div>
                <h3>Sarah Jebari</h3>
                <p>Pharmacienne · Administratrice</p>
                <small>sarah.jebari@pharmastock.ma</small>
              </div>
              <button className="secondary-button">Modifier le profil</button>
            </div>
          )}
          <div className="settings-footer">
            <span>
              {saved && (
                <span className="success-note">
                  <CheckCircle2 size={15} /> Modifications enregistrées
                </span>
              )}
            </span>
            <button className="primary-button" onClick={() => setSaved(true)}>
              Enregistrer les modifications
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
