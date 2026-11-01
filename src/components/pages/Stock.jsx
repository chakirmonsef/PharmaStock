import Card from "../common/StateCard";
import { useState } from "react";
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
} from "lucide-react";

function Stock() {
    const [formulaireOuvert, setFormulaireOuvert] = useState(false);
    return (
        <main className="stock-page">
            <div className="Card-haut">
                <Card
                    titre="TOTAL PRODUITS"
                    valeur="1482"
                    description="trending_up +12% ce mois"
                    icone={<Archive size={24} />}
                    variant="blue"
                />
                <Card
                    titre="ALERTES STOCK FAIBLE"
                    valeur="38"
                    description="Réapprovisionnement requis"
                    icone={<TriangleAlert size={24} />}
                    variant="red"
                />
                <Card
                    titre="Catégories Actives"
                    valeur="14"
                    description="Tous fournisseurs confondus"
                    icone={<Archive size={24} />}
                    variant="gray"
                />
                <Card
                    titre="Valorisation"
                    valeur="124 850 $"
                    description="Audit validé"
                    icone={<Archive size={24} />}
                    variant="teal"
                />
            </div>

            <section className="catalogue">
                <div className="supp-card">
                    <div className="titre">
                        <h2>Catalogue des Médicaments</h2>
                        <p>
                            Gérer les articles principaux du stock, les formes
                            galéniques, les seuils actifs et le suivi des lots.
                        </p>
                    </div>

                    <button className="Nouveau-Medicament" type="button" onClick={() => setFormulaireOuvert(true)}>
                        <Plus size={16} />
                        Nouveau médicament
                    </button>
                </div>
                {formulaireOuvert && (
    <div className="modal-overlay">
        <form
            className="medicament-modal"
            onSubmit={(event) => {
                event.preventDefault();
                setFormulaireOuvert(false);
            }}
        >
            <div className="modal-header">
                <h2>
                    <Plus size={24} />
                    Ajouter un nouveau médicament au catalogue
                </h2>

                <button
                    className="modal-close"
                    type="button"
                    aria-label="Fermer"
                    onClick={() => setFormulaireOuvert(false)}
                >
                    <X size={24} />
                </button>
            </div>

            <div className="modal-body">
                <label>
                    Nom du Produit *
                    <input type="text" placeholder="ex. Amoxicilline Duo" required />
                </label>

                <label>
                    Nom Générique *
                    <input type="text" placeholder="ex. Amoxicilline Trihydrate" required />
                </label>

                <label>
                    Catégorie *
                    <select defaultValue="" required>
                        <option value="" disabled>Sélectionner une catégorie</option>
                        <option value="Analgésiques">Analgésiques</option>
                        <option value="Antibiotiques">Antibiotiques</option>
                        <option value="Compléments">Compléments</option>
                    </select>
                </label>

                <label>
                    Forme Galénique *
                    <select defaultValue="" required>
                        <option value="" disabled>Sélectionner la forme</option>
                        <option value="Comprimé">Comprimé</option>
                        <option value="Gélule">Gélule</option>
                        <option value="Sirop">Sirop</option>
                        <option value="Effervescent">Effervescent</option>
                    </select>
                </label>

                <label>
                    Prix Unitaire ($) *
                    <input type="number" min="0" step="0.01" placeholder="0.00" required />
                </label>

                <label>
                    Seuil de Stock Actif *
                    <input type="number" min="0" placeholder="ex. 100" required />
                </label>

                <label className="champ-large">
                    SKU / Numéro de code-barres
                    <input type="text" placeholder="Généré automatiquement si vide" />
                </label>
            </div>

            <div className="modal-footer">
                <button
                    className="bouton-annuler"
                    type="button"
                    onClick={() => setFormulaireOuvert(false)}
                >
                    Annuler
                </button>

                <button className="bouton-enregistrer" type="submit">
                    Enregistrer le médicament
                </button>
            </div>
        </form>
    </div>
)}
                <div className="search-filtre">
                    <div className="bar-search">
                        <Search />
                        <input
                            type="search"
                            placeholder="Filtrer par nom, nom générique ou SKU..."
                        />
                    </div>

                    <div className="Filtre-categorie">
                        <select defaultValue="">
                            <option value="">Toutes les catégories</option>
                            <option value="Analgésiques">Analgésiques</option>
                            <option value="Antibiotiques">Antibiotiques</option>
                            <option value="Compléments">Compléments</option>
                        </select>
                    </div>

                    <div className="Etat-stock">
                        <select defaultValue="">
                            <option value="">État du seuil de stock</option>
                            <option value="normal">Stock normal</option>
                            <option value="faible">Stock faible</option>
                            <option value="rupture">Rupture de stock</option>
                        </select>
                    </div>
                </div>

                <div className="stock-table-container">
                    <table className="stock-table">
                        <thead>
                            <tr>
                                <th>Nom du produit</th>
                                <th>Nom générique</th>
                                <th>Catégorie</th>
                                <th>Forme galénique</th>
                                <th>Prix unitaire</th>
                                <th>Seuil actif</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    <div className="produit">
                                        <span className="produit-icone">
                                            <Pill size={20} />
                                        </span>
                                        <div>
                                            <strong>Paracétamol Extra</strong>
                                            <small>SKU : PAR-500-EXT</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Paracétamol
                                    <br />
                                    + Caféine
                                </td>
                                <td>
                                    <span className="categorie categorie-analgesiques">
                                        Analgésiques
                                    </span>
                                </td>
                                <td>
                                    Comprimé
                                    <br />
                                    (500 mg)
                                </td>
                                <td>0,15 $</td>
                                <td>
                                    <span className="stock-badge stock-normal">
                                        200 unités
                                    </span>
                                </td>
                                <td>
                                    <div className="actions">
                                        <button type="button" aria-label="Voir">
                                            <Eye size={19} />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Modifier"
                                        >
                                            <Pencil size={19} />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Supprimer"
                                        >
                                            <Trash2 size={19} />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="produit">
                                        <span className="produit-icone">
                                            <Pill size={20} />
                                        </span>
                                        <div>
                                            <strong>Amoxicilline Duo</strong>
                                            <small>SKU : AMX-250-CAP</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Amoxicilline
                                    <br />
                                    Trihydrate
                                </td>
                                <td>
                                    <span className="categorie categorie-antibiotiques">
                                        Antibiotiques
                                    </span>
                                </td>
                                <td>
                                    Gélule
                                    <br />
                                    (250 mg)
                                </td>
                                <td>0,45 $</td>
                                <td>
                                    <span className="stock-badge stock-faible">
                                        50 unités (Faible)
                                    </span>
                                </td>
                                <td>
                                    <div className="actions">
                                        <button type="button" aria-label="Voir">
                                            <Eye size={19} />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Modifier"
                                        >
                                            <Pencil size={19} />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Supprimer"
                                        >
                                            <Trash2 size={19} />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="produit">
                                        <span className="produit-icone">
                                            <Pill size={20} />
                                        </span>
                                        <div>
                                            <strong>Vitamine C Ascorbate</strong>
                                            <small>SKU : VIT-C-1000</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Acide
                                    <br />
                                    Ascorbique
                                </td>
                                <td>
                                    <span className="categorie categorie-complements">
                                        Compléments
                                    </span>
                                </td>
                                <td>
                                    Effervescent
                                    <br />
                                    (1000 mg)
                                </td>
                                <td>0,20 $</td>
                                <td>
                                    <span className="stock-badge stock-normal">
                                        150 unités
                                    </span>
                                </td>
                                <td>
                                    <div className="actions">
                                        <button type="button" aria-label="Voir">
                                            <Eye size={19} />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Modifier"
                                        >
                                            <Pencil size={19} />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Supprimer"
                                        >
                                            <Trash2 size={19} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default Stock;