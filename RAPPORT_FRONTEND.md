# Rapport du frontend PharmaStock

## 1. Présentation

PharmaStock est une interface web de gestion d’officine construite avec React. Elle regroupe un tableau de bord et des écrans de gestion du catalogue, des lots, des achats, des ventes, des alertes, des rapports, des utilisateurs, des fournisseurs et des paramètres.

Le projet utilise Vite pour le développement et la compilation, React pour l’interface, React Router pour la navigation, Lucide pour les icônes et Recharts pour les graphiques. Les dépendances comprennent Axios, mais le frontend actuel ne l’utilise pas.

## 2. Démarrage et structure générale

`index.html` fournit l’élément racine `#root`. `src/main.jsx` charge les styles de base et monte l’application React en mode `StrictMode`.

`src/App.jsx` assemble l’application autour de `BrowserRouter`. Il affiche la barre latérale, l’en-tête et la page correspondant à l’URL. Il gère aussi le thème : sa valeur est conservée dans `localStorage` sous `pharmastock-theme`, puis appliquée à l’attribut `data-theme` de l’élément `<html>`.

`src/routes/AppRoutes.jsx` associe chaque URL à son écran. Les pages sont affichées dans la zone principale, sous l’en-tête et à côté de la barre latérale.

## 3. Navigation

La barre latérale est définie dans `src/layout/sidebar.jsx`. Ses liens sont répartis en trois groupes : vue d’ensemble, gestion et espace. `NavLink` indique la page active. Le pied de menu présente l’identité PharmaStock Pro et un lien de déconnexion visuel.

L’en-tête est dans `src/layout/header.jsx`. Il contient un champ de recherche d’interface, un bouton « Pharmacien », le contrôle du thème, les notifications et le profil. Le profil conduit aux paramètres avec l’onglet Compte sélectionné (`/settings?tab=Compte`).

Le contrôle du thème passe en cycle entre clair, professionnel et sombre. Le thème professionnel utilise une barre latérale bleu nuit et des accents vert pharmacie.

## 4. Pages et fonctionnalités

| URL | Fichier | Rôle |
|---|---|---|
| `/` | `components/pages/Dashboard.jsx` | Résumé de l’activité, cartes de synthèse, ventes et informations opérationnelles. |
| `/medicines` | `components/pages/Stock.jsx` | Catalogue des produits, recherche, filtres et actions de gestion du stock. |
| `/stock` | `components/pages/Lots.jsx` | Consultation et filtrage des lots, quantités et dates d’expiration selon le principe FEFO. |
| `/purchases` | `components/pages/Purchases.jsx` | Suivi des commandes fournisseur et formulaire de création. |
| `/sales` | `components/pages/Sales.jsx` | Point de vente avec recherche de produits, panier et choix du mode de paiement. |
| `/alerts` | `components/pages/Alerts.jsx` | Liste d’alertes filtrable et possibilité de les acquitter dans l’interface. |
| `/reports` | `components/pages/Reports.jsx` | Indicateurs et graphiques de vente et d’activité avec Recharts. |
| `/users` | `components/pages/Users.jsx` | Liste des utilisateurs et formulaire d’ajout, avec actions d’administration. |
| `/suppliers` | `components/pages/Suppliers.jsx` | Liste des fournisseurs, recherche et formulaire d’ajout. |
| `/settings` | `components/pages/Settings.jsx` | Préférences de l’officine, du stock, des notifications et du compte. |

Les pages de gestion conservent principalement leur état avec les hooks React `useState`. Le catalogue utilise `useMemo` pour calculer les résultats filtrés. Le changement de page ne charge pas de données depuis un serveur dans le code consulté.

## 5. Composants partagés et données

`src/components/common/PageUI.jsx` fournit les éléments d’interface réutilisés : titres de page, statistiques, tableaux, recherche, formulaires, fenêtres modales, champs et badges d’état. `StateCard.jsx` définit une carte de synthèse utilisée par les pages qui présentent des indicateurs.

`src/components/common/pageData.js` contient les données de démonstration partagées : produits, lots, commandes, ventes par jour et formatage monétaire en dirhams marocains. `statusClass` transforme les libellés de statut en classes CSS.

`src/components/common/workspaces.css` fournit les styles des écrans de gestion. `Dashboard.css` complète les styles propres au tableau de bord.

## 6. Styles et thèmes

Les styles sont organisés en plusieurs fichiers chargés par `App.jsx` et `main.jsx` :

- `base.css` définit les règles globales, la typographie et le modèle de boîte.
- `app.css` contient la mise en page générale, les composants communs et les règles responsives historiques.
- `theme.css` définit des adaptations au thème sombre.
- `professional.css` regroupe les variables de couleurs, les styles professionnels partagés et les trois palettes clair, sombre et professionnel.
- Les fichiers CSS des pages et espaces ajoutent les règles propres à certains écrans.

Les thèmes s’appuient sur des variables CSS telles que `--surface`, `--ink`, `--muted`, `--line` et `--green`. L’attribut `data-theme` permet aux règles CSS de changer l’apparence selon le thème actif.

## 7. Données et limites fonctionnelles

Le frontend est actuellement une maquette interactive alimentée par des données locales codées dans les composants ou `pageData.js`. Les ajouts, filtres et changements d’état présentés par les pages restent côté navigateur et ne sont pas enregistrés dans une base de données. Aucun appel API n’est effectué par les écrans examinés ; Axios est installé mais inutilisé.

La recherche générale de l’en-tête est un champ visuel : aucun traitement de recherche global n’est relié à ce champ. De même, le lien « Déconnexion » de la barre latérale renvoie à l’accueil et ne réalise pas d’authentification. Les boutons de notification et « Pharmacien » sont également présents dans l’interface sans flux applicatif connecté visible.

## 8. Commandes du projet

Les scripts définis dans `package.json` sont :

- `npm run dev` : démarrer le serveur de développement Vite.
- `npm run build` : compiler le frontend pour la production.
- `npm run preview` : prévisualiser la compilation.
- `npm run lint` : lancer ESLint.
- `npm run format` : formater les fichiers JavaScript, JSX et CSS sous `src` avec Prettier.

